import { FormField } from "../Form/Form.types";

export const classesFields : FormField[] = [
    {
        name: "_id",
        required: true,
        placeHolder: "Class ID",
        validation: (id : string) => {
            if (id.match(/^[\d]{1,9}$/)) {
                return true;
            }

            return false
        },
        helperText: "מזהה צריך להכיל גג תשע ספרות"
    },
    {
        name: "name",
        required: true,
        placeHolder: "Name",
        validation: (name : string) => {
            if (name.match(/^[\u0590-\u05fea-zA-Z][\u0590-\u05fea-zA-Z\s\d]*$/)) {
                return true;
            }

            return false;
        },
        helperText: "שם כיתה יכול להכיל אותיות בעברית ואנגלית וספרות"
    },
    {
        name: "seatsLeft",
        required: true,
        placeHolder: "Max Seats",
        validation: (seatsLeft : string) => {
            if (seatsLeft.match(/^[\d]*$/)) {
                if (parseInt(seatsLeft) > 0 && parseInt(seatsLeft) < 1000) {
                    return true;
                }
            }

            return false;
        },
        helperText: "מספר המקומות בכיתה יכול להיות בן 1 ל 1000"
    }
];

const onlyLetters = (string : string) : boolean  => {
    if (string.match(/^[a-zA-Z\u0590-\u05fe\s]+$/)) {
        return true;
    }

    return false;
}

export const studentFields : FormField[] = [
    {
        name: "_id",
        required: true,
        placeHolder: "ID",
        validation: (id : String) => {
            if (id.match(/^[\d]{9}$/)) {
                return true;
            }

            return false;
        },
        helperText: "מזהה יכול להכיל רק תשע ספרות"
    },
    {
        name: "firstName",
        required: true,
        placeHolder: "First Name",
        validation: (firstName: string) => {
           return onlyLetters(firstName)
        },
        helperText: "שם יכול להכי רק אותיות בעברית או אנגלית"
    },
    {
        name: "lastName",
        required: true,
        placeHolder: "Last Name",
        validation: (lastName: string) => {
            return onlyLetters(lastName)
        },
        helperText: "שם יכול להכי רק אותיות בעברית או אנגלית"
    },
    {
        name: "age",
        required: false,
        placeHolder: "Age",
        validation: (age : string) => {
            if (age.match(/^[\d]*$/)) {
                if (parseInt(age) >= 8 && parseInt(age) <= 120) {
                    return true;
                }
            }

            return false;
        },
        helperText: "גיל יכול להיות בן 8 ל 120"
    },
    {
        name: "profession",
        required: true,
        placeHolder: "Profession",
        validation: (profession: string) => {
            return onlyLetters(profession)
        },
        helperText: "מקצוע יכול להכי רק אותיות בעברית או אנגלית"
    }
]