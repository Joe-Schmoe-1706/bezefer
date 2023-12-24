import React from "react"
import Form from "../Form/Form";
import { Student, Classroom } from "../../Types/types";
import * as S from "./Create.style"
import * as Constants from "./Create.consts";
import { addClassroom } from "../../api/classrooms.api";
import Swal from "sweetalert2";
import { addStudents } from "../../api/students.api";
import alertify from "alertifyjs";
import 'alertifyjs/build/css/alertify.css';

const Create : React.FC = () => {
    
    const addClass = async (dataToAdd : Classroom): Promise<void> => {
        try {
            await addClassroom({
                ...dataToAdd,
                capacity: +dataToAdd.seatsLeft
            });
            alertify.success("classroom successfully added");
        } catch(error : any) {
                Swal.fire({
                    title: 'error',
                    text: error.response.data.message,
                    icon: 'error'

            })
        }
    };

    const addStudent = async (dataToAdd: Student): Promise<void> => {
        try {
            await addStudents({
                ...dataToAdd,
                age: +dataToAdd.age
            })
            alertify.success("student successfully added")
        } catch (error: any) {
            if (error.message === "duplicate ID") {
                Swal.fire({
                    title: 'duplicate id',
                    text: 'id is alredy taken, insert a different one',
                    icon: 'error'
                })
             } else {
                Swal.fire({
                    title: 'error',
                    text: 'could not add student',
                    icon: 'error'
                })
            }
        }
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