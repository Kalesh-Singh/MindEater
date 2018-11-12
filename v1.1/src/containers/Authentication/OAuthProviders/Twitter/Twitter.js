import React, {Component} from 'react';
import {Button} from "@material-ui/core";
import firebase from 'firebase/app';
import fire from '../../../../fire';

import TwitterIcon from "../../../../assets/svg/TwitterIcon/TwitterIcon";

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
            <Button
                variant='fab'
                onClick={this.signInWithTwitter}
            >
                <TwitterIcon/>
            </Button>
        );
    }
}

export default Twitter;