import React, {Component} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import HelpIcon from "@material-ui/core/SvgIcon/SvgIcon";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import classes from "./EmailVerificationDialog.module.css";
import Dialog from "@material-ui/core/Dialog/Dialog";
import fire from "../../../fire";

class EmailVerificationDialog extends Component {
    // Expected props
    // 1. open
    // 2. closed
    // 3. email

    sendEmailVerification = () => {
        this.props.closed();
        const user = fire.auth().currentUser;
        if (user && user.emailVerified === false) {
            user.sendEmailVerification()
                .then(() => {
                    console.log("Email verification sent");
                });
        }
    };

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.closed}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    <HelpIcon
                        style={{
                            margin: 0,
                            top: 20,
                            right: 20,
                            bottom: 'auto',
                            left: 'auto', position: "absolute"
                        }}
                    />
                    Email Verification
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please check the inbox of {this.props.email} to verify your email address.
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                        <Button
                            onClick={this.sendEmailVerification}
                            color="primary"
                            className={classes.cancelButton}
                        >
                            Resend
                        </Button>
                        <Button
                            onClick={this.props.closed}
                            color="primary"
                            className={classes.sendButton}
                        >
                            Ok
                        </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default EmailVerificationDialog;