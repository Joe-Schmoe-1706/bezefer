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
    async addClassroom(
        @Body('classroom') classroom: Classroom,
    ) {
        return await this.classesService.addClass(classroom);
    }

    @Delete(':id')
    async removeClassroom(@Param('id') classroomId: string) {
        await this.classesService.deleteClass(classroomId);
    }

    @Get('/available')
    async getAvailableClassroom() {
        return await this.classesService.findAvailableClassrooms();
    }
}