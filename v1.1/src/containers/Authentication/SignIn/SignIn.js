import React, {Component} from 'react';
import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import classes from './SignIn.module.css';

class SignIn extends Component {
    state = {
            email: '',
            password: ''
    };

    handleChange = name =>  event => {
        console.log(event.target.value);
        this.setState({[name]: event.target.value})
    };

    render() {
        return (
            <form className={classes.SignIn}>
                <TextField
                    name='email'
                    label='Email'
                    margin='normal'
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                />
                <TextField
                    name='password'
                    label='Password'
                    type='password'
                    autoComplete='current-password'
                    margin='normal'
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                />
                <Button variant='contained'>Sign In</Button>
            </form>
        );
    }
}

export default SignIn;
