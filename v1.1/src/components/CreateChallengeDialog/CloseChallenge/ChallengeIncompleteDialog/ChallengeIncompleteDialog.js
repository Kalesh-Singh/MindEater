import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";

class ChallengeIncompleteDialog extends Component {
    handleDiscard = () => {
        this.props.closed();
        this.props.closeChallengeDialog();
        this.props.deleteChallenge();
    };
    handleCancel = () => {
        this.props.closed();
    };
    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.closed}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Challenge Incomplete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        All changes will be discarded.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={this.handleDiscard}
                        color="secondary"
                    >
                        Discard
                    </Button>
                    <Button
                        onClick={this.handleCancel}
                        color="primary" autoFocus
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default ChallengeIncompleteDialog;