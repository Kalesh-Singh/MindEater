import React, {Component} from 'react';
import Button from "@material-ui/core/Button/Button";
import ChallengeDialog from "../ChallengeDialog/ChallengeDialog";
import PlusIcon from "@material-ui/icons/Add"

import classes from "./AddChallenge.module.css";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core";
import lightBlue from "@material-ui/core/es/colors/lightBlue";
import Fade from "@material-ui/core/Fade/Fade";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

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
                    <Tooltip TransitionComponent={Fade} disableFocusListener title={"Create Challenge"}>
                <Button onClick={this.handleClickOpen}
                        color="primary"
                        variant="fab"
                        style={{
                            margin: 0,
                            top: 'auto',
                            right: 20,
                            bottom: 20,
                            left: 'auto',
                            position: 'fixed',
                        zIndex:1}}
                        className={classes.NewChallenge}>
                    <PlusIcon/>
                </Button>
                    </Tooltip>
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