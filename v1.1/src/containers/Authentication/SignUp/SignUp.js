import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import {Button} from "@material-ui/core";

import classes from './SignUp.module.css';

class SignUp extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        repeatPassword: ''
    };

    handleChange = name =>  event => {
        this.setState({[name]: event.target.value})
    };

    render() {
        return (
            <form className={classes.SignUp}>
                <TextField
                    name='username'
                    label='Username'
                    margin='normal'
                    value={this.state.username}
                    onChange={this.handleChange('username')}
                />
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
                    margin='normal'
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                />
                <TextField
                    name='repeatPassword'
                    label='Repeat Password'
                    type='password'
                    margin='normal'
                    value={this.state.repeatPassword}
                    onChange={this.handleChange('repeatPassword')}
                />
                <Button variant='contained'>Sign Up</Button>
            </form>
        );
    }
}

export default SignUp;