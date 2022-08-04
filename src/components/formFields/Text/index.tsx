import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { FieldT } from "../../../types";
import { withFieldWrapper } from "../../FieldWrapper";
import { FieldModule } from "../types";

export interface TextFieldProps {
    title: string;
}

export const DEFAULT_PROPS: TextFieldProps = {
    title: 'Insira aqui um titulo',
}

export const TextField = withFieldWrapper((props: FieldT<TextFieldProps, any>) => {
    const {
        baseProps
    } = props

    const {
        title,
    } = baseProps

    return (
        <Stack spacing={2}>
            <Typography>{title}</Typography>
        </Stack>
    )
})

export const textFieldModule: FieldModule<TextFieldProps, any> = {
    Component: TextField,
    props: DEFAULT_PROPS,
    type: 'text',
    answerable: false,
    configurator: {
        title: 'text'
    }
}