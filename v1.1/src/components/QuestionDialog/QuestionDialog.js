import React, {Component} from 'react';
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import classes from "./QuestionDialog.module.css";
import TextField from "@material-ui/core/TextField/TextField";
import Options from "./Options/Options";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import fire from "../../fire";
import withMobileDialog from "@material-ui/core/es/withMobileDialog/withMobileDialog";
import Divider from "@material-ui/core/Divider/Divider";
import EditIcon from "@material-ui/icons/EditOutlined"
import Hint from "@material-ui/icons/NewReleasesOutlined"
import Description from "@material-ui/icons/DescriptionOutlined"
import Grid from "@material-ui/core/Grid/Grid";
import SaveIcon from "@material-ui/icons/SaveOutlined";
import CancelIcon from "@material-ui/icons/CloseOutlined"


class QuestionDialog extends Component {
    initialState = {
        questionId: null,
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

    state = {
        questionId: null,
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
        },
    };

    checkFormValidity = () => {
        let validForm = true;
        const form = {...this.state};
        for (let element in form) {
            if (element !== 'questionId' && element !== 'optionsValue'
                && element !== 'correctOption') {
                validForm = validForm && form[element].valid;
            }
        }
        return validForm;
    };

    writeQuestion = () => {
        const options = this.state.options.value.map((option) => (option.value));
        const user = fire.auth().currentUser;
        const questionData = {
            question: this.state.question.value,
            challenge: this.props.challengeId,
            options: options,
            correctOption: this.state.correctOption,
            hint: this.state.hint.value,
            explanation: this.state.explanation.value,
            owner: user.uid
        };

        // Write to challenges and questions simultaneously
        fire.database().ref('/questions/' + this.state.questionId)
            .update(questionData)
            .then(() => {
                console.log('Question was added to database');
            })
            .catch(error => {
                alert(error.message);
            });
        if (!this.props.question) {
            fire.database().ref('/challenges/' + this.props.challengeId + '/questions')
                .push(this.state.questionId)
                .then(() => {
                    console.log('Question ID added to challenge');
                })
                .catch(error => {
                    alert(error.message);
                })
        }
    };

    initializeStateFromProps = () => {
        const propsState = {
            questionId: this.props.question.id,
            optionsValue: this.props.question.correctOption,
            correctOption: this.props.question.correctOption,
            question: {
                value: this.props.question.question,
                error: '',
                focused: false,
                valid: true
            },
            hint: {
                value: this.props.question.hint,
                error: '',
                focused: false,
                valid: true
            },
            explanation: {
                value: this.props.question.explanation,
                error: '',
                focused: false,
                valid: true
            },

            options: {
                value: [
                    {
                        value: this.props.question.options[0],
                        error: '',
                        focused: false,
                        valid: true
                    },
                    {
                        value: this.props.question.options[1],
                        error: '',
                        focused: false,
                        valid: true
                    },
                    {
                        value: this.props.question.options[2],
                        error: '',
                        focused: false,
                        valid: true
                    },
                    {
                        value: this.props.question.options[3],
                        error: '',
                        focused: false,
                        valid: true
                    }
                ],
                error: '',
                valid: true
            }
        };
        this.setState(propsState);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Get ID for the new question.
        if (prevProps.open === false && this.props.open === true) {
            console.log('Component did update');
            if (!this.props.question) {
                this.setState(this.initialState);
                fire.database().ref().child('questions').push()
                    .then(response => {
                        console.log('Retrieved quesiton ID', response.key)
                        this.setState({questionId: response.key});
                    });
            } else {
                this.initializeStateFromProps();
            }
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
        const options = this.state.options.value.map(option => (option.value));
        if (correctOption === null || !options.includes(correctOption)) {
            if (!options.includes(correctOption)) {
                this.setState({correctOption: null, optionsValue: null})
            }
            return 'You must check the correct option';
        } else {
            return '';
        }
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
        updatedOption.value = event.target.value;
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
        if (!this.props.wasSaved) {
            this.props.savePartial();
        }
        this.props.closed();
    };

    handleCancel = (event) => {
        event.preventDefault();
        this.props.closed();
    };

    render() {
        const validForm = this.checkFormValidity();

        const {fullScreen} = this.props;

        return (
            <Dialog
                fullScreen={fullScreen}
                open={this.props.open}
                onClose={this.handleClose}
                aria-labelledby="create-question-dialog-title"
            >
                <DialogTitle id="create-question-dialog-title" style={{textAlign: "center"}}
                >New Question</DialogTitle>

                <DialogContent className={classes.root}>
                    <h3 style={{marginBottom: "2px"}}>Enter your question below:</h3>
                    <form className={classes.Form}>
                        <Grid container={true} spacing={8} alignItems="center">
                            <Grid item>
                                <EditIcon/>
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    className={classes.TextField}
                                    label="Question"
                                    multiline
                                    rowsMax="4"
                                    margin="normal"
                                    fullWidth
                                    variant={"outlined"}
                                    error={this.state.question.error.length > 0}
                                    helperText={this.state.question.error}
                                    value={this.state.question.value}
                                    onChange={this.handleFieldChange('question')}
                                    onFocus={this.handleFieldFocus('question')}
                                />
                            </Grid>
                        </Grid>
                        <h3 style={{textAlign: "center"}}>Input the multiple choices for your question:</h3>
                        <Options
                            options={this.state.options}
                            optionChanged={this.handleOptionChange}
                            optionFocused={this.handleOptionFocus}
                            value={this.state.optionsValue}
                            changed={this.handleChange}
                        />
                        <h5 style={{textAlign: "left"}}>Note: Make sure to check one option as the correct answer to
                            your question.</h5>

                        <Divider/>
                        <h3 style={{marginBottom: "5px"}}> Enter a hint, this will be used to help the user out while trying to solve this question:</h3>
                        <Grid container={true} spacing={8} alignItems="center">
                            <Grid item>
                                <Hint/>
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    className={classes.TextField}
                                    label="Hint"
                                    multiline
                                    rowsMax="4"
                                    margin="normal"
                                    fullWidth
                                    variant={"outlined"}
                                    error={this.state.hint.error.length > 0}
                                    helperText={this.state.hint.error}
                                    value={this.state.hint.value}
                                    onChange={this.handleFieldChange('hint')}
                                    onFocus={this.handleFieldFocus('hint')}
                                />
                            </Grid>
                        </Grid>
                        <h3>Give a brief explanation on the solution to your question:</h3>
                        <Grid container={true} spacing={8} alignItems="center">
                            <Grid item>
                                <Description/>
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    className={classes.TextField}
                                    label="Explanation"
                                    multiline
                                    rowsMax="4"
                                    margin="normal"
                                    fullWidth
                                    variant={"outlined"}
                                    error={this.state.explanation.error.length > 0}
                                    helperText={this.state.explanation.error}
                                    value={this.state.explanation.value}
                                    onChange={this.handleFieldChange('explanation')}
                                    onFocus={this.handleFieldFocus('explanation')}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={this.handleCancel}
                        color={"primary"}
                        className={classes.butonCancel}
                    ><CancelIcon style={{marginRight:"4px"}}/>Cancel
                    </Button>
                    <Button
                        onClick={this.handleSave}
                        disabled={!validForm}
                        color="primary" autoFocus
                        className={classes.butonSave}
                    ><SaveIcon style={{marginRight:"4px"}}/>Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withMobileDialog('xs')(QuestionDialog);
