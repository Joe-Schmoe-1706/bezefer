import { Controller, Delete, Get, Param } from "@nestjs/common";
import { StudentsService } from "./students.service";
import { Student } from "./students.model";

@Controller('students')
export class StudentsController {
    constructor(
        private readonly studentsService: StudentsService
    ) {}

    @Get()
    async GetAllClasses() : Promise<Student[]> {
        const classes = await this.studentsService.findAll();
        return classes;
    }

    @Delete(':id')
    async removeClassroom(@Param('id') studentId: string) {
        await this.studentsService.deleteStudent(studentId);
    }
}