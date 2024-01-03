import React from "react"
import Form from "../../components/Form/Form";
import { Student, Classroom } from "../../Types/types";
import * as S from "./Create.style"
import * as Constants from "./Create.consts";
import { addClassroom } from "../../api/classrooms.api";
import Swal from "sweetalert2";
import { addStudents } from "../../api/students.api";
import alertify from "alertifyjs";
import 'alertifyjs/build/css/alertify.css';
import { useAppDispatch } from "../../hooks";
import { addClass } from "../../state/reducers/classroomSlice";

const Create : React.FC = () => {

    const dispatch = useAppDispatch();
    
    const addClassHandler = async (dataToAdd : Classroom): Promise<void> => {
        try {
            await addClassroom({
                ...dataToAdd,
                capacity: +dataToAdd.seatsLeft
            });
            dispatch(addClass({
                classroom: {
                    _id: dataToAdd._id,
                    name: dataToAdd.name,
                    capacity: +dataToAdd.seatsLeft,
                    seatsLeft: +dataToAdd.seatsLeft
                }
            }));
            alertify.success("הכיתה הוספה");
        } catch(error : any) {
            if (error.response.status !== 409) {
                Swal.fire({
                    title: 'תקלה',
                    text: 'לא ניתן להוסיף את הכיתה הזו',
                    icon: 'error'
                })
            } else {
                Swal.fire({
                    title: 'תקלה',
                    text: 'כיתה בעלת אותו מזהה כבר קיימת',
                    icon: 'error'
                })
            }
        }
    };

    const addStudent = async (dataToAdd: Student): Promise<void> => {
        try {
            await addStudents({
                ...dataToAdd,
                age: +dataToAdd.age
            })
            alertify.success("התלמיד נוסף")
        } catch (error: any) {
            if (error.response.status !== 409) {
                Swal.fire({
                    title: 'תקלה',
                    text: 'לא ניתן להוסיף את התלמיד הזה',
                    icon: 'error'
                })
            } else {
                Swal.fire({
                    title: 'תקלה',
                    text: 'תלמיד בעל אותו מזהה כבר קיים',
                    icon: 'error'
                })
            }
        }
    };

    return (
        <div>
            <S.FormsContainer>
                <Form
                header="Create new class"
                btnText="CREATE CLASS"
                handleClick={addClassHandler}
                fields={Constants.classesFields}></Form>

                <Form 
                header="Add new student"
                btnText="ADD STUDENT"
                handleClick={addStudent}
                fields={Constants.studentFields}></Form>
            </S.FormsContainer>
        </div>
    )
}

export default Create;