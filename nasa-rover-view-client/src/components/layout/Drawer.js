import React, {useEffect, useState, Fragment} from 'react';

// Material Design
import {makeStyles} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

// My Components
import DrawerItem from './DrawerItem.js';
import Loading from '../Loading';

const useStyles = makeStyles(theme => ({
    img: {
        width: '100%',
        flex: 1,
    },
    clockContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    link: {
        textAlign: 'left',
        padding: '0 0 8px 16px',
        pointerEvents: 'all',
    },
    icon: {
        color: theme.palette.accent.main,
    },
    divider: {
        backgroundColor: theme.palette.textSecondary.main
    },
    dateDrawerItem: {
        display: 'flex',
        width: '100%',
        height: '50px',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

/**
 * The Drawer component is the sidebar for the layout.
 *
 * IN THIS APP:
 * Layout
 */
export default function Drawer({ rovers, dates }) {
    const classes = useStyles();

    const photoCameraIcon = <PhotoCameraIcon className={classes.icon}/>;

    let [drawerState, setDrawerState] = useState(Object.create(null));
    let [changed, setChanged] = useState(false);

    useEffect(() => {
        if (rovers !== null) {
            rovers.forEach((rover) => {
                drawerState[rover.id] = false;  // start submenu's closed
            });
        }
    }, []);

    useEffect(() => {
        setChanged(false);
    }, [changed]);

    let onClickRover = (rover) => {
        let tempMenuState = drawerState;
        rovers.forEach((r) => {
            if (r.id === rover.id) {
                tempMenuState[rover.id] = !drawerState[rover.id];
            } else {
                tempMenuState[r.id] = false;
            }
        });

        setDrawerState(tempMenuState);
        setChanged(true);
    };

    return (
        <div id={'drawer'} style={{pointerEvents: 'none'}}>
            {/* Drawer's main content */}
            <div id={'drawer-main-content'} style={{display: 'inline-block', pointerEvents: 'all', width: '100%'}}>
                <Toolbar>
                    <div className={classes.clockContainer}>
                        <img className={classes.img} src={process.env.PUBLIC_URL + '/nasa_logo.png'} alt={'nasa logo'}/>
                    </div>
                </Toolbar>
                <List id={'this'}>
                    <Divider className={classes.divider}/>
                    {rovers === null ?
                        <Loading />
                        :
                        rovers.map((rover) => {
                            return (
                                <Fragment key={rover.id}>
                                    <div style={{display: 'inlineBlock'}} onClick={() => {onClickRover(rover)}}>
                                        <DrawerItem text={rover.name} url={`/${rover.name}`} svg={photoCameraIcon} />
                                    </div>
                                    {drawerState[rover.id] === true &&
                                        dates.map((date, index) => {
                                            return <DrawerItem key={index} text={date} url={`/Photos?rover=${rover.name}&date=${date}`}/>
                                        })
                                    }
                                    <Divider className={classes.divider}/>
                                </Fragment>

                            )
                        })
                    }
                </List>
            </div>

            {/* Spacer so that the links below can show through this "window" on small screens */}
            <div style={{height: '72px', background: 'rgba(0, 0, 0, 0)'}}/>

            {/* Bottom-fixed link section */}
            <div style={{position: 'fixed', bottom: 0, zIndex: -1, marginBottom: '8px'}}>
                <div className={classes.link}>
                    <a href={"https://github.com/alynes"}>github.com/alynes</a>
                </div>
                <div className={classes.link}>
                    <a href={"https://linkedin.com/in/alynes"}>linkedin.com/alynes</a>
                </div>
            </div>
        </div>
    )
}
