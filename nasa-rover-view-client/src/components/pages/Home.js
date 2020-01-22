import React from 'react';
import Page from "../layout/Page";

export default function Home() {
    return (
        <Page>
            <h1>NASA ROVER VIEW</h1>
            <img style={{width: '50%'}} src={process.env.PUBLIC_URL + '/nasa_logo.png'} alt={'nasa logo'} />
        </Page>
    )
}
