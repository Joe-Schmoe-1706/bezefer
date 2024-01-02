import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Res } from "@nestjs/common";
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

    @Delete('')
    async removeStudent(@Query("studentId") studentId: string) {
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

    @Patch('/classroom/add')
    async addStudentToClass(@Query("studentId") studentId: string, @Query("classroomId") classroomId: string, @Res() res: Response) {
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

    @Patch('/classroom/remove')
    async removeStudentToClass(@Query("studentId") studentId: string, @Query("classroomId") classroomId: string, @Res() res: Response) {
        try {
            console.log(studentId);
            await this.studentsService.changeStudentClassStatus(studentId, classroomId, "remove");
            res.status(200).send('');
        } catch(error) {
            res.status(500).json({ message: error.message });
        }
    }

    @Get('/classroom')
    async getStudentsInClassroom(@Query('classroomId') classroomId: string) {
        return this.studentsService.getStudentsInClass(classroomId);
    }
} 