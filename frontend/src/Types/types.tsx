export type ThemeContextType = "red" | "blue";

export interface ContextProps {
    children : React.ReactNode
};

export interface Student {
    _id: string,
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

export interface Classroom {
    _id: string,
    name: string,
    numberOfSeats: number,
    numberOfSeatsLeft: number
}