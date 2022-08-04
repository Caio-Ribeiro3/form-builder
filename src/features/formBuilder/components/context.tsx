import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { Field, useFormBuilder } from "../context";
import { Tabs } from "./types";

const FormBuilderLayoutContext = createContext<{
    tab: Tabs;
    setFieldToEdit: (field: Field['id']) => void;
    currentField: Field | undefined;
    setTab: Dispatch<SetStateAction<Tabs>>;
}>({
    tab: 'fields',
    setFieldToEdit: (field: Field['id']) => { },
    currentField: undefined,
    setTabs: () => { }
})

interface FormBuilderLayoutProviderProps {
    children: ReactNode;
}

export const FormBuilderLayoutProvider = (props: FormBuilderLayoutProviderProps) => {
    const { children } = props

    const { fields, } = useFormBuilder()

    const [tab, setTab] = useState<Tabs>('fields')
    const [currentFieldId, setCurrentFieldId] = useState<Field['id']>()

    const currentField = fields.find(el => el.id === currentFieldId)

    function setFieldToEdit(fieldId: Field['id']) {
        setCurrentFieldId(fieldId)
    }

    useEffect(() => {
        if (tab !== 'fieldConstructor') {
            setCurrentFieldId(undefined)
        }
    }, [tab])

    return (
        <FormBuilderLayoutContext.Provider
            value={{
                tab,
                setFieldToEdit,
                currentField,
                setTab
            }}
        >
            {children}
        </FormBuilderLayoutContext.Provider>
    )
}

export const useFormBuilderLayout = () => useContext(FormBuilderLayoutContext)