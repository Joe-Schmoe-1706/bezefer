import mongoose, { Model } from "mongoose";
import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Student, StudentDocument } from "./students.model";
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

    async getStudentById(studentId: string): Promise<StudentDocument> {
        return await this.studentModel.findById(studentId);
    }

    async addStudent(_id: string, firstName: string,lastName: string, age: number, profession: string) : Promise<string> {
        try {
            console.log("trying")
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
        } catch (error) {
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