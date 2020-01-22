import React from 'react';
import { Link } from 'react-router-dom';

// Material Design
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    listItem: {
        color: theme.palette.textPrimary.main,
        '&:hover': {
            backgroundColor: 'rgba(200, 0, 0, 0.4)'
        }
    },
}));

export default function DrawerItem({ text, url, svg }) {
    const classes = useStyles();

    return (
        <ListItem
            button
            key={text}
            component={Link}
            to={url}
            className={classes.listItem}
        >
            <ListItemIcon>
                {svg ?? <div/>}
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>
    )
}
