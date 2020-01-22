import React, { Fragment } from 'react';

export default function Loading() {
    return (
        <Fragment>
            <h3 style={{textAlign: 'center'}}>Loading...</h3>
            <img className='App-logo' src={process.env.PUBLIC_URL + '/logo512.png'} alt={'react logo'} />
        </Fragment>
    )
}
