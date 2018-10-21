import React from 'react';
import Google from "./Google/Google";

import classes from './OAuthProviders.module.css';
import Facebook from "./Facebook/Facebook";

function OAuthProviders() {
    return (
        <div className={classes.Providers}>
            <Google/>
            <Facebook/>
            <Google/>
            <Facebook/>
        </div>
    );
}

export default OAuthProviders;