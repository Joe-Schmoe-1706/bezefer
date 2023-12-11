import React from "react"
import Form from "../Form/Form";
import { Class } from "../../Types/types";
import { FormField } from "../Form/Form.types";
import * as S from "./Create.style"

const Create : React.FC = () => {
    const fields : FormField[] = [
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
    }];

    const addClass = (event : Event, dataToAdd : Class): void => {
        event.preventDefault();
        console.log("added a class");
        console.log(dataToAdd);
    } 


    return (
        <S.FormsContainer>
            <Form 
             header="Create new class"
             btnText="CREATE CLASS"
             handleClick={addClass}
             fields={fields}></Form>

             <Form 
             header="Create new class"
             btnText="CREATE CLASS"
             handleClick={addClass}
             fields={fields}></Form>
        </S.FormsContainer>
    )
}

export default Create;