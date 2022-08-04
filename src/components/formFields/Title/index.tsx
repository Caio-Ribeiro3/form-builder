import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { FieldT } from "../../../types";
import { withFieldWrapper } from "../../FieldWrapper";
import { FieldModule } from "../types";

export interface TitleFieldProps {
    title: string;
    subTitle: string;
}

export const DEFAULT_PROPS: TitleFieldProps = {
    title: 'Insira aqui um titulo',
    subTitle: 'Insira aqui uma descricao'
}

export const TitleField = withFieldWrapper((props: FieldT<TitleFieldProps, any>) => {
    const {
        baseProps
    } = props

    const {
        title,
        subTitle
    } = baseProps

    return (
        <Stack spacing={2}>
            <Typography variant='h4'>{title}</Typography>
            <Typography>{subTitle}</Typography>
        </Stack>
    )
})

export const titleFieldModule: FieldModule<TitleFieldProps, any> = {
    Component: TitleField,
    props: DEFAULT_PROPS,
    type: 'title',
    answerable: false,
    configurator: {
        title: 'text',
        subTitle: 'text'
    }
}