import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

const drawerWidth = 240;

interface TwoZoneLayoutProps {
    rightComponent: ReactNode;
    leftComponent: ReactNode;
}

export function TwoZoneLayout(props: TwoZoneLayoutProps) {
    const { rightComponent, leftComponent } = props

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, boxShadow: 'none' }}>
                <Toolbar
                    sx={{
                        background: theme => theme.palette.background.paper,
                        borderBottomWidth: 1,
                        borderBottomColor: theme => theme.palette.divider,
                        borderBottomStyle: 'solid'
                    }}
                />
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
                }}
            >
                <Toolbar />
                <Box
                    sx={{
                        overflow: 'auto',
                        p: 2
                    }}
                >
                    {leftComponent}
                </Box>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    backgroundColor: theme => theme.palette.grey['50'],
                    height: '100vh',
                    overflowY: 'auto'
                }}
            >
                <Toolbar />
                <Container maxWidth='md'>
                    {rightComponent}
                </Container>
            </Box>
        </Box>
    );
}
