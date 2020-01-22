import React from 'react';
import {Link} from 'react-router-dom';

// Material Design
import {makeStyles} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import PermMediaIcon from '@material-ui/icons/PermMedia';

// Styles
const useStyles = makeStyles(theme => ({
    nav: {
        padding: '6px',
        color: theme.palette.textPrimary.main,
    },
    navButton: {
        color: theme.palette.textPrimary.main,

    }
}));

/**
 *    This component is a navigation bar.
 *
 *    @param { Function } handleDrawerToggle - 'handleDrawerToggle' opens/closes the side drawer.
 */
export default function Navbar({ handleDrawerToggle }) {
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.nav}>
            <Toolbar>
                <IconButton
                    className={classes.navButton}
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                >
                    <MenuIcon className={classes.navButton}/>
                </IconButton>
                <div style={{flex: 1}} />
                {/*<Link to={""}>*/}
                {/*    <Button className={classes.navButton}>*/}
                {/*        <PermMediaIcon />*/}
                {/*        <Typography variant="h6" noWrap className={classes.nav}>*/}
                {/*            Portfolio*/}
                {/*        </Typography>*/}
                {/*    </Button>*/}
                {/*</Link>*/}
                {/*<div style={{width: "10px", textAlign: "center"}}>*/}
                {/*    |*/}
                {/*</div>*/}
                {/*<Link to={"/resume/"}>*/}
                {/*    <Button className={classes.navButton}>*/}
                {/*        <RecentActorsIcon/>*/}
                {/*        <Typography variant="h6" noWrap className={classes.nav}>*/}
                {/*            Resumé*/}
                {/*        </Typography>*/}
                {/*    </Button>*/}
                {/*</Link>*/}
                {/*<div style={{width: "10px", textAlign: "center"}}>*/}
                {/*    |*/}
                {/*</div>*/}

            </Toolbar>
        </AppBar>
    )
}