import React from 'react';
import Page from '../layout/Page';
import { Link } from 'react-router-dom';

export default function Rover({ rover, dates }) {
    return (
        <Page>
            <h1>{rover.name}</h1>
            <div style={{width: '100%', position: 'relative'}}>
                <img style={{width: "80vmin"}} src={process.env.PUBLIC_URL + `/${rover.name}.jpg`} alt={`${rover.name} rover`} />
                <div>
                    {dates.map((date, index) => {
                        return (
                            <Link to={`/Photos?rover=${rover.name}&date=${date}`} key={index}>
                                <button>{date}</button>
                            </Link>
                        )
                    })}
                </div>
            </div>
            <br/>
        </Page>
    )
}
