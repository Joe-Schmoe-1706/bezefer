import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Student, StudentSchema } from "./students.model";
import { StudentsController } from "./students.controller";
import { StudentsService } from "./students.service";
import { ClassesModule } from "../Classes/classes.module";

@Module({
    imports: [MongooseModule.forFeature([{name : Student.name, schema: StudentSchema}]),
                ClassesModule],
    controllers: [StudentsController],
    providers: [StudentsService]
})
export class StudentModule {};