import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useFormLoader } from "../../helpers/useFormLoader";
import { getId } from "../../utils";
import { possibleFields } from "../form/nps/possibleFields";
import { Configurator } from "./components/types";

type HandleAddField = (payload: {
    fieldType: keyof typeof possibleFields
}) => void;
type HandleEditField = (payload: { fieldId: Field['id']; callback: (field: Field) => Field }) => void;
type HandleRemoveField = (payload: { fieldId: Field['id'] }) => void;
type HandleReorderField = (payload: { fieldId: Field['id']; direction: 'up' | 'down' }) => void;
export type Field<T = any> = {
    id: string;
    type: keyof typeof possibleFields;
    props: T;
    configurator: { [key in keyof T]: Configurator };
    answerable: boolean;
    // isRequired: boolean;
}


const FormBuilderContext = createContext<{
    handleAddField: HandleAddField;
    handleEditField: HandleEditField;
    handleRemoveField: HandleRemoveField;
    handleReorderField: HandleReorderField;
    fields: Field[]
}>({})

interface FormBuilderProviderProps {
    children: ReactNode;
}

export const FormBuilderProvider = (props: FormBuilderProviderProps) => {
    const { children } = props

    const [fields, setFields] = useState<Field[]>([])

    const { fields: loadedFields } = useFormLoader()

    const handleAddField: HandleAddField = (payload) => {
        const { fieldType } = payload

        const newField: Field<typeof possibleFields[typeof fieldType]['props']> = {
            id: getId(),
            type: fieldType,
            props: possibleFields[fieldType].props,
            configurator: possibleFields[fieldType].configurator,
            answerable: possibleFields[fieldType].answerable
        }

        setFields(fields => [...fields, newField])
    }

    const handleEditField: HandleEditField = (payload) => {
        const { fieldId, callback } = payload

        setFields(fields => fields.map(field => field.id === fieldId ? callback(field) : field))
    }

    const handleRemoveField: HandleRemoveField = (payload) => {
        const { fieldId } = payload

        setFields(fields => fields.filter(field => field.id !== fieldId))
    }


    const handleReorderField: HandleReorderField = (payload) => {
        const { fieldId, direction } = payload


        setFields(fields => {
            const fieldIndex = fields.findIndex(field => field.id === fieldId)

            if (fieldIndex === -1 || (fieldIndex === 0 && direction === 'up') || (fieldIndex === fields.length - 1 && direction === 'down')) {
                return fields
            }

            const newFields = [...fields]

            const fieldInPlace = newFields[fieldIndex - (direction === 'up' ? 1 : -1)]

            newFields[fieldIndex] = fieldInPlace
            newFields[fieldIndex - (direction === 'up' ? 1 : -1)] = fields[fieldIndex]

            return newFields
        })
    }

    useEffect(() => {
        setFields(loadedFields)
    }, [loadedFields])

    return (
        <FormBuilderContext.Provider
            value={{
                handleAddField,
                handleEditField,
                handleRemoveField,
                handleReorderField,
                fields
            }}
        >
            {children}
        </FormBuilderContext.Provider>
    )
}

export const useFormBuilder = () => useContext(FormBuilderContext)