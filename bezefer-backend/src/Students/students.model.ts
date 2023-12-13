import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

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
};

export const StudentSchema = SchemaFactory.createForClass(Student);