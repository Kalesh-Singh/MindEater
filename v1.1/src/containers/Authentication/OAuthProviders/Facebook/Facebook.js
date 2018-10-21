import React, {Component} from 'react';
import {Button} from "@material-ui/core";
import FacebookIcon from "../../../../assets/svg/FacebookIcon/FacebookIcon";

class Facebook extends Component {

    signInWithFacebook = () => {
      // TODO:
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