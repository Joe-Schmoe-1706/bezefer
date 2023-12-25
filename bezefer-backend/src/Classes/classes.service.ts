import { Model } from "mongoose";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Classroom } from "./classes.model";
import { StudentsService } from "../Students/students.service";
import validation from "../validation";
import { NotFoundError } from "rxjs";

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
        validation.validatecapacity(classroom.capacity);
    }
 
    async addClass(classroom: Classroom) : Promise<void> {
        if (!this.validateClass(classroom)) {
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
            if (error.code === 11000) {
                throw new Error("duplicate ID")
            }
            throw (error);
        }
    }

    async deleteClass(classroomId: string): Promise<void> {
        const classroomToDelete = await this.classModel.findById(classroomId).exec();
        if (!classroomToDelete) {
            throw new NotFoundError('classroom does not exist');
        }
        
        if (classroomToDelete.capacity === classroomToDelete.seatsLeft) {
            await this.classModel.deleteOne({_id : classroomId}).exec();
        } else {
            throw new Error("class is not empty");
        }
    }

    async changecapacity(classroomId: String, action: string): Promise<void> {
        const updatedClassroom = await this.classModel.findById(classroomId).exec();
        updatedClassroom.seatsLeft = action === "add" ?
         updatedClassroom.seatsLeft - 1 :
         updatedClassroom.seatsLeft + 1;

        await updatedClassroom.save();
    }

    async findAvailableClassrooms(): Promise<Classroom[]> {
        const availableClassrooms = await this.classModel.find({seatsLeft: {$gte: 1}}).exec();
        return availableClassrooms;
    }

}