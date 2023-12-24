import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class Classroom {
    @Prop()
    _id: string

    @Prop()
    name: string

    @Prop()
    capacity: number

    @Prop()
    seatsLeft: number
}

export const ClassroomSchema = SchemaFactory.createForClass(Classroom);

export interface Classroom {
    _id: string
    name: string,
    capacity: number,
    seatsLeft: number
}