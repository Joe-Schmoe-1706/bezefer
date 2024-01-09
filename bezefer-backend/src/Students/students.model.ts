import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {HydratedDocument} from 'mongoose'

@Schema()
export class Student {
    @Prop({required: true})
    _id: string

    @Prop({required: true})
    firstName: string

    @Prop({required: true})
    lastName: string

    @Prop({required: false})
    age: number

    @Prop({required: true})
    profession: string

    @Prop({type: String, ref: "Classroom", required: true})
    classroom: String
};

export const StudentSchema = SchemaFactory.createForClass(Student);