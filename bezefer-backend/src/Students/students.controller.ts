import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { StudentsService } from "./students.service";
import { Student } from "./students.model";

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

    @Delete(':id')
    async removeStudent(@Param('id') studentId: string) {
        await this.studentsService.deleteStudent(studentId);
    }

    @Post()
    async addStudent(
      @Body("_id") _id: string,
      @Body("firstName") firstName: string,
      @Body("lastName") lastName: string,
      @Body("age") age: number,
      @Body("profession") profession: string  
    ) {
        await this.studentsService.addStudent(_id, firstName, lastName, age, profession);
    }

    @Patch(':id/classroom/:classroomId/add')
    async addStudentToClass(@Param('id') studentId: string, @Param('classroomId') classroomId: string) {
        this.studentsService.changeStudentClassStatus(studentId, classroomId, "add");
    }

    @Patch(':id/classroom/:classroomId/remove')
    async removeStudentToClass(@Param('id') studentId: string, @Param('classroomId') classroomId: string) {
        this.studentsService.changeStudentClassStatus(studentId, classroomId, "remove");
    }
} 