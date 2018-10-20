import React, {Component} from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";

import classes from './Authentication.module.css'

class Authentication extends Component {

    state = {
        value: 'sign-in',
    };

    handleChange = event => {
        this.setState({ value: event.target.value });
    };

    render() {
        return (
            <div>
                <RadioGroup
                    value={this.state.value}
                    onChange={this.handleChange}
                    className={classes.Radio}
                    style={{flexDirection: 'row'}}
                >

                    <FormControlLabel value='sign-in' control={<Radio />} label='Sign In' />
                    <FormControlLabel value='sign-up' control={<Radio />} label='Sign Up' />
                </RadioGroup>
            </div>
        );
    }
}

export default Authentication;