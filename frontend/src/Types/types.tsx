export type ThemeContextType = "#F50057" | "#3F50B5" | "#5c5248" | "#7b2cbf" | "#2a850e" | "#4d0b0a";

export interface ContextProps {
    children : React.ReactNode
};

export interface Student {
    _id: string,
    firstName: string,
    lastName: string,
    age?: number | "",
    profession: string,
    classroom: string,
    [key: string]: string | number | undefined
}

export interface Class {
    id: string,
    name: string,
    seatsLeft: number
    [key: string]: string | number
}

export interface Classroom {
    _id: string,
    name: string,
    capacity: number,
    seatsLeft: number
    [key: string]: string | number
}

export type StatusOptions = "loading" | "done" | "failed";