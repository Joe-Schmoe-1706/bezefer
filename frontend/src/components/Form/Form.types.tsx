export interface FormField {
    name: string,
    placeHolder: string,
    required: boolean,
    validation : (value : string) => boolean,
    helperText: string
};

export interface FormProps {
    header: string,
    btnText: string,
    handleClick: (data : Record<string,string>) => Promise<void>,
    fields : FormField[]
}