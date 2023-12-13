import React from "react"
import Form from "../Form/Form";
import { Class } from "../../Types/types";
import * as S from "./Create.style"
import * as Constants from "./Create.consts";
import { Student } from "../Students/Students.types";

const Create : React.FC = () => {
    
    const addClass = (dataToAdd : Class): void => {
        console.log("added a class");
        console.log(dataToAdd);
    };

    const addStudent = (dataToAdd: Student): void => {
        console.log("added a student");
        console.log(dataToAdd);
    };

    return (
        <S.FormsContainer>
            <Form 
             header="Create new class"
             btnText="CREATE CLASS"
             handleClick={addClass}
             fields={Constants.classesFields}></Form>

             <Form 
             header="Add new student"
             btnText="ADD STUDENT"
             handleClick={addStudent}
             fields={Constants.studentFields}></Form>
        </S.FormsContainer>
    )
}

export default Create;