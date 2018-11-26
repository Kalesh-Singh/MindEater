import React, {Component} from 'react';
import {Button, createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import QuestionDialog from "../QuestionDialog/QuestionDialog";
import green from "@material-ui/core/es/colors/green";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Fade from "@material-ui/core/Fade/Fade";
import Add from "@material-ui/icons/Add"

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
    },
    typography: {
        useNextVariants: true,
    },
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

        const AddQ = "Add a new question";

        return (
            <>
                <MuiThemeProvider theme={theme}>
                    <Tooltip TransitionComponent={Fade} disableFocusListener disableTouchListener title={AddQ}>
                        <Button onClick={this.handleClickOpen}
                                color="primary"
                                variant="fab"
                                style={{float:"right"}}
                                >
                            <Add/>
                        </Button>
                    </Tooltip>
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
