import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"
import {IsNotEmpty, IsNumber, IsNumberString, Length, Matches, Min, Max } from "class-validator"

@Schema()
export class Classroom {
    @Prop({required: true})
    @IsNumberString({no_symbols: true})
    @IsNotEmpty()
    @Length(1,9)
    _id: string

    @Prop({required: true})
    @IsNotEmpty()
    @Matches(/^[\u0590-\u05fea-zA-Z][\u0590-\u05fea-zA-Z\s\d]*$/)
    name: string

    @Prop({required: true})
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(999)
    capacity: number

    @Prop({required: true})
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(999)
    seatsLeft: number
}

export const ClassroomSchema = SchemaFactory.createForClass(Classroom);

export type ClassroomDocument = HydratedDocument<Classroom>