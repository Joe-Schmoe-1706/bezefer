import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

@Schema()
export class Classroom {
    @Prop({required: true})
    _id: string

    @Prop({required: true})
    name: string

    @Prop({required: true})
    capacity: number

    @Prop({required: true})
    seatsLeft: number
}

export const ClassroomSchema = SchemaFactory.createForClass(Classroom);

export type ClassroomDocument = HydratedDocument<Classroom>