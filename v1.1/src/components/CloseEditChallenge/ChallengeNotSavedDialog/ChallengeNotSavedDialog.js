import React, {Component} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";

import classes from "./ChallengeNotSavedDialog.module.css"
import Alert from "@material-ui/icons/ErrorOutline";

class ChallengeNotSavedDialog extends Component {

    handleDiscard = () => {
        this.props.closed();
        this.props.closeChallengeDialog();
        this.props.deleteChallenge();
    };

    handleSave = () => {
        this.props.closed();
        this.props.closeChallengeDialog();
        this.props.saveChallenge();
    };

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.closed}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"> <Alert style={{color:"red"}}/> {"Challenge Not Saved"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to save the challenge?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        className={classes.Disc}
                        onClick={this.handleDiscard}
                        color="secondary"
                    >
                        Discard
                    </Button>

                    <Button
                        className={classes.Sve}
                        onClick={this.handleSave}
                        color="primary"
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default ChallengeNotSavedDialog;