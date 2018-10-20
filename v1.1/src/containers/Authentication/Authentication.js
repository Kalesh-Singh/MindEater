import React, {Component} from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";

import classes from './Authentication.module.css'
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Grid from "@material-ui/core/Grid/Grid";

class Authentication extends Component {

    state = {
        value: 'sign-in',
    };

    handleChange = event => {
        this.setState({value: event.target.value});
    };

    render() {
        const form = (this.state.value === 'sign-in') ? <SignIn/> : <SignUp/>;
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{minHeight: '100vh'}}
            >
                <Grid item xs={12}>
                    <div className={classes.Authentication}>
                        <RadioGroup
                            value={this.state.value}
                            onChange={this.handleChange}
                            className={classes.Radio}
                            style={{flexDirection: 'row'}}
                        >
                            <FormControlLabel value='sign-in' control={<Radio/>} label='Sign In'/>
                            <FormControlLabel value='sign-up' control={<Radio/>} label='Sign Up'/>
                        </RadioGroup>
                        {form}
                    </div>
                </Grid>

            </Grid>

        );
    }
}

export default Authentication;