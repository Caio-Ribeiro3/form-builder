const formTypes = {
    nps: {
        type: 'nps',
        name: 'Net Promoter Score form',
        async handleSave() {

        },
        async handleCreate() {
            return {
                data: {
                    id: 1
                }
            }
        },
        possibleFields: {
            text: {
                module: {},
                constraints: {
                    fixedPosition: 1,
                    limit: 3,
                }
            }
        },
    },
    open: {
        type: 'open',
        name: 'Open form',
        async handleSave() {

        },
        async handleCreate() {
            return {
                data: {
                    id: 1
                }
            }
        },
        possibleFields: {
            text: {
                module: {},
                constraints: {
                    fixedPosition: 1,
                    limit: 3,
                }
            }
        },
    }
}

type FinalFormPayload = {
    type: keyof typeof formTypes;

}

export const getFinalFormHandler = async (payload: FinalFormPayload) => {

    const { type } = payload

    const { data } = await formTypes[type].handleCreate()

    return {
        id: data.id,
        handleAddField() {

        },
        handleCreateField() {

        },
        handleEditField() {

        },
        handleRemoveField() {

        },
        fields: [],
        ...formTypes[type]
    }
}
