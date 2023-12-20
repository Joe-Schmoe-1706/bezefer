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
        }
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
        }
    },
    {
        name: "capacity",
        required: true,
        placeHolder: "Max Seats",
        validation: (capacity : string) => {
            if (capacity.match(/^[\d]*$/)) {
                if (parseInt(capacity) > 0 && parseInt(capacity) < 1000) {
                    return true;
                }
            }

            return false;
        }
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
        }
    },
    {
        name: "firstName",
        required: true,
        placeHolder: "First Name",
        validation: (firstName: string) => {
           return onlyLetters(firstName)
        }
    },
    {
        name: "lastName",
        required: true,
        placeHolder: "Last Name",
        validation: (lastName: string) => {
            return onlyLetters(lastName)
        }
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
        }
    },
    {
        name: "profession",
        required: true,
        placeHolder: "Profession",
        validation: (profession: string) => {
            return onlyLetters(profession)
        }
    }
]