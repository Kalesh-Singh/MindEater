import React, {Component} from 'react';
import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import classes from './SignIn.module.css';

class SignIn extends Component {
    render() {
        return (
            <form className={classes.SignIn}>
                <TextField
                    id='email'
                    label='Email'
                    margin='normal'
                />
                <TextField
                    id='password'
                    label='Password'
                    margin='normal'
                />
                <Button variant='contained'>Sign In</Button>
            </form>
        );
    }
}

export default SignIn;
