import { Button, FormControl, InputLabel, List, ListItem, ListItemText, ListSubheader, MenuItem, Select, Stack, TextField } from "@mui/material"
import { getId } from "../../../utils"
import { possibleFields } from "../../form/nps/possibleFields"
import { useFormBuilder } from "../context"
import { useFormBuilderLayout } from "./context"
import { Configurator } from "./types"

interface FieldConfiguratorProps {

}

const ConfiguratorComponents: { [key in Configurator]: (props: any) => JSX.Element } = {
    image: props => (
        <TextField
            value={props.value}
            onChange={event => {
                props.onChange(event.target.value)
            }}
            label="Image"
            variant="outlined"
        />
    ),
    options: props => (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div">
                    Options
                </ListSubheader>
            }
        >
            <Button
                onClick={() => {
                    props.onChange([...props.value, { label: `Option ${props.value.length + 1}`, value: getId() }])
                }}
            >
                Add
            </Button>
            <Button
                onClick={() => {
                    props.onChange(props.value.slice(0, -1))
                }}
            >
                Remove
            </Button>
            {props.options.map(({ label, value }) => (
                <ListItem key={value}>
                    <ListItemText primary={label} />
                </ListItem>
            ))}
        </List>
    ),
    range: props => (
        <TextField label="Image" variant="outlined" />
    ),
    text: props => (
        <TextField
            value={props.value}
            onChange={event => {
                props.onChange(event.target.value)
            }}
            label="Text"
            variant="outlined"
        />
    ),
}

export const FieldConfigurator = (props: FieldConfiguratorProps) => {
    const { } = props

    const { handleEditField } = useFormBuilder()
    const { tab, currentField } = useFormBuilderLayout()

    if (tab !== "fieldConstructor" || !currentField) return <></>

    return (
        <Stack spacing={2}>
            <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                    value={currentField.type}
                    onChange={({ target: { value: type } }) => {
                        handleEditField({
                            fieldId: currentField.id,
                            callback: (field) => {
                                return {
                                    ...field,
                                    props: possibleFields[type].props,
                                    configurator: possibleFields[type].configurator,
                                    type
                                }
                            }
                        })
                    }}
                >
                    {Object.keys(possibleFields).map(type => (
                        <MenuItem
                            value={type}
                            key={type}
                        >
                            {type}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {Object.entries(currentField.configurator || {}).map(([key, configurator]) => {
                const Component = ConfiguratorComponents[configurator]

                return (
                    <Component
                        key={key}
                        value={currentField.props[key]}
                        onChange={value => {
                            handleEditField({
                                fieldId: currentField.id,
                                callback: (field) => {
                                    return {
                                        ...field,
                                        props: {
                                            ...field.props,
                                            [key]: value
                                        }
                                    }
                                }
                            })
                        }}
                        options={currentField.props.options}
                    />
                )
            })}
        </Stack>
    )
}