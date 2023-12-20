import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { StudentsService } from "./students.service";
import { Student } from "./students.model";
import { StudentDTO } from "./StudentDTO";

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
    ) {
        try {
            await this.studentsService.addStudent(student);
        } catch (error) {
            throw (error);
        }
    }

    @Patch(':id/classroom/:classroomId/add')
    async addStudentToClass(@Param('id') studentId: string, @Param('classroomId') classroomId: string) {
        this.studentsService.changeStudentClassStatus(studentId, classroomId, "add");
    }

    @Patch(':id/classroom/:classroomId/remove')
    async removeStudentToClass(@Param('id') studentId: string, @Param('classroomId') classroomId: string) {
        this.studentsService.changeStudentClassStatus(studentId, classroomId, "remove");
    }

    @Get('/classroom/:id')
    async getStudentsInClassroom(@Param('id') classroomId: string) {
        return this.studentsService.getStudentsInClass(classroomId);
    }
} 