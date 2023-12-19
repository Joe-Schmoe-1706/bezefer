import mongoose, { Model } from "mongoose";
import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Student } from "./students.model";
import { ClassesService } from "src/Classes/classes.service";
import { StudentDTO } from "./StudentDTO";

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

    async addStudent(_id: string, firstName: string,lastName: string, age: number, profession: string) : Promise<string> {
        const newStudent = new this.studentModel({
            _id: _id,
            firstName,
            lastName,
            age,
            profession,
            classroom: ""
        });

        const result= await newStudent.save();
        return result.id;
    }

    async deleteStudent(studentId: string): Promise<void> {
        await this.studentModel.deleteOne({_id : studentId}).exec();
    }

    async changeStudentClassStatus(studentId: string, classroomId: string, action: string): Promise<void> {
        const sutdentToUpdate = await this.studentModel.findById(studentId).exec();
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