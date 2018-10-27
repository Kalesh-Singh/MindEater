import React, {Component} from 'react';
import {Button} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import withMobileDialog from "@material-ui/core/es/withMobileDialog/withMobileDialog";

import classes from './CreateQuestionDialog.module.css';
import TextField from "@material-ui/core/TextField/TextField";
import Options from "./Options/Options";
import fire from "../../fire";

class CreateQuestionDialog extends Component {

    state = {
        questionId: null,
        open: false,
        optionsValue: null,
        correctOption: null,
        question: {
            value: '',
            error: '',
            focused: false,
            valid: false
        },
        hint: {
            value: '',
            error: '',
            focused: false,
            valid: false
        },
        explanation: {
            value: '',
            error: '',
            focused: false,
            valid: false
        },

        options: {
            value: [
                {
                    value: '',
                    error: '',
                    focused: false,
                    valid: false
                },
                {
                    value: '',
                    error: '',
                    focused: false,
                    valid: false
                },
                {
                    value: '',
                    error: '',
                    focused: false,
                    valid: false
                },
                {
                    value: '',
                    error: '',
                    focused: false,
                    valid: false
                }
            ],
            error: '',
            valid: false
        }
    };

    checkFormValidity = () => {
        let validForm = true;
        const form = {...this.state};
        for (let element in form) {
            if (element !== 'questionId' && element !== 'open'
                && element !== 'optionsValue' && element !== 'correctOption') {
                console.log(element + ' : ' + form[element].valid);
                validForm = validForm && form[element].valid;
            }
        }
        return validForm;
    };

    writeQuestion = () => {
        const options = this.state.options.value.map((option) => (option.value));
        const questionData = {
            question: this.state.question.value,
            challenge: this.props.challengeId,
            options: options,
            correctOption: this.state.correctOption
        };

        // Get the questions list of the challenge
        fire.database().ref('/challenges/' + this.props.challengeId + '/questions')
            .once('value')
            .then((snapshot) => {
                const questions = snapshot.val() || [];
                questions.push(this.state.questionId);

                // Write to challenges and questions simultaneously
                const updates = {};
                updates['/questions/' + this.state.questionId] = questionData;
                updates['/challenges/' + this.props.challengeId + '/questions'] = questions;

                fire.database().ref().update(updates)
                    .then(() => {
                        console.log('Question was added to firebase');
                    })
                    .catch((error) => {
                        alert(error.message);
                    });
            })
            .catch(error => {
                alert(error.message);
            });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Get ID for the new question.
        if (prevState.open === false && this.state.open === true) {
            fire.database().ref().child('questions').push()
                .then(response => {
                    console.log('Question Id' + response.key);
                    this.setState({questionId: response.key});
                });
        }
    }

    checkValidity = (name, element) => {
        switch (name) {
            case 'question':
                return this.checkQuestion(element);
            case 'hint':
                return this.checkHint(element);
            case 'explanation':
                return this.checkExplanation(element);
            default:
                return '';
        }
    };

    checkExplanation = (explanation) => {
        if (explanation.value.length === 0 && explanation.focused) {
            return '* Required';
        } else if (explanation.value.length > 300) {
            return 'Cannot be longer than 300 characters';
        } else {
            return '';      // No error
        }
    };

    checkHint = (hint) => {
        if (hint.value.length === 0 && hint.focused) {
            return '* Required';
        } else if (hint.value.length > 100) {
            return 'Cannot be longer than 100 characters';
        } else {
            return '';      // No error
        }
    };

    checkQuestion = (question) => {
        if (question.value.length === 0 && question.focused) {
            return '* Required';
        } else if (question.value.length > 300) {
            return 'Cannot be longer than 300 characters';
        } else {
            return '';      // No error
        }
    };

    getCheckedOptions = (options, correctOption) => {
        const updatedOptions = {...options};

        let updatedOptionsValid = true;
        const updatedOptionsValue = [];
        for (let option of updatedOptions.value) {
            const updatedOption = {...option};
            updatedOption.error = this.checkOption(updatedOption);
            updatedOption.valid = updatedOption.error.length === 0;
            updatedOptionsValid = updatedOptionsValid && updatedOption.valid;
            updatedOptionsValue.push(updatedOption);
        }
        updatedOptions.error = this.checkCorrectOption(correctOption);
        updatedOptionsValid = updatedOptionsValid && updatedOptions.error.length === 0;

        updatedOptions.value = updatedOptionsValue;
        updatedOptions.valid = updatedOptionsValid;

        return updatedOptions;
    };

