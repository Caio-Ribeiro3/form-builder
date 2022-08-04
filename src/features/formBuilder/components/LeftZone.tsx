import { Button, ButtonGroup, Stack } from "@mui/material"
import { ReactNode } from "react";
import { useFormBuilderLayout } from "./context";

interface LeftZoneProps {
    children: ReactNode;
}

export const LeftZone = (props: LeftZoneProps) => {
    const { children } = props

    const { tab, setTab } = useFormBuilderLayout()

    return (
        <Stack spacing={2}>
            <ButtonGroup variant="outlined">
                {[
                    {
                        id: 'field',
                        content: 'Fields',
                        current: tab === 'fields',
                        onClick() {
                            setTab('fields')
                        }
                    },
                    {
                        id: 'configurator',
                        content: 'Configurator',
                        current: tab === 'fieldConstructor',
                        onClick() {
                            setTab('fieldConstructor')
                        }
                    },
                ].map(({ content, current, id, onClick }) => (
                    <Button
                        key={id}
                        onClick={onClick}
                        variant={current ? "contained" : "outlined"}
                    >
                        {content}
                    </Button>
                ))}
            </ButtonGroup>
            {children}
        </Stack>
    )
}