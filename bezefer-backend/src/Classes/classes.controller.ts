import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ClassesService } from "./classes.service";
import { Classroom } from "./classes.model";

@Controller('classes')
export class ClassesController {
    constructor(
        private readonly classesService: ClassesService
    ) {}

    @Get()
    async GetAllClasses() : Promise<Classroom[]> {
        const classes = await this.classesService.findAll();
        return classes;
    }

    @Post()
    async addProduct(
        @Body('id') _id: string,
        @Body('name') name: string,
        @Body('numberOfSeats') numberOfSeats: number
    ) {
        const returnedId = await this.classesService.addClass(_id, name, numberOfSeats);
        return returnedId;
    }

    @Delete(':id')
    async removeClassroom(@Param('id') classroomId: string) {
        await this.classesService.deleteClass(classroomId);
    }
}