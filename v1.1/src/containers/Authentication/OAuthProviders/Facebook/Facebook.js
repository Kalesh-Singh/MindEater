import React, {Component} from 'react';
import {Button} from "@material-ui/core";
import FacebookIcon from "../../../../assets/svg/FacebookIcon/FacebookIcon";
import firebase from "firebase/app";
import fire from "../../../../fire";

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
            <Button
                variant='fab'
                onClick={this.signInWithFacebook}
            >
                <FacebookIcon/>
            </Button>
        );
    }
}

export default Facebook;

