import React, {useEffect, useState} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

import Layout from './components/layout/Layout';
import Home from './components/pages/Home';
import Photos from './components/pages/Photos';
import Rover from './components/pages/Rover';
import NasaImageApiService from './components/services/NasaImageApiService';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgb(17, 65, 149)'
        },
        secondary: {
            main: 'rgba(8, 11, 15, 1)'//'#1f212b'//'#1b222d'
        },
        alpha: {
            main: 'rgba(8, 11, 15, 0.79)'//'rgba(17,65,149,0.6)'
        },
        textPrimary: {
            main: '#fff'
        },
        textSecondary: {
            main: '#aaa'
        },
        accent: {
            main: 'rgba(240, 30, 30, 0.8)'
        },
        modalShade: {
            main: 'rgba(200, 200, 200, 0.5)'
        }
    }
});

export default function App() {
    let [rovers, setRovers] = useState(null);
    let [dates, setDates] = useState(null);

    useEffect(() => {
        (async () => {
            let dateData = await NasaImageApiService.getDateList();
            let roverData = await NasaImageApiService.getRoverList();
            setDates(dateData.data ?? []);
            setRovers(roverData.data.rovers ?? []);
        })();
    }, []);

    return (
        <Router>
            <ThemeProvider theme={theme}>
                <Layout rovers={rovers} dates={dates}>
                    <Switch>
                        <Route
                            exact
                            path={"/Photos"}
                            render={(props) => <Photos {...props} />}
                        />
                        {((location) => {
                            if (rovers === null) {
                                return null;
                            } else if (rovers.length === 0) {
                                console.log("reload");
                                window.location.reload();
                            } else {
                                return (
                                    rovers.map((rover, index) => {
                                        return (
                                            <Route
                                                exact
                                                path={`/${rover.name}`}
                                                render={(props) => <Rover rover={rover} dates={dates} {...props} />}
                                                key={index}
                                            />
                                        )
                                    })
                                )
                            }
                        })()}
                        <Route
                            path={"/"}
                            render={(props) => <Home {...props} />}
                        />
                    </Switch>
                </Layout>

            </ThemeProvider>

        </Router>

    );
}

