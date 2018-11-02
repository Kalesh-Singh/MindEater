import React, {Component} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";

class SolveChallengeSummary extends Component {

    // Expected props
    // 1. open          (bool)
    // 2. closed        (func)
    // 3. closeStepper  (func)
    // 4. steps         (Array)     Can get from the getStep() function.
    // 5. score         (number)

    // TODO: Decide which component will push to firebase.

    handleOk = () => {
        this.props.closed();
    };

    render() {
        // Make this some sort of dialog pop up
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.closed}
                aria-labelledby="challenge-summary-dialog-title"
                aria-describedby="challenge-summary-dialog-description"
            >
                <DialogTitle id="challenge-summary-dialog-title">{"Challenge Summary"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="challenge-summary-dialog-description">
                        Here is a summary of your results.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    <Button
                        onClick={this.handleOk}
                        color="primary" autoFocus
                    >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default SolveChallengeSummary;