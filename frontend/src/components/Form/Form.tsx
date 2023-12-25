import React, {FormEventHandler, useState} from "react"
import { Props } from "./Form.types"
import * as S from "./Form.style"
import { useTheme } from "../../Context/ThemeContext"
import { Classroom, Student } from "../../Types/types"

const Form : React.FC<Props> = ({header, btnText, handleClick, fields}) => {
    const initialFormData : Student | Classroom =  {} as Student | Classroom;

    const theme = useTheme();

    fields.forEach((field) => {
        initialFormData[field.name] = ''
    })

    const [formData, setFormData] = useState<Student | Classroom>(initialFormData);
    const [showError, setShowError] = useState<boolean>(false);

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) : void => {
        if (event.target !== null)
        {
            const name = event.target.name;
            const value = event.target.value;

            setFormData(prevData => {
                return {
                    ...prevData,
                    [name] : value
                }
            });
        }
    }

    const renderedFields = fields.map((field) => {
        return (
            <S.InputField 
             error={!field.validation(formData[field.name].toString()) && formData[field.name].toString() !== ''}
             required={field.required}
             label={field.placeHolder}  
             name={field.name}
             value={formData[field.name]}
             onChange={handleChange}
            />
        )
    })

    const validateData = (data : Student | Classroom) : boolean => {
        let validated = true;

        Object.keys(data).forEach((key) => {
            const formField = fields.find((field) => field.name === key);
            if (!formField?.validation(formData[key].toString())) {
                validated = false;
            }
        })

        return validated;
    }

    const clearForm = (): void => {
        setFormData((prevData) => {
            let newData = {} as Classroom | Student;
            Object.keys(prevData).forEach((key) => {
                newData[key] = ''
            })

            return newData;
        })
    }

    const submit = (e : Event, formData : Student | Classroom) : void => {
        e.preventDefault();
        if (validateData(formData)) {
            handleClick(formData);
            clearForm();
        } else {
            setShowError(true);
        }
    };

    return (
        <S.FormContainer>
            <S.FormHeader>{header}</S.FormHeader>
            <S.StyledForm onSubmit={(e: Event) => submit(e, formData)}>
                {renderedFields}
                <S.SubmitBtn 
                 projectTheme={theme} 
                 type="submit"
                 disabled={validateData(formData) === false}
                 >
                    {btnText}
                </S.SubmitBtn>
            </S.StyledForm>
            <S.ErrorMessage showError={showError}>Form did not pass validation check! fix it and try</S.ErrorMessage>
        </S.FormContainer>
    )
}

export default Form;