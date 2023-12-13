import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Classroom, ClassroomSchema } from "./classes.model";
import { ClassesController } from "./classes.controller";
import { ClassesService } from "./classes.service";

@Module({
    imports: [MongooseModule.forFeature([{name : Classroom.name, schema: ClassroomSchema}])],
    controllers: [ClassesController],
    providers: [ClassesService],
})
export class ClassesModule {};