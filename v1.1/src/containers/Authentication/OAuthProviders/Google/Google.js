import React, {Component} from 'react';

import {Button} from "@material-ui/core";
import firebase from 'firebase/app';
import fire from '../../../../fire';

import GoogleIcon from "../../../../assets/svg/GoogleIcon/GoogleIcon";

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
            .catch(function (error) {
                alert(error.message);
            });
    };

    render() {
        return (
            <Button
                variant='fab'
                onClick={this.signInWithGoogle}
            >
                <GoogleIcon/>
            </Button>
        );
    }
}

export default Google;