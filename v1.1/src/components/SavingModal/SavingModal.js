import React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Typography from "@material-ui/core/Typography/Typography";
import Modal from "@material-ui/core/Modal/Modal";
import classes from "./SavingModal.module.css";

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
                <CircularProgress
                    variant="indeterminate"
                    size={80}
                    style={{marginBottom: "16px"}}
                />
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