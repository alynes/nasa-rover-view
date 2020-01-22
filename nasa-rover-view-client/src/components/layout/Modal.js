import React from 'react';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    modal: {
        backgroundColor: 'rgba(21,24,28,0.79)', // theme not available since outside dom
        position: 'absolute',
        width: '70vmin',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'all'
    },
    modalShade: {
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        overflow: 'auto'
    }
}));

export default function Modal({children, setShow}) {
    const classes = useStyles();
    return (
        <div onClick={() => {setShow(false)}} className={classes.modalShade}>
            <div className={classes.modal}>
                {children}
            </div>
        </div>
    )
}