import React, {Component} from 'react';
import {Button} from "@material-ui/core";
import firebase from 'firebase/app';
import fire from '../../../../fire';
import classes from "./Twitter.module.css"

import TwitterIcon from "../../../../assets/svg/TwitterIcon/TwitterIcon";
import Zoom from "@material-ui/core/Zoom/Zoom";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

class Twitter extends Component {

    signInWithTwitter = () => {
        let provider = new firebase.auth.TwitterAuthProvider();
        fire.auth().signInWithPopup(provider)
            .then(() => {
                const user = fire.auth().currentUser;
                const updates = {};
                updates['/users/' + user.uid + '/username'] = user.displayName;
                fire.database().ref().update(updates)
                    .then(() => {
                        console.log('Saved user name to database.');
                    })
                    .catch(error => {
                        alert(error.message);
                    })
            })
            .catch(error => {
                alert(error.message);
            });
    };

    render() {
        return (
            <Tooltip classes={{tooltip: classes.Tool}} TransitionComponent={Zoom} TransitionProps={{timeout: 600}} placement={"top"}
                     title={"Sign in with Twitter"} enterDelay={50} leaveDelay={200}>
                <Button
                    variant='fab'
                    onClick={this.signInWithTwitter}
                    className={classes.TwitterButton}
                >
                    <TwitterIcon/>
                </Button>
            </Tooltip>
        );
    }
}

export default Twitter;