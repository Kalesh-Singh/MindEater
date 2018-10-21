import React from 'react';
import Google from "./Google/Google";

import classes from './OAuthProviders.module.css';
import Facebook from "./Facebook/Facebook";
import Twitter from "./Twitter/Twitter";


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