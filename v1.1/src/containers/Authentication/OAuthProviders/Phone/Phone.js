import React, {Component} from 'react';
import {Button} from "@material-ui/core";
import PhoneIcon from "../../../../assets/svg/PhoneIcon/PhoneIcon";
import firebase from "firebase";
import fire from "../../../../fire";

class Phone extends Component {

    signInWithPhone = () => {
        let provider = new firebase.auth.PhoneAuthProvider();
        fire.auth().signInWithPopup(provider)
            .then(() => {
                alert('Successfully signed in with Phone');
            }).catch(function (error) {
            alert(error.message);
        });
    }

    render() {
        return (
            <Button
                variant='fab'
                onClick={this.signInWithPhone}
            >
                <PhoneIcon/>
            </Button>
        );
    }
}

export default Phone;

