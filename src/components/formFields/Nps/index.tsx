import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { FieldModule } from "../types";
import { FieldT, Option } from "../../../types";
import { withFieldWrapper } from "../../FieldWrapper";

export interface NpsFieldProps {
    title: string;
    options: Option[];
}

export const DEFAULT_PROPS: NpsFieldProps = {
    title: 'Insira aqui um titulo',
    options: new Array(10).fill(1).map((_, index) => ({
        label: String(index + 1),
        value: String(index + 1),
    }))
}

export const NpsField = withFieldWrapper((props: FieldT<NpsFieldProps, Option['value']>) => {
    const {
        baseProps,
        formProps,
        styleProps
    } = props

    const {
        title,
        options,
    } = baseProps

    const {
        value,
        onChange
    } = formProps

    return (
        <Stack spacing={2}>
            <Typography>{title}</Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <ButtonGroup variant="outlined">
                    {options.map(option => (
                        <Button
                            key={option.value}
                            variant={option.value === value ? "contained" : "outlined"}
                            onClick={() => {
                                onChange(option.value)
                            }}
                        >
                            {option.label}
                        </Button>
                    ))}
                </ButtonGroup>
            </Box>
        </Stack>
    )
})

export const npsFieldModule: FieldModule<NpsFieldProps, Option['value']> = {
    Component: NpsField,
    props: DEFAULT_PROPS,
    type: 'nps',
    answerable: true,
    configurator: {
        title: 'text',
        options: 'options'
    }
}