import React, {useState} from 'react';

import {makeStyles} from '@material-ui/core';
import MUIDrawer from '@material-ui/core/Drawer';

import MyDrawer from './Drawer';
import MyNavbar from './Navbar';

const drawerWidth = 230;

// Styles
const useStyles = makeStyles(theme => ({
    layout: {
        width: '100vw',
        height: '100vh',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,

        backgroundColor: '#0b3d91',
        position: 'fixed',
        textAlign: 'center'
    },
    drawer: {
        [theme.breakpoints.up('lg')]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: theme.palette.alpha.main,

    },
    drawerShade: {
        backgroundColor: theme.palette.modalShade.main,
        // transition: "opacity 2000ms cubic-bezier(0.4, 0, 0.2, 0) 0ms"


    }
}));

export default function Layout({ rovers, dates, children }) {
    let [drawerOpen, setDrawerOpen] = useState(false);
    let classes = useStyles();

    let handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const drawer = (
        <MUIDrawer
            variant='temporary'
            transition speed = '1s'
            anchor={'left'}
            open={drawerOpen}
            onClose={handleDrawerToggle}
            classes={{
                paper: classes.drawerPaper,
                modal: classes.drawerShade,

            }}
            BackdropProps={{
                transitionDuration: 2000,

            }}

            ModalProps={{
                keepMounted: true, // Better open performance on mobile.

            }}
        >
            <MyDrawer rovers={rovers} dates={dates}/>
        </MUIDrawer>
    );

    return (
        <div className={classes.layout}>
            <MyNavbar handleDrawerToggle={handleDrawerToggle} />
            <nav className={classes.drawer} aria-label='menu items'>
                {drawer}
            </nav>
            {children}
        </div>
    );
}