import React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Typography from "@material-ui/core/Typography/Typography";
import Modal from "@material-ui/core/Modal/Modal";
import classes from "./SavingModal.module.css";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core";
import lightBlue from "@material-ui/core/es/colors/lightBlue";

const theme = createMuiTheme({
    palette: {
        primary: lightBlue,
    },
    typography: {
        useNextVariants: true,
    },
});

function SavingModal(props) {

    // Expected props
    // 1. open (which will be the saving state from the ChallengeDialog)

    return (
        <Modal
            aria-labelledby="saving-modal-title"
            aria-describedby="saving-modal-description"
            open={props.open}
        >
            <div className={classes.Modal}>
                <MuiThemeProvider theme={theme}>
                <CircularProgress
                    variant="indeterminate"
                    size={100}
                    style={{marginBottom: "16px"}}
                    color={"primary"}
                />
                </MuiThemeProvider>
                <Typography
                    variant="h6"
                    color="inherit"
                >
                    Saving Challenge
                </Typography>
            </div>
        </Modal>
    );
}

export default SavingModal;