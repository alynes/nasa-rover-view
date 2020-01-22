import React from 'react';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    layout: {
        top: '70px',
        bottom: 0,
        left: 0,
        right: 0,

        overflow: 'auto',
        backgroundColor: theme.palette.secondary.main,
        position: 'absolute',
        textAlign: 'center'
    }
}));

export default function Page({children}) {
    const classes = useStyles();
    return (
        <div className={classes.layout}>
            {children}
        </div>
    )
}