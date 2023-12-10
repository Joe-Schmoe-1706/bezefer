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