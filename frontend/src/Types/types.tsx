export type ThemeContextType = "red" | "blue";

export interface ContextProps {
    children : React.ReactNode
};

export interface StudentsModalProps {
    isOpen : boolean,
    closeModal : () => void,
    items : {
        id : number,
        name : string
    }[],
    handleClick: (id : number) => void,
    listType : 'students' | 'classes'
}

export interface Student {
    id: string,
    firstName: string,
    lastName: string,
    age: number,
    profession: string
    [key: string]: string | number
}

export interface Class {
    id: string,
    name: string,
    capacity: number
    [key: string]: string | number
}