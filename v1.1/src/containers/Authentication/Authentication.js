import React, {Component} from 'react';
import fire from '../../fire';

import classes from './Authentication.module.css'
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Grid from "@material-ui/core/Grid/Grid";
import OAuthProviders from "./OAuthProviders/OAuthProviders";
import Blogo from "../../assets/svg/black_logo.png";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import AddAccount from "@material-ui/icons/PersonAddTwoTone";
import Account from "@material-ui/icons/AccountCircleTwoTone";

class Authentication extends Component {

    state = {
        value: 'sign-in',
    };

    componentDidMount() {
        fire.auth().onAuthStateChanged(this.signInObserver);
    }

    // Triggers when the auth state changes to handle sign-ins.
    signInObserver = (user) => {
        if (user) {
            this.props.history.push('/dashboard');
        }
    };

    handleToggle = value => {
        this.setState({value: value})
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
                                <img className={classes.Logo} src={Blogo} alt='Mind Eater Logo'/>
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
                            <Tabs fullWidth
                                  value={this.state.value}
                                  textColor={"primary"}
                            >
                                <Tab
                                    label='Sign In'
                                    value='sign-in'
                                    icon={<Account/>}
                                    onClick={() => {this.handleToggle('sign-in')}}
                                />
                                <Tab
                                    label='Sign Up'
                                    value='sign-up'
                                    icon={<AddAccount/>}
                                    onClick={() => {this.handleToggle('sign-up')}}
                                />
                            </Tabs>
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