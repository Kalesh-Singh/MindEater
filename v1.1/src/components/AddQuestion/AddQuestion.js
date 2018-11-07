import React, {Component} from 'react';
import {Button, createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import QuestionDialog from "../QuestionDialog/QuestionDialog";
import green from "@material-ui/core/es/colors/green";

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
    overrides: {
        MuiButton: {
            raisedPrimary: {
                color: 'white',
            },
        },
    }
});

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
                <MuiThemeProvider theme={theme}>
                <Button onClick={this.handleClickOpen}
                color="primary"
                variant={"extendedFab"}>
                    Add Question
                </Button>
                </MuiThemeProvider>
                <QuestionDialog
                    open={this.state.open}
                    closed={this.handleClose}
                    savePartial={this.props.savePartial}
                    challengeId={this.props.challengeId}
                />
            </>
        );
    }
}

export default AddQuestion;
