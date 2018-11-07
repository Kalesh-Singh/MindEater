import React, {Component} from 'react';
import Button from "@material-ui/core/Button/Button";
import ChallengeDialog from "../ChallengeDialog/ChallengeDialog";
import PlusIcon from "@material-ui/icons/Add"

import classes from "./AddChallenge.module.css";

class AddChallenge extends Component {
    state = {
        open: false
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        return (
            <>
                <Button onClick={this.handleClickOpen}
                style={{background:"green", color:"white", borderRadius:"20px"}}>
                    <PlusIcon style={{marginRight: '8px'}}/>Create New Challenge</Button>
                <ChallengeDialog
                    open={this.state.open}
                    closed={this.handleClose}
                />
            </>
        );
    }
}

export default AddChallenge;