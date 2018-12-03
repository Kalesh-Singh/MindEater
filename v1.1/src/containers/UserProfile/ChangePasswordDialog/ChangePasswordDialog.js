import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog/Dialog";
import AppBar from "@material-ui/core/AppBar/AppBar";
import classes from "./ChangePasswordDialog.module.css";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Fade from "@material-ui/core/Fade/Fade";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OldPassword from "@material-ui/icons/EnhancedEncryptionOutlined";
import CheckPassword from "@material-ui/icons/LockOpenOutlined";
import SaveIcon from "@material-ui/icons/SaveOutlined";
import Password from "@material-ui/icons/HttpsOutlined";
import fire from "../../../fire";
import firebase from "firebase";

class ChangePasswordDialog extends Component {

    // Expected props
    // 1. open      (bool)
    // 2. closed    (func)

    state = {
        showPassword: false,
        oldPassword: {
            value: '',
            error: '',
            focused: false,
            valid: false
        },
        password: {
            value: '',
            error: '',
            focused: false,
            valid: false
        },
        repeatPassword: {
            value: '',
            error: '',
            focused: false,
            valid: false
        }
    };

    handleClickShowPassword = () => {
        this.setState(state => ({showPassword: !state.showPassword}));
    };

    handleChange = name => event => {
        const updatedField = {...this.state[name]};
        updatedField.value = event.target.value.trim();
        updatedField.error = this.checkValidity(name, updatedField);
        updatedField.valid = updatedField.error.length === 0;
        if (name === "password") {
            const updatedRepeatPassword = {...this.state.repeatPassword};
            updatedRepeatPassword.error = this.checkPasswordsMatch(updatedField.value, updatedRepeatPassword.value);
            updatedRepeatPassword.valid = updatedRepeatPassword.error.length === 0;
            this.setState({password: updatedField, repeatPassword: updatedRepeatPassword});
        } else {
            this.setState({[name]: updatedField});
        }
    };

    checkPasswordsMatch = (password, repeatedPassword) => {
        if (password !== repeatedPassword) {
            return "Passwords don't match";
        } else {
            return '';      // No error
        }
    };

    checkValidity = (name, element) => {
        switch (name) {
            case 'password':
                return this.checkPassword(element);
            case 'repeatPassword':
                return this.checkRepeatPassword(element);
            case 'oldPassword':
                return this.checkOldPassword(element);
            default:
                return '';      // No error
        }
    };

    checkPassword = (password) => {
        if (password.value.length === 0 && password.focused) {
            return '* Required';
        } else if (password.value.length < 6) {
            return 'Must have 6 or more characters';
        } else if (password.value.length > 26) {
            return 'Cannot be longer than 26 characters';
        } else if (password.value.search(/[A-Z]/) === -1) {
            return 'Must contain an uppercase character';
        } else if (password.value.search(/[a-z]/) === -1) {
            return 'Must contain an lowercase character';
        } else if (password.value.search(/\d/) === -1) {
            return 'Must contain at least 1 digit';
        } else {
            return '';      // No error
        }
    };

    checkRepeatPassword = (repeatPassword) => {
        if (repeatPassword.value.length === 0 && repeatPassword.focused) {
            return '* Required';
        } else if (repeatPassword.value !== this.state.password.value) {
            return 'Passwords don\'t match';
        } else {
            return '';      // No error
        }
    };

    checkOldPassword = (oldPassword) => {
        this.reauthenticateUser(oldPassword);
        if (oldPassword.value.length === 0 && oldPassword.focused) {
            return '* Required';
        } else {
            return '';      // No error
        }
    };

    reauthenticateUser = (oldPassword) => {
        const user = fire.auth().currentUser;
        fire.auth().fetchSignInMethodsForEmail(user.email)
            .then((signInMethods) => {
                if (signInMethods.length > 0) {
                    const updatedOldPassword = {...oldPassword};
                    const provider = user.providerData[0].providerId;
                    if (provider !== "password") {
                        let providerName;
                        if (provider === 'facebook.com') {
                            providerName = "Facebook";
                        } else if (provider === 'twitter.com') {
                            providerName = "Twitter";
                        } else if (provider === 'google.com') {
                            providerName = "Google";
                        }
                        updatedOldPassword.error = 'Please change the password from your associated ' + providerName + ' account';
                        updatedOldPassword.valid = false;
                        this.setState({oldPassword: updatedOldPassword});
                    }
                }
            });
    };

