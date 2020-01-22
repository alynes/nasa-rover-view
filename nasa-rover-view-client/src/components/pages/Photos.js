import React, {useEffect, useState} from 'react';

import Page from '../layout/Page';
import nasaImageApiService from '../services/NasaImageApiService';
import AsyncImage from '../AsyncImage';
import Loading from '../Loading';

import '../layout/layout.css';

export default function Photos({location}) {
    let [photos, setPhotos] = useState(null);

    let dateParam = getUrlParameter('date', location);
    let roverParam = getUrlParameter('rover', location);

    useEffect(() => {
        setPhotos(null);
        (async () => {
            setPhotos((await nasaImageApiService.getPhotoList(roverParam, dateParam)).data.photos);
        })();
    }, [location]);

    return (
        <Page>
            <h1>{roverParam}</h1>
            <h3>{dateParam}</h3>
            {(() => {
                if (photos === null) {
                    return (
                    <div style={{width: '40vmin', margin: 'auto'}}>
                        <Loading />
                    </div>)
                } else if (photos.length === 0) {
                    return ( <h1>[ NONE ]</h1>
                    )

                } else {
                    return (
                        <div className='my-grid'>
                            {photos.map((photo) => {
                                return <AsyncImage key={photo.id} photo={photo} />
                            })}
                        </div>
                    )
                }
            })()}
        </Page>
    )
}

function getUrlParameter(name, location) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};