import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Res } from "@nestjs/common";
import { StudentsService } from "./students.service";
import { Student } from "./students.model";
import { StudentDTO } from "./StudentDTO";
import { Response } from "express";

@Controller('students')
export class StudentsController {
    constructor(
        private readonly studentsService: StudentsService
    ) {}

    @Get()
    async findAllStudents() : Promise<Student[]> {
        const classes = await this.studentsService.findAll();
        return classes;
    }

    @Get('/DTO')
    async findAllStudentsDTO(): Promise<StudentDTO[]> {
        const students = await this.studentsService.findAllDTO();
        return students;
    }

    @Delete(':id')
    async removeStudent(@Param('id') studentId: string) {
        await this.studentsService.deleteStudent(studentId);
    }

    @Post()
    async addStudent(
      @Body('student') student: Student,
      @Res() res: Response
    ) {
        try {
            await this.studentsService.addStudent(student);
            res.status(201).send('');
        } catch (error) {
            if (error.message = "duplicate ID") {
                res.status(400).send("duplicate ID");
            } else {
                res.status(500).send('');
            }
        }
    }

    @Patch(':id/classroom/:classroomId/add')
    async addStudentToClass(@Param('id') studentId: string, @Param('classroomId') classroomId: string, @Res() res: Response) {
        try {
            await this.studentsService.changeStudentClassStatus(studentId, classroomId, "add");
            res.status(200).send('');
        } catch(error) {
            if (error.message === "there are no available seats in this class") {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    }

    @Patch(':id/classroom/:classroomId/remove')
    async removeStudentToClass(@Param('id') studentId: string, @Param('classroomId') classroomId: string, @Res() res: Response) {
        try {
            await this.studentsService.changeStudentClassStatus(studentId, classroomId, "remove");
            res.status(200).send('');
        } catch(error) {
            res.status(500).json({ message: error.message });
        }
    }

    @Get('/classroom/:id')
    async getStudentsInClassroom(@Param('id') classroomId: string) {
        return this.studentsService.getStudentsInClass(classroomId);
    }
} 