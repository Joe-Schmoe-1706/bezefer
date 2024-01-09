import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

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

export interface Classroom {
    _id: string
    name: string,
    capacity: number,
    seatsLeft: number
}