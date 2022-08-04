import { useLayoutEffect, useState } from "react"
import { possibleFields } from "../features/form/nps/possibleFields";
import { Field } from "../features/formBuilder/context";
import { loadSingleForm } from "../requests";
import { getId } from "../utils";
import { HTTPHandler } from "./httpHandler";

type HandleAddField = (payload: {
    fieldType: keyof typeof possibleFields
}) => Field;

export const useFormLoader = () => {

    const [fields, setFields] = useState<Field[]>([])

    const handleAddField: HandleAddField = (payload) => {
        const { fieldType } = payload

        const newField: Field = {
            id: getId(),
            type: fieldType,
            ...possibleFields[fieldType]
            // props: possibleFields[fieldType].props,
            // configurator: possibleFields[fieldType].configurator,
            // answerable: possibleFields[fieldType].answerable
        }

        return newField
    }

    async function loadForm() {
        const form = await loadSingleForm()
        return form
    }

    useLayoutEffect(() => {
        const possibleFieldsArray = Object.keys(possibleFields)

        setFields(possibleFieldsArray.map((type) => {
            return handleAddField({
                fieldType: type as keyof typeof possibleFields
            })
        }))

    }, [])

    return {
        loadForm,
        fields
    }
}