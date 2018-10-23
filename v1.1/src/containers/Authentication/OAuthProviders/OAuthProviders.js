import React from 'react';

import Google from "./Google/Google";
import Facebook from "./Facebook/Facebook";
import Twitter from "./Twitter/Twitter";

import classes from './OAuthProviders.module.css';


function OAuthProviders() {
    return (
        <div className={classes.Providers}>
            <Google/>
            <Facebook/>
            <Twitter/>
        </div>
    );
}

export default OAuthProviders;