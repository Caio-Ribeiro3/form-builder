import { ReactNode } from "react";

import Stack from "@mui/material/Stack"

interface InlineFieldsLayoutProps {
    children: ReactNode;
}

export const InlineFieldsLayout = (props: InlineFieldsLayoutProps) => {
    const { children } = props

    return (
        <Stack spacing={2}>
            {children}
        </Stack>
    )
}