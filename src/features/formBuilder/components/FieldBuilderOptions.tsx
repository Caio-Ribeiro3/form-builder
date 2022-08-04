import { ReactNode, useState } from "react"

import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Field, useFormBuilder } from "../context";
import { useFormBuilderLayout } from "./context";

interface FieldBuilderOptionsProps {
    children: ReactNode;
    fieldId: Field['id']
}

export const FieldBuilderOptions = (props: FieldBuilderOptionsProps) => {
    const { fieldId, children } = props

    const { handleReorderField, handleRemoveField } = useFormBuilder()
    const { setFieldToEdit, setTab } = useFormBuilderLayout()

    const [isFocused, setIsFocused] = useState(false)

    return (
        <Box
            onMouseEnter={() => setIsFocused(true)}
            onMouseLeave={() => setIsFocused(false)}
        >
            {children}
            {isFocused && (
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', pt: 1 }}>
                    <ButtonGroup variant="outlined">
                        {[
                            {
                                id: 'move up',
                                Icon: ExpandLessIcon,
                                onClick: function () {
                                    handleReorderField({ fieldId, direction: 'up' })
                                }
                            },
                            {
                                id: 'move down',
                                Icon: ExpandMoreIcon,
                                onClick: function () {
                                    handleReorderField({ fieldId, direction: 'down' })
                                }
                            },
                            {
                                id: 'edit',
                                Icon: EditIcon,
                                onClick: function () {
                                    setFieldToEdit(fieldId)
                                    setTab('fieldConstructor')
                                }
                            },
                            {
                                id: 'delete',
                                Icon: DeleteIcon,
                                onClick: function () {
                                    handleRemoveField({ fieldId })
                                }
                            },
                        ].map(({ id, Icon, onClick }) => (
                            <IconButton
                                key={id}
                                onClick={onClick}
                            >
                                <Icon />
                            </IconButton >
                        ))}
                    </ButtonGroup>
                </Box>
            )}
        </Box>
    )
}

type WithFieldBuilderOptions<T> = {
    fieldId: FieldBuilderOptionsProps['fieldId']
} & T

export const withFieldBuilderOptions = function <T>(Component: (props: T) => JSX.Element) {
    return ({ fieldId, ...props }: WithFieldBuilderOptions<T>) => {

        const hasFormBuilder = !!useFormBuilder().fields

        if (!hasFormBuilder) {
            return <Component {...props as unknown as T} />
        }

        return (
            <FieldBuilderOptions fieldId={fieldId}>
                <Component {...props as unknown as T} />
            </FieldBuilderOptions>
        )
    }
}  