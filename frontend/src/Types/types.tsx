export type ThemeContextType = "red" | "blue";

export interface ContextProps {
    children : React.ReactNode
};

export interface StudentsModalProps {
    isOpen : boolean,
    closeModal : () => void
}