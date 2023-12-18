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

    async findClassById(classroomId: string): Promise<Classroom> {
        return await this.classModel.findById(classroomId).exec();
    }

    async addClass(id: string, name: string, numberOfSeats: number) : Promise<void> {
        const newClassroom = new this.classModel({
            _id: id,
            name,
            numberOfSeats,
            numberOfSeatsLeft: numberOfSeats
        });
        await newClassroom.save();
    }

    async deleteClass(classroomId: string): Promise<void> {
        const classroomToDelete = await this.classModel.findById(classroomId).exec();
        if (classroomToDelete.numberOfSeats === classroomToDelete.numberOfSeatsLeft) {
            await this.classModel.deleteOne({_id : classroomId}).exec();
        } else {
            throw new Error("class is not empty");
        }
    }

    async changeNumberOfSeats(classroomId: string, action: string): Promise<void> {
        const updatedClassroom = await this.classModel.findById(classroomId).exec();
        updatedClassroom.numberOfSeatsLeft = action === "add" ?
         updatedClassroom.numberOfSeatsLeft - 1 :
         updatedClassroom.numberOfSeatsLeft + 1;

        await updatedClassroom.save();
    }

    async findAvailableClassrooms(): Promise<Classroom[]> {
        const availableClassrooms = await this.classModel.find({numberOfSeatsLeft: {$gte: 1}}).exec();
        return availableClassrooms;
    }

}