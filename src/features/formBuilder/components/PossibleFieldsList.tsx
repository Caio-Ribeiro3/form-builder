import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { possibleFields } from '../../form/nps/possibleFields';
import { useFormBuilder } from '../context';
import { useFormBuilderLayout } from './context';

interface PossibleFieldsListProps {

}

export const PossibleFieldsList = (props: PossibleFieldsListProps) => {
    const { } = props

    const { handleAddField } = useFormBuilder()
    const { tab } = useFormBuilderLayout()

    if (tab !== 'fields') return <></>

    return (
        <List>
            {Object.keys(possibleFields).map((text) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton
                        onClick={() => {
                            handleAddField({ fieldType: text as keyof typeof possibleFields })
                        }}
                    >
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    )
}