import React, {Component} from 'react';
import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import classes from './SignIn.module.css';

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
        }
    };

    checkFormValidity = () => {
        let validForm = true;
        const form = {...this.state};
        for (let element in form) {
            console.log(element + ' : ' + form[element].valid);
            validForm = validForm && form[element].valid;
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
                    error={this.state.email.error.length > 0}
                    helperText={this.state.email.error}
                    value={this.state.email.value}
                    onChange={this.handleChange('email')}
                    onFocus={this.handleFocus('email')}
                />
                <TextField
                    name='password'
                    label='Password'
                    type='password'
                    margin='normal'
                    error={this.state.password.error.length > 0}
                    helperText={this.state.password.error}
                    value={this.state.password.value}
                    onChange={this.handleChange('password')}
                    onFocus={this.handleFocus('password')}
                />
                <Button
                    variant='contained'
                    type='submit'
                    disabled={!validForm}
                >
                    Sign In
                </Button>
            </form>
        );
    }
}

export default SignIn;