    handleFocus = name => () => {
        const updatedField = {...this.state[name]};
        if (!updatedField.focused) {
            updatedField.focused = true;
            updatedField.error = this.checkValidity(name, updatedField);
            this.setState({[name]: updatedField});

            if (name === 'password') {
                this.handleFocus('repeatPassword')();
            }
        }
    };

    checkFormValidity = () => {
        return this.state.oldPassword.valid && this.state.password.valid && this.state.repeatPassword.valid;
    };

    updatePassword = () => {
        const user = fire.auth().currentUser;

        const credential = firebase.auth.EmailAuthProvider.credential(user.email, this.state.oldPassword.value);

        user.reauthenticateAndRetrieveDataWithCredential(credential)
            .then(() => {
                return user.updatePassword(this.state.password.value)
            })
            .then(() => {
                console.log("Password updated successfully");
            })
            .catch(error => {
                alert(error.message);
            });

        this.props.closed();
    };

    render() {

        const formValid = this.checkFormValidity();
        return (
            <div>
                <form>
                    <Dialog
                        fullScreen
                        open={this.props.open}
                        closed={this.props.closed}>
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <Tooltip classes={{tooltip: classes.Tool}} TransitionComponent={Fade} TransitionProps={{timeout: 300}}
                                         placement={"right"}
                                         title={"Cancel"}>
                                    <IconButton color="inherit" onClick={this.props.closed} aria-label="Close"
                                                className={classes.butonCancel}>
                                        <CloseIcon/>
                                    </IconButton>
                                </Tooltip>
                                <Typography variant="h6" color="inherit" className={classes.AppbarTitle}>
                                    Change Password
                                </Typography>
                                <Tooltip classes={{tooltip: classes.ToolS}} TransitionComponent={Fade} TransitionProps={{timeout: 300}}
                                         placement={"bottom"}
                                         title={"save changes"}>
                                    <Button
                                        color="inherit"
                                        onClick={this.updatePassword}
                                        className={classes.butonSave}
                                        disabled={!formValid}
                                    >
                                        <SaveIcon style={{marginRight: "4px"}}/>
                                        Save
                                    </Button>
                                </Tooltip>
                            </Toolbar>
                        </AppBar>
                        <div>
                            <div className={classes.SubTitles}>
                                <h2>Enter old password:</h2>
                                <Grid container={true} spacing={8} style={{alignItems: "center"}}>
                                    <Grid item>
                                        <OldPassword style={{width: 40, height: 40}}/>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField
                                            label="Current Password"
                                            rowsMax="4"
                                            helperText={"Enter your current password"}
                                            variant={"outlined"}
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            margin={"normal"}
                                            error={this.state.oldPassword.error.length > 0}
                                            helperText={this.state.oldPassword.error}
                                            value={this.state.oldPassword.value}
                                            onChange={this.handleChange('oldPassword')}
                                            onFocus={this.handleFocus('oldPassword')}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment variant="outlined" position="end">
                                                        <IconButton
                                                            style={{background: "white", color: "grey"}}
                                                            aria-label="Toggle password visibility"
                                                            onClick={this.handleClickShowPassword}
                                                        >
                                                            {this.state.showPassword ?
                                                                <Visibility style={{color: "black"}}/> :
                                                                <VisibilityOff style={{color: "black"}}/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                            <div className={classes.SubTitles}>
                                <h2>Enter new password:</h2>
                                <Grid container={true} spacing={8} alignItems="center">
                                    <Grid item>
                                        <CheckPassword style={{width: 40, height: 40}}/>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField
                                            label="New Password"
                                            helperText={"Enter new password"}
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            rowsMax="4"
                                            variant={"outlined"}
                                            margin={"normal"}
                                            error={this.state.password.error.length > 0}
                                            helperText={this.state.password.error}
                                            value={this.state.password.value}
                                            onChange={this.handleChange('password')}
                                            onFocus={this.handleFocus('password')}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                            <div className={classes.SubTitles}>
                                <h2>Confirm new password:</h2>
                                <Grid container={true} spacing={8} alignItems="center">
                                    <Grid item>
                                        <Password style={{width: 40, height: 40}}/>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField
                                            label="Confirm password"
                                            helperText={"Re-enter new password"}
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            rowsMax="4"
                                            variant={"outlined"}
                                            margin={"normal"}
                                            error={this.state.repeatPassword.error.length > 0}
                                            helperText={this.state.repeatPassword.error}
                                            value={this.state.repeatPassword.value}
                                            onChange={this.handleChange('repeatPassword')}
                                            onFocus={this.handleFocus('repeatPassword')}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </Dialog>
                </form>
            </div>
        );
    }
}

export default ChangePasswordDialog;