import React, {Component} from 'react';
import {Button} from "@material-ui/core";
import FacebookIcon from "../../../../assets/svg/FacebookIcon/FacebookIcon";
import firebase from "firebase/app";
import fire from "../../../../fire";

class Facebook extends Component {

    signInWithFacebook = () => {
        let provider = new firebase.auth.FacebookAuthProvider();
        fire.auth().signInWithPopup(provider)
            .catch(function (error) {
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

