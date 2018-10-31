import React, {Component} from 'react';
import Button from "@material-ui/core/Button/Button";
import ChallengeDialog from "../ChallengeDialog/ChallengeDialog";

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
                <Button onClick={this.handleClickOpen}>New Challenge</Button>
                <ChallengeDialog
                    open={this.state.open}
                    closed={this.handleClose}
                />
            </>
        );
    }
}

export default AddChallenge;