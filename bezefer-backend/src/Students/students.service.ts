import mongoose, { Model } from "mongoose";
import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Student } from "./students.model";
import { ClassesService } from "src/Classes/classes.service";
import { StudentDTO } from "./StudentDTO";
import validation from "src/validation";

@Injectable()
export class StudentsService {


    constructor(
        @InjectModel(Student.name) private readonly studentModel : Model<Student>,
        @Inject(ClassesService) private readonly classroomService: ClassesService
    ) {}

    async findAll(): Promise<Student[]> {
        const students = await this.studentModel.find().exec();
        return students;
    }

    async findAllDTO(): Promise<StudentDTO[]> {
        const students = await this.studentModel.find().exec();
        return students.map((student) => {
            return {
                _id: student._id,
                firstName: student.firstName,
                lsatName: student.lastName,
                age: student.age,
                profession: student.profession,
                classroom: student.classroom
            }
        });
    }

    validateStudent(student: Student): boolean {
        return validation.validateStudentId(student._id) &&
        validation.validateOnlyLetters(student.firstName) &&
        validation.validateOnlyLetters(student.lastName) &&
        validation.validateAge(student.age) &&
        validation.validateOnlyLetters(student.profession); 
    }

    async getStudentById(studentId: string) {
        const student = this.studentModel.findById(studentId);

        if (!student) {
            throw new NotFoundException("student does not exist");
        }

        return student;
    }

    async addStudent(student: Student) : Promise<string> {
        if (!this.validateStudent(student)) {
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
            if (error.code === 11000) {
                throw new Error("duplicate ID")
            }
            throw (error);
        } 
    }

    async deleteStudent(studentId: string): Promise<void> {
        const studentToDelete = await this.getStudentById(studentId);
        if (studentToDelete.classroom != "") {
            const promises = [];
            promises.push(this.studentModel.deleteOne({ _id : studentId}));
            promises.push(this.classroomService.changeNumberOfSeats(studentToDelete.classroom, "remove"));
            await Promise.all(promises);
        } else {
            await this.studentModel.deleteOne({ _id : studentId});
        }
    }

    async changeStudentClassStatus(studentId: string, classroomId: string, action: string): Promise<void> {
        const sutdentToUpdate = await this.getStudentById(studentId);
        sutdentToUpdate.classroom = action === "add" ? classroomId : "";
        const promises = [];
        promises.push(sutdentToUpdate.save());
        promises.push(this.classroomService.changeNumberOfSeats(classroomId, action));
        await Promise.all(promises);
    }

    async getStudentsInClass(classroomId: string): Promise<Student[]> {
        return this.studentModel.find({classroom: classroomId}).exec();
    }

}