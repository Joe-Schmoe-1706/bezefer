import React, {useContext, useState} from "react"
import { ThemeContextType, ContextProps } from "../Types/types";

const ThemeContext = React.createContext<ThemeContextType | null>(null);
const UpdateThemeContext = React.createContext<(() => void) | null>(null);

export const useTheme = () => {
    return useContext(ThemeContext);
}

export const useUpdateTheme = () => {
    return useContext(UpdateThemeContext);
}

const ThempeProvider : React.FC<ContextProps> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeContextType>("blue")

    const toggleTheme = () : void => {
        console.log(theme);
        setTheme((prevTheme) => {
            return prevTheme === "red" ? "blue" : "red"
        })
    };

    return (
        <ThemeContext.Provider value={theme}>
            <UpdateThemeContext.Provider value={toggleTheme}>
                {children}
            </UpdateThemeContext.Provider>
        </ThemeContext.Provider>
    )
}

export default ThempeProvider;