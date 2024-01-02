import { BadRequestException, Body, ConflictException, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Res } from "@nestjs/common";
import { StudentsService } from "./students.service";
import { Student } from "./students.model";

@Controller('students')
export class StudentsController {
    constructor(
        private readonly studentsService: StudentsService
    ) {}

    @Get()
    async findAllStudents() : Promise<Student[]> {
        try {
            const classes = await this.studentsService.findAll();
            return classes;
        } catch (error) {
            throw error;
        }
    }

    @Delete('')
    async removeStudent(@Query("studentId") studentId: string) {
        try {
            await this.studentsService.deleteStudent(studentId);
        } catch (error) {
            throw error;
        }
    }

    @Post()
    async addStudent(
      @Body('student') student: Student
    ) {
        try {
            await this.studentsService.addStudent(student);
        } catch (error) {
            console.log(error);
            if (error.code === 11000) {
                throw new ConflictException("duplicate id");
            } else {
                throw error;
            }
        }
    }

    @Patch('/classroom/add')
    async addStudentToClass(@Query("studentId") studentId: string, @Query("classroomId") classroomId: string) {
        try {
            await this.studentsService.changeStudentClassStatus(studentId, classroomId, "add");
        } catch(error) {
            throw error;
        }
    }

    @Patch('/classroom/remove')
    async removeStudentToClass(@Query("studentId") studentId: string, @Query("classroomId") classroomId: string) {
        try {
            await this.studentsService.changeStudentClassStatus(studentId, classroomId, "remove");
        } catch(error) {
            throw error;
        }
    }

    @Get('/classroom')
    async getStudentsInClassroom(@Query('classroomId') classroomId: string) {
        try {
            return this.studentsService.getStudentsInClass(classroomId);
        } catch (error) {
            throw error;
        }
    }
} 