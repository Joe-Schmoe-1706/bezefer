import React, {useState} from "react"
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

    const handleChange = (event : Event) : void => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData(prevData => {
            return {
                ...prevData,
                [name] : value
            }
        });
    }

    const renderedFields = fields.map((field) => {
        return (
            <S.InputField 
             type="text" 
             placeholder={field.placeHolder} 
             name={field.name}
             fieldRequired={field.required}
             value={formData[field.name]}
             onChange={handleChange}
            />
        )
    })

    return (
        <S.FormContainer>
            <S.formHeader>{header}</S.formHeader>
            <S.StyledForm>
                {renderedFields}
                <S.submitBtn 
                 projectTheme={theme} 
                 onClick={() => handleClick(event, formData)}
                 >
                    {btnText}
                </S.submitBtn>
            </S.StyledForm>
        </S.FormContainer>
    )
}

export default Form;