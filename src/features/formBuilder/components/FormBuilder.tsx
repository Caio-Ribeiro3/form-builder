import { TwoZoneLayout } from "../../../components/layouts/TwoZones"
import { FormBuilderProvider } from "../context"
import { PossibleFieldsList } from "./PossibleFieldsList"
import { WrappedFormRenderer } from "./WrappedFormRenderer"
import { FormBuilderLayoutProvider } from "./context"
import { FieldConfigurator } from "./FieldConfigurator"
import { LeftZone } from "./LeftZone"

interface FormBuilderProps {

}

export const FormBuilder = (props: FormBuilderProps) => {
    const { } = props

    return (
        <FormBuilderProvider>
            <FormBuilderLayoutProvider>
                <TwoZoneLayout
                    leftComponent={(
                        <LeftZone>
                            <PossibleFieldsList />
                            <FieldConfigurator />
                        </LeftZone>
                    )}
                    rightComponent={(
                        <WrappedFormRenderer />
                    )}
                />
            </FormBuilderLayoutProvider>
        </FormBuilderProvider>
    )
}