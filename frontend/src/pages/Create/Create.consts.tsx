import { FormField } from "../../components/Form/Form.types";
import validation from "../../utils/validation";

export const classesFields : FormField[] = [
    {
        name: "_id",
        required: true,
        placeHolder: "Class ID",
        validation: validation.classroomId,
        helperText: "מזהה צריך להכיל בין ספרה לתשע ספרות"
    },
    {
        name: "name",
        required: true,
        placeHolder: "Name",
        validation: validation.classroomName,
        helperText: "שם כיתה יכול להכיל אותיות בעברית ואנגלית וספרות"
    },
    {
        name: "seatsLeft",
        required: true,
        placeHolder: "Max Seats",
        validation: validation.classroomCapacity,
        helperText: "מספר המקומות בכיתה יכול להיות בן 1 ל 1000"
    }
];

export const studentFields : FormField[] = [
    {
        name: "_id",
        required: true,
        placeHolder: "ID",
        validation: validation.studentId,
        helperText: "מזהה יכול להכיל רק תשע ספרות"
    },
    {
        name: "firstName",
        required: true,
        placeHolder: "First Name",
        validation: validation.onlyLetters,
        helperText: "שם יכול להכיל רק אותיות בעברית או אנגלית"
    },
    {
        name: "lastName",
        required: true,
        placeHolder: "Last Name",
        validation: validation.onlyLetters,
        helperText: "שם יכול להכיל רק אותיות בעברית או אנגלית"
    },
    {
        name: "age",
        required: false,
        placeHolder: "Age",
        validation: validation.studentAge,
        helperText: "גיל יכול להיות בן 8 ל 120"
    },
    {
        name: "profession",
        required: true,
        placeHolder: "Profession",
        validation: validation.onlyLetters,
        helperText: "מקצוע יכול להכי רק אותיות בעברית או אנגלית"
    }
]