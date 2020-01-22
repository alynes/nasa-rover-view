import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import nasaImageApiService from './services/NasaImageApiService';

import Modal from './layout/Modal';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    text: {
        padding: '0 5px 5px 5px'
    },
    gridItem: {
        backgroundColor: 'black',
        flex: 1,
        width: '100%',
        color: 'white'
    }
}));

export default function AsyncImage({photo}) {
    let [loading, setLoading] = useState(true);
    let [resource, setResource] = useState(undefined);
    let [show, setShow] = useState(false);

    const classes = useStyles();

    useEffect(() => {
        (async () => {
            setResource((await nasaImageApiService.getPhotoUrl(photo)));
            setLoading(false);
        })();
    }, []);

    let onClick = () => {
        setShow(true);
    };

    useEffect(() => {
        ReactDOM.render(show ?
            <Modal setShow={setShow}>
                <img src={resource} style={{flex: 1, width: '100%'}} alt={'nasa img'} />
                    <div className={classes.text}>ID: {photo.id}</div>
                    <div className={classes.text}>Sol: {photo.sol}</div>
                    <div className={classes.text}>Camera: {photo.camera.full_name}</div>
                    <div className={classes.text}>Rover: {photo.rover.name}</div>
                    <div className={classes.text}>Date: {photo.earth_date}</div>
            </Modal>
            : null, document.getElementById('modal-div'));
    }, [show]);

    return (
        loading ?
            <div className={classes.gridItem}>Loading...</div>
            :
            <div onClick={onClick} className={classes.gridItem}>
                <img src={resource} className={classes.gridItem} alt={photo} />
            </div>
    )
}
