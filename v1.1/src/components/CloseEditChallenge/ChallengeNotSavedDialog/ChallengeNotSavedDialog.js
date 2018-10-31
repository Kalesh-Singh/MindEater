import React, {Component} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";

class ChallengeNotSavedDialog extends Component {

    handleCloseChallengeDialog = () => {
        this.props.closed();
        this.props.closeChallengeDialog();
    };

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.closed}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Challenge Not Saved"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to save the challenge?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={this.handleCloseChallengeDialog} color="secondary"
                    >
                        Discard
                    </Button>
                    <Button
                        onClick={this.props.closed}
                        color="primary" autoFocus
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default ChallengeNotSavedDialog;