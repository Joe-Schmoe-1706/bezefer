import { Classroom, Student } from "../../Types/types"

export interface FormField {
    name: string,
    placeHolder: string,
    required: boolean,
    validation : (value : string) => boolean,
    helperText: string
};

export interface Props {
    header: string,
    btnText: string,
    handleClick: (data : Record<string,string>) => Promise<void>,
    fields : FormField[]
}