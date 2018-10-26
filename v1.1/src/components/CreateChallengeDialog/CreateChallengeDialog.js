import React, {Component} from 'react';
import fire from '../../fire';
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Typography from "@material-ui/core/Typography/Typography";
import Slide from "@material-ui/core/Slide/Slide";
import CloseIcon from '@material-ui/icons/Close';
import CreateQuestionDialog from "../CreateQuestionDialog/CreateQuestionDialog";
import TextField from "@material-ui/core/TextField/TextField";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";

import classes from "./CreateChallengeDialog.module.css";

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class CreateChallengeDialog extends Component {

    state = {
        open: false,
        hasQuestion: false,
        challengeId: null,
        title: {
            value: '',
            error: '',
            focused: false,
            valid: false
        },
        description: {
            value: '',
            error: '',
            focused: false,
            valid: true
        }
    };

    componentDidMount() {
        // Get a key for the new challenge.
      fire.database().ref().child('challenges').push()
            .then(response => {
                console.log('Challenge Id' + response.key);
                this.setState({challengeId: response.key});
            });
    }

    checkValidity = (name, element) => {
        switch (name) {
            case 'title':
                return this.checkTitle(element);
            case 'description':
                return this.checkDescription(element);
            default:
                return '';
        }
    };

    checkTitle = (title) => {
        if (title.value.length === 0 && title.focused) {
            return '* Required';
        } else if (title.value.length > 50) {
            return 'Cannot be longer than 50 characters';
        } else {
            return '';      // No error
        }
    };

    checkDescription = (description) => {
        if (description.value.length > 200) {
            return 'Cannot be longer than 200 characters';
        } else {
            return '';      // No error
        }
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleFieldChange = name => event => {
        const updatedField = {...this.state[name]};
        updatedField.value = event.target.value;
        updatedField.error = this.checkValidity(name, updatedField);
        updatedField.valid = updatedField.error.length === 0;
        this.setState({[name]: updatedField});
    };

    handleFieldFocus = name => () => {
        const updatedField = {...this.state[name]};
        if (!updatedField.focused) {
            updatedField.focused = true;
            updatedField.error = this.checkValidity(name, updatedField);
            this.setState({[name]: updatedField});
        }
    };

    writeChallenge = (challengeId) => {

    };

    writeQuestion = (questionId) => {

    };

    render() {
        return (
            <div>
                <Button onClick={this.handleClickOpen}>New Challenge</Button>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar style={{position: 'relative'}}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography variant="h6" color="inherit" style={{flex: '1'}}>
                                New Challenge
                            </Typography>
                            <Button
                                color="inherit"
                                disabled={!this.state.hasQuestion}
                                onClick={this.handleClose}>
                                Save
                            </Button>
                        </Toolbar>
                    </AppBar>

                    <DialogContent className={classes.root}>
                        <form>
                            <TextField
                                label="Title"
                                multiline
                                rowsMax="4"
                                margin="normal"
                                fullWidth
                                error={this.state.title.error.length > 0}
                                helperText={this.state.title.error}
                                value={this.state.title.value}
                                onChange={this.handleFieldChange('title')}
                                onFocus={this.handleFieldFocus('title')}
                            />
                            <TextField
                                label="Description"
                                multiline
                                rowsMax="4"
                                margin="normal"
                                fullWidth
                                error={this.state.description.error.length > 0}
                                helperText={this.state.description.error}
                                value={this.state.description.value}
                                onChange={this.handleFieldChange('description')}
                                onFocus={this.handleFieldFocus('description')}
                            />
                            <h4>Questions</h4>
                            <CreateQuestionDialog disabled={!this.state.hasQuestion}/>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default CreateChallengeDialog;