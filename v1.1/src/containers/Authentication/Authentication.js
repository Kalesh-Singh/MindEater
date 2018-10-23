import React, {Component} from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";

import classes from './Authentication.module.css'
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Grid from "@material-ui/core/Grid/Grid";
import OAuthProviders from "./OAuthProviders/OAuthProviders";
import Blogo from "../../assets/svg/black_logo.png";

class Authentication extends Component {

    state = {
        value: 'sign-in',
    };

    handleChange = event => {
        this.setState({value: event.target.value});
    };

    render() {
        const form = (this.state.value === 'sign-in')
            ? <><SignIn/>
                <hr/>
                <OAuthProviders/></> : <SignUp/>;
        return (
            <Grid
                className={classes.Background}
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{minHeight: '100vh'}}
            >
                <Grid item xs={12}>
                    <div className={classes.Authentication}>
                        <div className={classes.Padd}>
                            <div className={classes.Header}>
                                <img className={classes.Logo} src={Blogo}/>
                                <div>
                                    <span className={classes.letter}>M</span>
                                    <span className={classes.letter}>i</span>
                                    <span className={classes.letter}>n</span>
                                    <span className={classes.letter}>d</span>
                                    <span className={classes.letter}> </span>
                                    <span className={classes.letter}>E</span>
                                    <span className={classes.letter}>a</span>
                                    <span className={classes.letter}>t</span>
                                    <span className={classes.letter}>e</span>
                                    <span className={classes.letter}>r</span>
                                </div>
                            </div>
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
                            {this.state.value === 'sign-up'?
                                <div className={classes.Hr}>
                                    <div className={classes.FootLnk}>
                                        <a onClick={() => {this.setState({value: 'sign-in'})}}>Already a Member?</a>
                                    </div>
                                </div>
                                : null}
                        </div>
                    </div>
                </Grid>

            </Grid>

        );
    }
}

export default Authentication;