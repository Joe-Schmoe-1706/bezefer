import mongoose, { Model } from "mongoose";
import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Student } from "./students.model";
import { ClassesService } from "../Classes/classes.service";
import { validate } from "class-validator";

@Injectable()
export class StudentsService {
    constructor(
        @InjectModel(Student.name) private readonly studentModel : Model<Student>,
        @Inject(ClassesService) private readonly classroomService: ClassesService,
    ) {}

    async findAll(): Promise<Student[]> {
        try {
            const students = await this.studentModel.find().lean();
            return students;
        } catch (error) {
            throw error;
        }
    }

    async getStudentById(studentId: string) {
        try {
            const student = await this.studentModel.findById(studentId);

            if (!student) {
                throw new NotFoundException("student does not exist");
            }
    
            return student;
        } catch (error) {
            throw error;
        }
    }

    async addStudent(student: Student) : Promise<string> {
        const error = await validate(student);
        
        if (error.length > 0) {
            throw new BadRequestException("student is not valid");
        }

        try {
            const newStudent = new this.studentModel({
                _id: student._id,
                firstName: student.firstName,
                lastName: student.lastName,
                age: student.age, 
                profession: student.profession,
                classroom: ""
            });
    
            const result= await newStudent.save();
            return result.id;
        } catch (error) {
            throw error;
        } 
    }

    async deleteStudent(student: Student): Promise<void> {
        try {
            if (student.classroom != "") {
                const promises = [];
                promises.push(this.studentModel.findByIdAndDelete(student._id));
                promises.push(this.classroomService.changecapacity(student.classroom, "remove"));
                await Promise.all(promises);
            } else {
                await this.studentModel.findByIdAndDelete(student._id);
            }
        } catch (error) {
            throw error;
        }
    }

    async changeStudentClassStatus(studentId: string, classroomId?: string): Promise<void> {
        const studentSession = this.studentModel.startSession();
        (await studentSession).startTransaction();

        if (classroomId !== undefined && (await this.classroomService.findClassById(classroomId)).seatsLeft === 0) {
            throw new BadRequestException("there are no available seats in this class");
        } else {
            try {
                const sutdentToUpdate = await this.getStudentById(studentId);
                const classroomToChange = classroomId ?? sutdentToUpdate.classroom;
                sutdentToUpdate.classroom = classroomId ?? '';

                await sutdentToUpdate.save();
                await this.classroomService.changecapacity(classroomToChange, classroomToChange === classroomId ? "add" : "remove");

                (await studentSession).commitTransaction();
            } catch (error) {
                (await studentSession).abortTransaction();
                throw error;
            } finally {
                (await studentSession).endSession();
            }
        }
    }

    async getStudentsInClass(classroomId: string): Promise<Student[]> {
        try {
            return this.studentModel.find({classroom: classroomId}).exec();
        } catch (error) {
            throw error;
        }
    }

}