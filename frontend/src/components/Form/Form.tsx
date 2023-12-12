import React, {MouseEventHandler, useState} from "react"
import { Props } from "./Form.types"
import * as S from "./Form.style"
import { useTheme } from "../../Context/ThemeContext"
import { Class, Student } from "../../Types/types"

const Form : React.FC<Props> = ({header, btnText, handleClick, fields}) => {
    const initialFormData : any = {}

    const theme = useTheme();

    fields.forEach((field) => {
        initialFormData[field.name] = ''
    })

    const [formData, setFormData] = useState<Student | Class>(initialFormData);

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
             type="text" 
             placeholder={`  ${field.placeHolder} ${field.required ? "*" : ""}`}  
             name={field.name}
             value={formData[field.name]}
             onChange={handleChange}
            />
        )
    })

    return (
        <S.FormContainer>
            <S.FormHeader>{header}</S.FormHeader>
            <S.StyledForm>
                {renderedFields}
                <S.SubmitBtn 
                 projectTheme={theme} 
                 onClick={(e: Event) => handleClick(e, formData)}
                 >
                    {btnText}
                </S.SubmitBtn>
            </S.StyledForm>
        </S.FormContainer>
    )
}

export default Form;