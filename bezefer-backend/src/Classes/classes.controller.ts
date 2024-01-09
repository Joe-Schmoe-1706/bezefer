import { Body, ConflictException, Controller, Delete, Get, Param, Post, Res } from "@nestjs/common";
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
        try {
            const classes = await this.classesService.findAll();
            return classes;
        } catch(error) {
            throw error;
        }
    }

    @Post()
    async addClassroom(
        @Body('classroom') classroom: Classroom,
    ) {
        try {
            await this.classesService.addClass(classroom);
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException("duplicate Id");
            } else {
                throw error;
            }
        }
    }

    @Delete('')
    async removeClassroom(@Body('classroom') classroom: Classroom) {
        try {
            await this.classesService.deleteClass(classroom);
        } catch (error) {
            throw error;
        }
    }
}