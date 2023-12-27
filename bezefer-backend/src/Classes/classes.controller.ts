import { Body, Controller, Delete, Get, Param, Post, Res } from "@nestjs/common";
import { ClassesService } from "./classes.service";
import { Classroom } from "./classes.model";
import { Response } from "express";

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
        @Res() res: Response
    ) {
        try {
            await this.classesService.addClass(classroom);
            res.status(201).send('');
        } catch (error) {
            if (error.message === "duplicate ID") {
                res.status(400).send("duplicate Id");
            } else {
                res.status(500).send('');
            }
        }
    }

    @Delete(':id')
    async removeClassroom(@Param('id') classroomId: string, @Res() res: Response) {
        try {
            await this.classesService.deleteClass(classroomId);
            res.status(204).send('');
        } catch (error) {
            res.status(500).send({message : error.message});
        }
    }

    @Get('/available')
    async getAvailableClassroom() {
        return await this.classesService.findAvailableClassrooms();
    }
}