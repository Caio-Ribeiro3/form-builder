import { Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form"

import { InlineFieldsLayout } from "../../components/layouts/InlineFieldsLayout"
import { possibleFields } from "../form/nps/possibleFields";
import { Field } from "../formBuilder/context";
import { withFieldBuilderOptions } from "../formBuilder/components/FieldBuilderOptions";
import { ThemeProvider } from "./ThemeProvider"

interface FormRendererProps {
    formStyle: {};
    isPreview: boolean;
    fields: Field[];
    onSubmit: (values: { [key: string]: any }) => void;
}

export const FormRenderer = (props: FormRendererProps) => {
    const {
        formStyle,
        isPreview,
        fields,
        onSubmit
    } = props

    const defaultValues = fields.reduce<{ [key: string]: any }>((acc, curr) => {
        if (curr.answerable) {
            acc[curr.id] = ''
        }
        return acc
    }, {})

    const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues });

    const handleOnSubmit = (data: { [key: string]: any }) => {
        const values: { [key: string]: any } = {}

        for (const key in data) {

            const field = fields.find(el => el.id === key)

            if (field?.answerable) {
                values[key] = data[key]
            }

            onSubmit(values)
        }
    };

    return (
        <ThemeProvider theme={formStyle}>
            <InlineFieldsLayout>
                {fields.map(({ props, type, id, answerable }) => {
                    const { Component } = possibleFields[type]

                    const WrappedWithFormBuilder = withFieldBuilderOptions(Component)

                    if (!answerable) {
                        return (
                            <WrappedWithFormBuilder
                                key={id}
                                fieldId={id}
                                formProps={{}}
                                baseProps={props}
                            />
                        )
                    }

                    return (
                        <Controller
                            key={id}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <WrappedWithFormBuilder
                                    fieldId={id}
                                    formProps={{
                                        onChange: isPreview ? () => { } : onChange,
                                        value,
                                        error: errors[id]
                                    }}
                                    baseProps={props}
                                />
                            )}
                            name={id}
                        />
                    )
                })}
                {!isPreview && (
                    <Button onClick={handleSubmit(handleOnSubmit)}>submit</Button>
                )}
            </InlineFieldsLayout>
        </ThemeProvider>
    )
}