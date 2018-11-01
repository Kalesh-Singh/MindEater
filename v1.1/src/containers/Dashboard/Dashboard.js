import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import classes from "../Authentication/Authentication.module.css";
import SolveChallengeStepper from "../../components/SolveChallengeStepper/SolveChallengeStepper";

class Dashboard extends Component {

    render() {

        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="top"
                style={{minHeight: '100vh'}}
            >
                <Grid item xs={12} style={{background: "red"}}>
                    <div style={{marginTop: '100px'}}>
                        <h1>Dashboard</h1>
                        <p>Some awesome dashboard content!</p>
                    </div>
                </Grid>
                <SolveChallengeStepper/>
            </Grid>
        );
    }
}

export default Dashboard;