import React, { FormEvent, useState } from "react"
import { FormProps } from "./Form.types"
import * as S from "./Form.style"
import { useTheme } from "../../Context/ThemeContext"

const Form : React.FC<FormProps> = ({header, btnText, handleClick, fields}) => {
    const initialFormData : Record<string, string> =  {};

    const {theme} = useTheme();

    fields.forEach((field) => {
        initialFormData[field.name] = ''
    })

    const [formData, setFormData] = useState<Record<string,string>>(initialFormData);
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
            <div>
                <S.InputField 
                error={!field.validation(formData[field.name].toString()) && formData[field.name].toString() !== ''}
                required={field.required}
                label={field.placeHolder}  
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                />
                <S.HelperText isError={!field.validation(formData[field.name].toString())} isEmpty={formData[field.name].toString() === ''}>{field.helperText}</S.HelperText>
            </div>
        )
    })

    const validateData = (data : Record<string, string>) : boolean => {
        return Object.keys(data).every((key) => {
            const formField = fields.find((field) => field.name === key);
            return formField?.validation(formData[key].toString());
        })
    }

    const clearForm = (): void => {
        setFormData((prevData) => {
            let newData: Record<string,string> = {}
            Object.keys(prevData).forEach((key) => {
                newData[key] = ''
            })

            return newData;
        })
    }

    const submit = (e : FormEvent<HTMLFormElement>, formData : Record<string, string>) : void => {
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
            <S.StyledForm onSubmit={(e: FormEvent<HTMLFormElement>) => submit(e, formData)}>
                {renderedFields}
                <S.SubmitBtn 
                 projectTheme={theme.hex} 
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