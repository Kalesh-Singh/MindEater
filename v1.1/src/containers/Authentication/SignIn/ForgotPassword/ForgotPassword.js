import React, {Component} from 'react';
import HelpIcon from "@material-ui/core/SvgIcon/SvgIcon";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import classes from "./ForgotPassword.module.css";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import MuiThemeProvider from "@material-ui/core/es/styles/MuiThemeProvider";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import {createMuiTheme} from "@material-ui/core";
import lightBlue from "@material-ui/core/es/colors/lightBlue";
import fire from "../../../../fire";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import Email from '@material-ui/icons/EmailOutlined';
import withMobileDialog from "@material-ui/core/es/withMobileDialog/withMobileDialog";

const theme = createMuiTheme({
    palette: {
        primary: lightBlue,
    },
});

const PASSWORD_PROVIDER = "password";
const GOOGLE_PROVIDER = "google.com";
const FACEBOOK_PROVIDER = "facebook.com";

class ForgotPassword extends Component {

    // Expected props
    // 1. open
    // 2. closed

    state = {
        email: {
            value: '',
            error: '',
            focused: false,
            valid: false,
            used: false,         // Email associated with a MindEater account.
            provider: null
        }
    };

    checkEmail = (email) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email.value.length === 0 && email.focused) {
            return '* Required';
        } else if (!pattern.test(String(email.value).toLowerCase())) {
            return 'Invalid email format';
        } else {
            this.checkEmailUsed(email);
            return '';     // No error
        }
    };

    checkEmailUsed = (email) => {

        fire.auth().fetchSignInMethodsForEmail(email.value)
            .then((signInMethods) => {
                const updatedEmail = {...email};
                if (signInMethods.length > 0) {
                    console.log('SIGN IN METHODS', signInMethods);
                    updatedEmail.used = true;

                    const signInMethod = signInMethods[0];

                    switch (signInMethod) {
                        case PASSWORD_PROVIDER:
                            updatedEmail.provider = PASSWORD_PROVIDER;
                            break;
                        case GOOGLE_PROVIDER:
                            updatedEmail.provider = GOOGLE_PROVIDER;
                            updatedEmail.error = "This email is associated with a Google sign-in. Please sign in with Google";
                            break;
                        case FACEBOOK_PROVIDER:
                            updatedEmail.provider = FACEBOOK_PROVIDER;
                            updatedEmail.error = "This email is associated with a Facebook sign-in. Please sign in with Facebook";
                            break;
                        default:
                            updatedEmail.provider = null;
                            updatedEmail.error = 'No MindEater account is associated with this email';
                    }
                } else {
                    updatedEmail.used = false;
                    updatedEmail.provider = null;
                    updatedEmail.error = 'No MindEater account is associated with this email';
                }
                this.setState({email: updatedEmail});
            })
    };

    handleChange = event => {
        const updatedEmail = {...this.state.email};
        updatedEmail.value = event.target.value.trim();
        updatedEmail.error = this.checkEmail(updatedEmail);
        updatedEmail.valid = updatedEmail.error.length === 0;
        this.setState({email: updatedEmail});
    };

    handleFocus = () => {
        const updatedEmail = {...this.state.email};
        if (!updatedEmail.focused) {
            updatedEmail.focused = true;
            updatedEmail.error = this.checkEmail(updatedEmail);
            this.setState({email: updatedEmail});
        }
    };

    forgotPassword = () => {
        this.props.closed();
        const emailAddress = this.state.email.value;
        fire.auth().sendPasswordResetEmail(emailAddress)
            .then(() => {
                console.log("Successfully sent reset email");
            }).catch(function (error) {
            alert(error.message);
        })
    };

    render() {

        const {fullScreen} = this.props;
        const sendDisabled = !this.state.email.valid || !this.state.email.used
            || this.state.email.provider !== PASSWORD_PROVIDER;

        return (
            <Dialog
                fullScreen={fullScreen}
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
                    Forgot Password
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please input your email below to reset your password.
                    </DialogContentText>
                    <MuiThemeProvider theme={theme}>
                        <TextField
                            name='email'
                            label='Email'
                            type='email'
                            margin='normal'
                            autoFocus
                            fullWidth
                            variant="outlined"
                            placeholder="Email"
                            error={this.state.email.error.length > 0}
                            helperText={this.state.email.error}
                            value={this.state.email.value}
                            onChange={this.handleChange}
                            onFocus={this.handleFocus}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </MuiThemeProvider>
                </DialogContent>
                <DialogActions>
                    <MuiThemeProvider theme={theme}>
                        <Button
                            onClick={this.props.closed}
                            color="primary"
                            className={classes.cancelButton}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.forgotPassword}
                            color="primary"
                            className={classes.sendButton}
                            disabled={sendDisabled}
                        >
                            Send
                        </Button>
                    </MuiThemeProvider>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withMobileDialog('xs')(ForgotPassword);