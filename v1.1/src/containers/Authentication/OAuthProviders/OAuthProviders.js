import React from 'react';
import Google from "./Google/Google";

import classes from './OAuthProviders.module.css';

function OAuthProviders() {
    return (
        <div className={classes.Providers}>
            <Google/>
        </div>
    );
}

export default OAuthProviders;