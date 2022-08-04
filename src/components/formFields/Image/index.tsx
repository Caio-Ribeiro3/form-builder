import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { FieldModule } from "../types";
import { withFieldWrapper } from "../../FieldWrapper";
import { FieldT } from "../../../types";

export interface ImageFieldProps {
    uri?: string;
}

export const DEFAULT_PROPS: ImageFieldProps = {
}

export const ImageField = withFieldWrapper((props: FieldT<ImageFieldProps, undefined>) => {
    const {
        baseProps,
        formProps,
        styleProps
    } = props

    const {
        uri,
    } = baseProps

    return (
        <Stack spacing={2}>
            {uri ? (
                <img src={uri} />
            ) : (
                <Box
                    sx={{
                        height: 200,
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                    }}
                >
                    <Button variant='text'>
                        Insira uma imagem
                    </Button>
                </Box>
            )}
        </Stack>
    )
})

export const ImageFieldModule: FieldModule<ImageFieldProps, undefined> = {
    Component: ImageField,
    props: DEFAULT_PROPS,
    type: 'image',
    answerable: false,
    configurator: {
        uri: 'image'
    }
}