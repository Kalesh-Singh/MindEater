import React, {Component} from 'react';
import {Button} from "@material-ui/core";
import FacebookIcon from "../../../../assets/svg/FacebookIcon/FacebookIcon";
import firebase from "firebase/app";
import fire from "../../../../fire";
import classes from "./Facebook.module.css"
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Zoom from "@material-ui/core/Zoom/Zoom";

class Facebook extends Component {

    signInWithFacebook = () => {
        let provider = new firebase.auth.FacebookAuthProvider();
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
            <Tooltip TransitionComponent={Zoom} TransitionProps={{timeout: 600}} placement={"top"}
                     title={"Sign in with Facebook"} enterDelay={50} leaveDelay={200}>
                <Button
                    variant='fab'
                    onClick={this.signInWithFacebook}
                    className={classes.FacebookButton}
                >
                    <FacebookIcon/>
                </Button>
            </Tooltip>
        );
    }
}

export default Facebook;

