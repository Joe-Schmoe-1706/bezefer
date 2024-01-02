import React, {useContext, useState} from "react"
import { ThemeContextType, ContextProps } from "../Types/types";

const ThemeContext = React.createContext<ThemeContextType>("#3F50B5");
const UpdateThemeContext = React.createContext<((color: ThemeContextType) => void)>(() => {});

export const useTheme = () => {
    return useContext(ThemeContext);
}

export const useUpdateTheme = () => {
    return useContext(UpdateThemeContext);
}

const ThempeProvider : React.FC<ContextProps> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeContextType>("#3F50B5")

    const toggleTheme = (color: ThemeContextType) : void => {
        setTheme(color);
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