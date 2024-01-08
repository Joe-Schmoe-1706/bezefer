import { ColorOption } from "../Types/types";

export interface ThemeType {
    hex: ColorOption,
    name: string
}

export interface ContextData {
    theme: ThemeType,
    toggleTheme: (theme: ThemeType) => void
}