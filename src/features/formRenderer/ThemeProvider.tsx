import { createContext, ReactNode, useContext } from "react";

const ThemeContext = createContext<{}>({})

interface ThemeProviderProps {
    children: ReactNode;
    theme: any
}

export const ThemeProvider = (props: ThemeProviderProps) => {
    const { children, theme } = props

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)