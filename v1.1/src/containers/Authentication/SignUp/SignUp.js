import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import {Button} from "@material-ui/core";

import classes from './SignUp.module.css';

class SignUp extends Component {
    render() {
        return (
            <form className={classes.SignUp}>
                <TextField
                    label='Username'
                    margin='normal'
                />
                <TextField
                    label='Email'
                    margin='normal'
                />
                <TextField
                    label='Password'
                    margin='normal'
                />
                <TextField
                    label='Repeat Password'
                    margin='normal'
                />
                <Button variant='contained'>Sign In</Button>
            </form>
        );
    }
}

export default SignUp;