    checkOption = (option) => {
        if (option.value.length === 0 && option.focused) {
            return '* Required';
        } else if (option.value.length > 15) {
            return 'Cannot be longer than 15 characters';
        } else {
            return '';      // No error
        }
    };

    checkCorrectOption = (correctOption) => {
        if (correctOption === null) {
            return 'You must check the correct option';
        } else {
            return '';
        }
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleChange = event => {
        const updatedOptions = {...this.state.options};
        updatedOptions.error = '';
        const checkedOptions = this.getCheckedOptions(updatedOptions, event.target.value);
        this.setState({options: checkedOptions, optionsValue: event.target.value, correctOption: event.target.value})
    };

    handleFieldChange = name => event => {
        const updatedField = {...this.state[name]};
        updatedField.value = event.target.value;
        updatedField.error = this.checkValidity(name, updatedField);
        updatedField.valid = updatedField.error.length === 0;
        this.setState({[name]: updatedField});
    };

    handleOptionChange = index => event => {
        const updatedOptions = {...this.state.options};
        const updatedOption = updatedOptions.value[index];
        updatedOption.value = event.target.value.trim();
        updatedOptions.value[index] = updatedOption;
        const checkedOptions = this.getCheckedOptions(updatedOptions, this.state.correctOption);
        this.setState({options: checkedOptions});
    };

    handleFieldFocus = name => () => {
        const updatedField = {...this.state[name]};
        if (!updatedField.focused) {
            updatedField.focused = true;
            updatedField.error = this.checkValidity(name, updatedField);
            this.setState({[name]: updatedField});
        }
    };

    handleOptionFocus = index => () => {
        const updatedOptions = {...this.state.options};
        const updatedOption = updatedOptions.value[index];
        if (!updatedOption.focused) {
            updatedOption.focused = true;
            updatedOptions.value[index] = updatedOption;
            const checkedOptions = this.getCheckedOptions(updatedOptions, this.state.correctOption);
            this.setState({options: checkedOptions});
        }
    };

    handleSave = (event) => {
        event.preventDefault();
        this.writeQuestion();
        this.handleClose();
    };

    handleCancel = (event) => {
        event.preventDefault();
        this.handleClose();
    };

    render() {
        const validForm = this.checkFormValidity();
        console.log('Valid form', validForm);
        console.log('State', this.state);

        const {fullScreen} = this.props;
        return (
            <div>
                <Button
                    onClick={this.handleClickOpen}
                >
                    Add Question
                </Button>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="create-question-dialog-title"
                >
                    <DialogTitle id="create-question-dialog-title">Question</DialogTitle>
                    <DialogContent className={classes.root}>
                        <form className={classes.Form}>
                            <TextField
                                label="Question"
                                multiline
                                rowsMax="4"
                                margin="normal"
                                fullWidth
                                error={this.state.question.error.length > 0}
                                helperText={this.state.question.error}
                                value={this.state.question.value}
                                onChange={this.handleFieldChange('question')}
                                onFocus={this.handleFieldFocus('question')}
                            />
                            <Options
                                options={this.state.options}
                                optionChanged={this.handleOptionChange}
                                optionFocused={this.handleOptionFocus}
                                value={this.state.optionsValue}
                                changed={this.handleChange}
                            />
                            <TextField
                                label="Hint"
                                multiline
                                rowsMax="4"
                                margin="normal"
                                fullWidth
                                error={this.state.hint.error.length > 0}
                                helperText={this.state.hint.error}
                                value={this.state.hint.value}
                                onChange={this.handleFieldChange('hint')}
                                onFocus={this.handleFieldFocus('hint')}
                            />
                            <TextField
                                label="Explanation"
                                multiline
                                rowsMax="4"
                                margin="normal"
                                fullWidth
                                error={this.state.explanation.error.length > 0}
                                helperText={this.state.explanation.error}
                                value={this.state.explanation.value}
                                onChange={this.handleFieldChange('explanation')}
                                onFocus={this.handleFieldFocus('explanation')}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={this.handleCancel}
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.handleSave}
                            disabled={!validForm}
                            color="primary" autoFocus
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withMobileDialog('xs')(CreateQuestionDialog);