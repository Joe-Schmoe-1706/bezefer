import { Model } from "mongoose";
import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Classroom, ClassroomDocument } from "./classes.model";
import { validate } from "class-validator";

@Injectable()
export class ClassesService {


    constructor(
        @InjectModel(Classroom.name) private readonly classModel : Model<Classroom>
    ) {}

    async findAll(): Promise<Classroom[]> {
        const classes = await this.classModel.find().lean();
        return classes;
    }

    async findClassById(classroomId: string): Promise<ClassroomDocument> {
        return await this.classModel.findById(classroomId).lean();
    }
 
    async addClass(classroom: Classroom) : Promise<void> {
        const errors = await validate(classroom);

        if (errors.length > 0) {
            throw new BadRequestException("classroom is not valid")
        }
        
        try {
            const newClassroom = new this.classModel({
                _id: classroom._id,
                name: classroom.name,
                capacity: classroom.capacity,
                seatsLeft: classroom.capacity
            });
            await newClassroom.save()
        } catch (error) {
            throw error;
        }
    }

    async deleteClass(classroom: Classroom): Promise<void> {  
        if (classroom.capacity === classroom.seatsLeft) {
            await this.classModel.findByIdAndDelete(classroom._id);
        } else {
            throw new Error("class is not empty");
        }
    }

    async changecapacity(classroomId: String, action: string): Promise<void> {
        try {
            const updatedClassroom = await this.classModel.findById(classroomId).exec();
            updatedClassroom.seatsLeft = action === "add" ?
             updatedClassroom.seatsLeft - 1 :
             updatedClassroom.seatsLeft + 1;
    
            await updatedClassroom.save();
        } catch (error) {
            throw error;
        }
    }
}