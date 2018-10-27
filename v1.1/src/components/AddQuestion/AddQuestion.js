import React, {Component} from 'react';
import {Button} from "@material-ui/core";
import QuestionDialog from "../QuestionDialog/QuestionDialog";

class AddQuestion extends Component {

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
                <Button
                    onClick={this.handleClickOpen}
                >
                    Add Question
                </Button>
                <QuestionDialog
                    open={this.state.open}
                    closed={this.handleClose}
                    challengeId={this.props.challengeId}
                />
            </>
        );
    }
}

export default AddQuestion;