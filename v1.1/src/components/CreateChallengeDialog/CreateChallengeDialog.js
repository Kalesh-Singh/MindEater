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
        challengeId: null,
        questions: [],
        questionIds: [],
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

    checkFormValidity = () => {
        let validForm = true;
        const form = {...this.state};
        for (let element in form) {
            if (element === 'questions') {
                validForm = validForm && form[element].length !== 0;
            } else if (element !== 'open' && element !== 'challengeId') {
                validForm = validForm && form[element].valid;
            }
        }
        return validForm;
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Get ID for the new challenge.
        if (prevState.open === false && this.state.open === true) {
            fire.database().ref().child('challenges').push()
                .then(response => {
                    console.log('Challenge Id' + response.key);

                    fire.database().ref('/challenges/' + response.key + '/questions')
                        .on('value', snapshot => {
                            const questionIds = snapshot.val() || [];

                            console.log('Question IDs', questionIds);

                            this.setState({challengeId: response.key, questionIds: questionIds});
                        });
                });
        }

        // Get the new question
        if (prevState.questionIds.length !== this.state.questionIds.length) {
            const questionId = this.state.questionIds[this.state.questionIds.length - 1];
            console.log('New Question ID', questionId);

            const updatedQuestions = [...this.state.questions];

            fire.database().ref('questions/' + questionId).once('value')
                .then(snapshot => {
                    const question = snapshot.val();
                    question.id = questionId;
                    updatedQuestions.push(question);
                    this.setState({questions: updatedQuestions});
                })
                .catch(error => {
                    alert(error.message);
                });
        }
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

    render() {
        const validForm = this.checkFormValidity();
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
                                onClick={this.handleClose}>
                                Save
                            </Button>
                        </Toolbar>
                    </AppBar>

                    <DialogContent className={classes.root}>
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
                        <CreateQuestionDialog
                            challengeId={this.state.challengeId}
                        />
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default CreateChallengeDialog;