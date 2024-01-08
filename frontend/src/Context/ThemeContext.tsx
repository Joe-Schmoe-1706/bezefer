import React, { useContext, useState } from "react";
import { ColorOption, ContextProps } from "../Types/types";
import { ContextData, ThemeType } from "./ThemeContext.types";

const defaultTheme: ThemeType = {
    hex: "#3F50B5",
    name: "blue"
};

const ThemeContext = React.createContext<ContextData>({
    theme: defaultTheme,
    toggleTheme: () => {}
});

export const useTheme = () => {
  return useContext(ThemeContext);
}

const ThemeProvider: React.FC<ContextProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(defaultTheme);

  const toggleTheme = (theme: ThemeType): void => {
    setTheme(theme);
  };

  const contextValue = {
    theme,
    toggleTheme
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;