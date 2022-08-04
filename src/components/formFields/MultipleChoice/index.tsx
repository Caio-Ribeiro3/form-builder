import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { FieldModule } from "../types";
import { FieldT, Option } from "../../../types";
import { withFieldWrapper } from "../../FieldWrapper";

export interface MultipleChoiceProps {
    title: string;
    options: Option[];
}

export const DEFAULT_PROPS: MultipleChoiceProps = {
    title: 'Insira aqui um titulo',
    options: new Array(5).fill(1).map((_, index) => ({
        label: `Option ${index + 1}`,
        value: `Option ${index + 1}`,
    }))
}

export const MultipleChoice = withFieldWrapper((props: FieldT<MultipleChoiceProps, Option['value']>) => {
    const {
        baseProps,
        formProps,
        styleProps
    } = props

    const {
        value,
        onChange
    } = formProps

    const {
        title,
        options,
    } = baseProps

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange((event.target as HTMLInputElement).value);
    };

    return (
        <Stack spacing={2}>
            <Typography>{title}</Typography>
            <FormControl>
                <RadioGroup
                    value={value}
                    onChange={handleChange}
                >
                    {options.map(option => (
                        <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
                    ))}
                </RadioGroup>
            </FormControl>
        </Stack>
    )
})

export const MultipleChoiceModule: FieldModule<MultipleChoiceProps, Option['value']> = {
    Component: MultipleChoice,
    props: DEFAULT_PROPS,
    type: 'multiple_choice',
    answerable: true,
    configurator: {
        title: 'text',
        options: 'options'
    }
}