import React, {Component} from 'react';
import Button from "@material-ui/core/Button/Button";
import ChallengeDialog from "../ChallengeDialog/ChallengeDialog";
import PlusIcon from "@material-ui/icons/Add"

import classes from "./AddChallenge.module.css";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core";
import lightBlue from "@material-ui/core/es/colors/lightBlue";

const theme = createMuiTheme({
    palette: {
        primary: lightBlue,
    },
    overrides: {
        MuiButton: {
            raisedPrimary: {
                color: 'white',
            },
        },
    }
});

class AddChallenge extends Component {
    state = {
        open: false
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        return (
            <>
                <MuiThemeProvider theme={theme}>
                <Button onClick={this.handleClickOpen}
                        color="primary"
                        variant={"raised"}
                        className={classes.NewChallenge}>
                    <PlusIcon style={{marginRight: '8px'}}/>Create New Challenge</Button>
                </MuiThemeProvider>
                <ChallengeDialog
                    open={this.state.open}
                    closed={this.handleClose}
                />
            </>
        );
    }
}

export default AddChallenge;