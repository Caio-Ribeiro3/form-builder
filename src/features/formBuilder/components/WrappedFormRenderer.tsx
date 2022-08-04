import { FormRenderer } from "../../formRenderer"
import { useFormBuilder } from "../context"

interface WrappedFormRendererProps { }

export const WrappedFormRenderer = (props: WrappedFormRendererProps) => {
    const { fields } = useFormBuilder()
    return (
        <FormRenderer
            formStyle={{}}
            isPreview={false}
            fields={fields}
            onSubmit={console.log}
        />
    )
}