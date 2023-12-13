import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class Classroom {
    @Prop()
    _id: string

    @Prop()
    name: string

    @Prop()
    numberOfSeats: number

    @Prop()
    numberOfSeatsLeft: number
}

export const ClassroomSchema = SchemaFactory.createForClass(Classroom);

export interface Classroom {
    _id: string
    name: string,
    numberOfSeats: number,
    numberOfSeatsLeft: number
}