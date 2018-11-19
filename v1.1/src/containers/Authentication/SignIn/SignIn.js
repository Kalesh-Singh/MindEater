import React, {Component} from 'react';
import {Button, createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Email from '@material-ui/icons/EmailOutlined';
import Lock from '@material-ui/icons/LockOutlined';

import classes from './SignIn.module.css';
import fire from '../../../fire';
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import lightBlue from "@material-ui/core/es/colors/lightBlue";
import HelpIcon from "@material-ui/icons/HelpOutline"

const theme = createMuiTheme({
    palette: {
        primary: lightBlue,
    },
});

class SignIn extends Component {
    state = {
        email: {
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
        open:false,
        showPassword: false,
    };

    forgotPassword = () =>{
        let emailAddress = 'nunezjesus@google.com';
        fire.auth().sendPasswordResetEmail(emailAddress)
            .then(()=> {
                alert('Successfully sent reset email')
            }).catch(function (error){
            alert(error.message);
        })
    };

    signIn = (event) => {
        event.preventDefault();
        fire.auth().signInWithEmailAndPassword(
            this.state.email.value, this.state.password.value)
            .catch(function (error) {
                alert(error.message);
            });
    };

    checkFormValidity = () => {
        let validForm = true;
        const form = {...this.state};
        for (let element in form) {
            if (element !== 'showPassword' && element !== 'open') {
                console.log(element + ' : ' + form[element].valid);
                validForm = validForm && form[element].valid;
            }
        }
        return validForm;
    };

    handleChange = name => event => {
        const updatedField = {...this.state[name]};
        updatedField.value = event.target.value.trim();
        updatedField.error = this.checkValidity(name, updatedField);
        updatedField.valid = updatedField.error.length === 0;
        this.setState({[name]: updatedField});
    };

    handleFocus = name => () => {
        const updatedField = {...this.state[name]};
        if (!updatedField.focused) {
            updatedField.focused = true;
            updatedField.error = this.checkValidity(name, updatedField);
            this.setState({[name]: updatedField});
        }
    };

    checkValidity = (name, element) => {
        switch (name) {
            case 'password':
                return this.checkPassword(element);
            case 'email':
                return this.checkEmail(element);
            default:
                return '';
        }
    };

    checkEmail = (email) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email.value.length === 0 && email.focused) {
            return '* Required';
        } else if (!pattern.test(String(email.value).toLowerCase())) {
            return 'Invalid email format';
        } else {
            return '';     // No error
        }
    };

    checkPassword = (password) => {
        if (password.value.length === 0 && password.focused) {
            return '* Required';
        } else {
            return '';      // No error
        }
    };

    handleClickShowPassword = () => {
        this.setState(state => ({showPassword: !state.showPassword}));
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {

        const validForm = this.checkFormValidity();

        return (
            <form
                className={classes.SignIn}
                onSubmit={this.signIn}
            >
                <TextField
                    name='email'
                    label='Email'
                    type='email'
                    margin='normal'
                    autoFocus
                    variant="outlined"
                    placeholder="Email"
                    error={this.state.email.error.length > 0}
                    helperText={this.state.email.error}
                    value={this.state.email.value}
                    onChange={this.handleChange('email')}
                    onFocus={this.handleFocus('email')}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Email/>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    name='password'
                    label='Password'
                    type={this.state.showPassword ? 'text' : 'password'}
                    margin="normal"
                    variant="outlined"
                    placeholder="Password"
                    error={this.state.password.error.length > 0}
                    helperText={this.state.password.error}
                    value={this.state.password.value}
                    onChange={this.handleChange('password')}
                    onFocus={this.handleFocus('password')}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock/>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment variant="outlined" position="end">
                                <IconButton
                                    style={{background:"#eeeeee", color:"grey"}}
                                    aria-label="Toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                >
                                    {this.state.showPassword ? <Visibility style={{color:"black"}}/>: <VisibilityOff style={{color:"black"}}/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    variant='extendedFab'
                    type='submit'
                    disabled={!validForm}
                >Sign In
                </Button>
                <div className={classes.Hr}>
                    <div className={classes.FootLnk}>
                        <div>
                            <a onClick={this.handleClickOpen}>Forgot Password?</a>
                            <Dialog
                                open={this.state.open}
                                onClose={this.handleClose}
                                aria-labelledby="form-dialog-title"
                            >
                                <DialogTitle id="form-dialog-title"> <HelpIcon style={{
                                    margin: 0,
                                    top: 20,
                                    right: 20,
                                    bottom: 'auto',
                                    left: 'auto', position:"absolute"}}/>Forgot Password</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Please input your email below to reset your password.
                                    </DialogContentText>
                                    <MuiThemeProvider theme={theme}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label='Email'
                                        type='email'
                                        name='email'
                                        placeholder="Email"
                                        fullWidth
                                        color="primary"
                                    />
                                    </MuiThemeProvider>
                                </DialogContent>
                                <DialogActions>
                                    <MuiThemeProvider theme={theme}>
                                    <Button onClick={this.handleClose} color="primary" className={classes.cancelBttn}>
                                        Cancel
                                    </Button>
                                    <Button onClick={this.handleClose} color="primary" className={classes.sendBttn}>
                                        Send
                                    </Button>
                                    </MuiThemeProvider>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default SignIn;
