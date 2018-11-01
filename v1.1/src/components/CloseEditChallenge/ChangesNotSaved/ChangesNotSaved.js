import React, {Component} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";

class ChangesNotSaved extends Component {

    handleDiscard = () => {
        this.props.closed();
        this.props.closeChallengeDialog();
    };

    handleSave = () => {
        this.props.saveChallenge();
        setTimeout(2000);
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
                <DialogTitle id="alert-dialog-title">{"Changes Not Saved"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to save the changes made?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={this.handleDiscard} color="secondary"
                    >
                        Discard
                    </Button>
                    <Button
                        onClick={this.handleSave}
                        color="primary" autoFocus
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default ChangesNotSaved;