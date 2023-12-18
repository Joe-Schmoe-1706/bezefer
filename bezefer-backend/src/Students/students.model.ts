import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Classroom } from "src/Classes/classes.model";

@Schema()
export class Student {
    @Prop()
    _id: string

    @Prop()
    firstName: string

    @Prop()
    lastName: string

    @Prop()
    age: number

    @Prop()
    profession: string

    @Prop({type: String, ref: "Classroom"})
    classroom: String
};

export const StudentSchema = SchemaFactory.createForClass(Student);