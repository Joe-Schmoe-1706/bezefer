import { Model } from "mongoose";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Classroom } from "./classes.model";
import { StudentsService } from "src/Students/students.service";
import validation from "src/validation";

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

    validateClass(classroom: Classroom): boolean {
        return validation.validateClassId(classroom._id) &&
        validation.validateClassName(classroom.name) &&
        validation.validateNumberOfSeats(classroom.numberOfSeats);
    }
 
    async addClass(classroom: Classroom) : Promise<void> {
        if (!this.validateClass(classroom)) {
            throw new BadRequestException("classroom is not valid")
        }
        
        try {
            const newClassroom = new this.classModel({
                _id: classroom._id,
                name: classroom.name,
                numberOfSeats: classroom.numberOfSeats,
                numberOfSeatsLeft: classroom.numberOfSeats
            });
            await newClassroom.save()
        } catch (error) {
            if (error.code === 11000) {
                throw new Error("duplicate ID")
            }
            throw (error);
        }
    }

    async deleteClass(classroomId: string): Promise<void> {
        const classroomToDelete = await this.classModel.findById(classroomId).exec();
        if (classroomToDelete.numberOfSeats === classroomToDelete.numberOfSeatsLeft) {
            await this.classModel.deleteOne({_id : classroomId}).exec();
        } else {
            throw new Error("class is not empty");
        }
    }

    async changeNumberOfSeats(classroomId: String, action: string): Promise<void> {
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