import Paper from "@mui/material/Paper";
import { ReactNode } from "react"

interface FieldWrapperProps {
    children: ReactNode;
}

export const FieldWrapper = (props: FieldWrapperProps) => {
    const { children } = props

    return (
        <Paper sx={{ p: 2 }}>
            {children}
        </Paper>
    )
}


export const withFieldWrapper = function <T>(Component: (props: T) => JSX.Element) {
    return (props: T) => {
        return (
            <FieldWrapper>
                <Component {...props as T} />
            </FieldWrapper>
        )
    }
} 