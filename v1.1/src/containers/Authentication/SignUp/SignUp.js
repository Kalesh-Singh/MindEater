import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import {Button} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import classes from './SignUp.module.css';
import fire from '../../../fire';

import Lock from '@material-ui/icons/LockOutlined';
import OpenLock from '@material-ui/icons/LockOpenOutlined';
import Email from '@material-ui/icons/EmailOutlined';
import Face from '@material-ui/icons/AccountCircleOutlined';
import Divider from "@material-ui/core/Divider/Divider";

class SignUp extends Component {
    state = {
        username: {
            value: '',
            error: '',
            focused: false,
            valid: false
        },
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
        repeatPassword: {
            value: '',
            error: '',
            focused: false,
            valid: false
        },
        showPassword: false
    };

    checkFormValidity = () => {
        let validForm = true;
        const form = {...this.state};
        for (let element in form) {
            if (element !== 'showPassword') {
                console.log(element + ' : ' + form[element].valid);
                validForm = validForm && form[element].valid;
            }
        }
        return validForm;
    };

    sendEmailVerification = () => {
        const user = fire.auth().currentUser;
        if (user && user.emailVerified === false) {
            user.sendEmailVerification()
                .then(() => {
                    console.log("Email verification sent");
                });
        }
    };

    signUp = (event) => {
        event.preventDefault();
        fire.auth().createUserWithEmailAndPassword(
            this.state.email.value, this.state.password.value)
            .then(() => {
                const user = fire.auth().currentUser;
                this.sendEmailVerification();
                const updates = {};
                updates['/users/' + user.uid + '/username'] = this.state.username.value;
                fire.database().ref().update(updates)
                    .then(() => {
                        console.log('Saved user name to database.');
                    })
                    .catch(error => {
                        alert(error.message);
                    })
            })
            .catch((error) => {
                alert(error.message);
            });
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

            if (name === 'password') {
                this.handleFocus('repeatPassword')();
            }
        }
    };

    checkValidity = (name, element) => {
        switch (name) {
            case 'password':
                return this.checkPassword(element);
            case 'repeatPassword':
                return this.checkRepeatPassword(element);
            case 'email':
                return this.checkEmail(element);
            case 'username':
                return this.checkUserName(element);
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

    checkEmail = (email) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email.value.length === 0 && email.focused) {
            return '* Required';
        } else if (!pattern.test(String(email.value).toLowerCase())) {
            return 'Invalid email format';
        } else {
            this.checkEmailReuse(email);
            return '';     // No error
        }
    };

    checkEmailReuse = (email) => {
        fire.auth().fetchSignInMethodsForEmail(email.value)
            .then((signInMethods) => {
                if (signInMethods.length > 0) {
                    const updatedEmail = {...email};
                    updatedEmail.error = 'There is already an account with this email';
                    updatedEmail.valid = false;
                    this.setState({email: updatedEmail});
                }
            })
    };

    checkUserName = (username) => {
        const pattern = /^[a-zA-Z0-9-_]+$/; // Alphanumeric dashes and underscores.
        if (username.value.length === 0 && username.focused) {
            return '* Required';
        } else if (username.value.length > 15) {
            return 'Cannot be longer than 15 characters';
        } else if (!pattern.test(username.value)) {
            return 'Only characters A-Z, a-z, -, and _ allowed';
        } else {
            return '';      // No error
        }
    };

    handleClickShowPassword = () => {
        this.setState(state => ({showPassword: !state.showPassword}));
    };

    render() {

        const validForm = this.checkFormValidity();

        return (
            <form
                className={classes.SignUp}
                onSubmit={this.signUp}
            >
                <TextField
                    name='username'
                    label='Username'
                    placeholder='Username'
                    margin='normal'
                    variant='outlined'
                    error={this.state.username.error.length > 0}
                    helperText={this.state.username.error}
                    value={this.state.username.value}
                    onChange={this.handleChange('username')}
                    onFocus={this.handleFocus('username')}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment variant="outlined" position="start">
                                <Face/>
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    name='email'
                    label='Email'
                    type='email'
                    placeholder='Email'
                    margin='normal'
                    variant='outlined'
                    error={this.state.email.error.length > 0}
                    helperText={this.state.email.error}
                    value={this.state.email.value}
                    onChange={this.handleChange('email')}
                    onFocus={this.handleFocus('email')}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment variant="outlined" position="start">
                                <Email/>
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    name='password'
                    label='Password'
                    placeholder='Password'
                    type={this.state.showPassword ? 'text' : 'password'}
                    margin='normal'
                    variant='outlined'
                    error={this.state.password.error.length > 0}
                    helperText={this.state.password.error}
                    value={this.state.password.value}
                    onChange={this.handleChange('password')}
                    onFocus={this.handleFocus('password')}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment variant="outlined" position="start">
                                <OpenLock/>
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment variant="outlined" position="end">
                                <IconButton
                                    style={{background: "white", color: "grey"}}
                                    aria-label="Toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                >
                                    {this.state.showPassword ? <Visibility style={{color: "black"}}/> :
                                        <VisibilityOff style={{color: "black"}}/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    name='repeatPassword'
                    label='Repeat Password'
                    placeholder='Repeat Password'
                    type={this.state.showPassword ? 'text' : 'password'}
                    margin='normal'
                    variant='outlined'
                    error={this.state.repeatPassword.error.length > 0}
                    helperText={this.state.repeatPassword.error}
                    value={this.state.repeatPassword.value}
                    onChange={this.handleChange('repeatPassword')}
                    onFocus={this.handleFocus('repeatPassword')}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment variant="outlined" position="start">
                                <Lock/>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    variant='extendedFab'
                    type='submit'
                    disabled={!validForm}
                >
                    Sign Up
                </Button>
                <Divider className={classes.DividerStyle}/>
            </form>
        );
    }
}

export default SignUp;