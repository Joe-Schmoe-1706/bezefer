import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {HydratedDocument} from 'mongoose'
import { IsNotEmpty, IsNumber, IsNumberString, Length, Matches, Max, Min } from 'class-validator'

@Schema()
export class Student {
    @IsNotEmpty()
    @IsNumberString({no_symbols: true})
    @Length(9)
    @Prop({required: true})
    _id: string

    @Matches(/^[a-zA-Z\u0590-\u05fe\s]+$/)
    @Prop({required: true})
    firstName: string

    @Matches(/^[a-zA-Z\u0590-\u05fe\s]+$/)
    @Prop({required: true})
    lastName: string

    @Prop({required: false})
    @IsNumber()
    @Min(8)
    @Max(120)
    age: number

    @Matches(/^[a-zA-Z\u0590-\u05fe\s]+$/)
    @Prop({required: true})
    profession: string

    @Prop({type: String, ref: "Classroom", required: true})
    @IsNumberString({no_symbols: true})
    @IsNotEmpty()
    @Length(1,9)
    classroom: String
};

export const StudentSchema = SchemaFactory.createForClass(Student);

export type StudentDocument = HydratedDocument<Student>