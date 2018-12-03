import React, {Component} from 'react';

import {Button} from "@material-ui/core";
import firebase from 'firebase/app';
import fire from '../../../../fire';

import GoogleIcon from "../../../../assets/svg/GoogleIcon/GoogleIcon";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Zoom from "@material-ui/core/Zoom/Zoom";
import classes from "./Google.module.css"

class Google extends Component {
    signInWithGoogle = () => {
        let provider = new firebase.auth.GoogleAuthProvider();
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
                     title={"Sign in with Google"} enterDelay={50} leaveDelay={200}>
                <Button
                    variant='fab'
                    onClick={this.signInWithGoogle}
                    className={classes.GoogleButton}
                >
                    <GoogleIcon/>
                </Button>
            </Tooltip>
        );
    }
}

export default Google;