import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Classroom } from "./classes.model";

@Injectable()
export class ClassesService {


    constructor(
        @InjectModel(Classroom.name) private readonly classModel : Model<Classroom> 
    ) {}

    async findAll(): Promise<Classroom[]> {
        const classes = await this.classModel.find().exec();
        return classes;
    }

    async addClass(_id: string, name: string, numberOfSeats: number) : Promise<string> {
        const newClassroom = new this.classModel({
            _id,
            name,
            numberOfSeats,
            numberOfSeatsLeft: numberOfSeats
        });
        const result= await newClassroom.save();
        return result.id;
    }

    async deleteClass(classroomId: string): Promise<void> {
        await this.classModel.deleteOne({_id : classroomId}).exec();
    }

}