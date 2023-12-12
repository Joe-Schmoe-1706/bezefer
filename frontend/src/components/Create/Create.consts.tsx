import { FormField } from "../Form/Form.types";

export const classesFields : FormField[] = [
    {
        name: "id",
        required: true,
        placeHolder: "Class ID"
    },
    {
        name: "name",
        required: true,
        placeHolder: "Name"
    },
    {
        name: "capacity",
        required: true,
        placeHolder: "Max Seats"
    }
];

export const studentFields : FormField[] = [
    {
        name: "id",
        required: true,
        placeHolder: "ID"
    },
    {
        name: "firstName",
        required: true,
        placeHolder: "First Name"
    },
    {
        name: "lastName",
        required: true,
        placeHolder: "Last Name"
    },
    {
        name: "age",
        required: false,
        placeHolder: "Age"
    },
    {
        name: "profession",
        required: true,
        placeHolder: "Profession"
    }
]