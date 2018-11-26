import React, {Component} from 'react';
import fire from '../../fire';

import classes from './Authentication.module.css'
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Grid from "@material-ui/core/Grid/Grid";
import OAuthProviders from "./OAuthProviders/OAuthProviders";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import AddAccount from "@material-ui/icons/PersonAddTwoTone";
import Account from "@material-ui/icons/AccountCircleTwoTone";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core";
import lightBlue from "@material-ui/core/es/colors/lightBlue";
import EmailVerificationDialog from "./EmailVerificationDialog/EmailVerificationDialog";
import BlackLogo from "../../assets/svg/black_logo.png";
import GreenLogo from "../../assets/svg/green_logo.png";
import BlueLogo from "../../assets/svg/blue_logo.png";
import OrangeLogo from "../../assets/svg/orange_logo.png";
import RedLogo from "../../assets/svg/red_logo.png";
import YellowLogo from "../../assets/svg/yellow_logo.png";
import LightBlueLogo from "../../assets/svg/light_blue_logo.png";

const theme = createMuiTheme({
    palette: {
        primary: lightBlue,
    },
    typography: {
        useNextVariants: true,
    },
});

class Authentication extends Component {

    state = {
        value: 'sign-in',
        open: false,
        Logo: Authentication.getRandomLogo(),
    };

    handleClose = () => {
        this.setState({open: false});
    };

    componentDidMount() {
        fire.auth().onAuthStateChanged(this.signInObserver);
    }

    // Triggers when the auth state changes to handle sign-ins.
    signInObserver = (user) => {
        if (user) {
            if (user.emailVerified || user.providerData[0].providerId === "twitter.com") {
                console.log("USER", user);
                this.props.history.push('/dashboard');
            } else {
                this.setState({open: true});
            }
        }
    };

    static getRandomLogo() {
        let colorValues = [BlackLogo, GreenLogo, BlueLogo, OrangeLogo, RedLogo, YellowLogo, LightBlueLogo];
        return colorValues[Math.floor(Math.random() * colorValues.length)];
    }

    handleToggle = value => {
        this.setState({value: value})
    };

    render() {
        const form = (this.state.value === 'sign-in')
            ? <><SignIn/>
                <hr/>
                <OAuthProviders/></> : <SignUp/>;
        return (
            <>
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
                                    <img className={classes.Logo} src={this.state.Logo} alt='Mind Eater Logo'/>
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
                                <MuiThemeProvider theme={theme}>
                                    <Tabs fullWidth
                                          value={this.state.value}
                                          indicatorColor='primary'
                                          textColor={"black"}

                                    >
                                        <Tab
                                            label='Sign In'
                                            value='sign-in'
                                            icon={<Account/>}
                                            onClick={() => {
                                                this.handleToggle('sign-in')
                                            }}
                                            className={classes.SignBttn}
                                        />
                                        <Tab
                                            label='Sign Up'
                                            value='sign-up'
                                            icon={<AddAccount/>}
                                            onClick={() => {
                                                this.handleToggle('sign-up')
                                            }}
                                            className={classes.SignBttn}
                                        />
                                    </Tabs>
                                </MuiThemeProvider>
                                {form}
                                {this.state.value === 'sign-up' ?
                                    <div className={classes.Hr}>
                                        <div className={classes.FootLnk}>
                                            <a onClick={() => {
                                                this.setState({value: 'sign-in'})
                                            }}>Already a Member?</a>
                                        </div>
                                    </div>
                                    : null}
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <EmailVerificationDialog
                    open={this.state.open}
                    closed={this.handleClose}
                />
            </>

        );
    }
}

export default Authentication;