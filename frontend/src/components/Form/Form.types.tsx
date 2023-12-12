import { MouseEventHandler } from "react"
import { Class, Student } from "../../Types/types"

export interface FormField {
    name: string,
    placeHolder: string,
    required: boolean
};

export interface Props {
    header: string,
    btnText: string,
    handleClick: (event : Event, formData : (Student | Class)) => void,
    fields : FormField[]
}