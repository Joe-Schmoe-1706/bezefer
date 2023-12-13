import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Student } from "./students.model";

@Injectable()
export class StudentsService {


    constructor(
        @InjectModel(Student.name) private readonly studentModel : Model<Student> 
    ) {}

    async findAll(): Promise<Student[]> {
        const classes = await this.studentModel.find().exec();
        return classes;
    }

    // async addClass(_id: string, name: string, numberOfSeats: number, numberOfSeatsLeft: number) : Promise<string> {
    //     const newClassroom = new this.classModel({
    //         _id,
    //         name,
    //         numberOfSeats,
    //         numberOfSeatsLeft
    //     })
    // }

    async deleteStudent(studentId: string): Promise<void> {
        await this.studentModel.deleteOne({_id : studentId}).exec();
    }

}