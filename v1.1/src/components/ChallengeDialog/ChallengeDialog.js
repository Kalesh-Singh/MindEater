import React, {Component} from 'react';
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Button from "@material-ui/core/Button/Button";
import classes from "./ChallengeDialog.module.css";
import AddQuestion from "../AddQuestion/AddQuestion";
import List from "@material-ui/core/List/List";
import TextField from "@material-ui/core/TextField/TextField";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Typography from "@material-ui/core/Typography/Typography";
import Dialog from "@material-ui/core/Dialog/Dialog";
import Slide from "@material-ui/core/Slide/Slide";
import fire from "../../fire";
import EditQuestionListItem from "../EditQuestionListItem/EditQuestionListItem";
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormLabel from "@material-ui/core/FormLabel/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import CloseEditChallenge from "../CloseEditChallenge/CloseEditChallenge";
import saveChallengeImageURL from "../../webscraper";
import SavingModal from "../SavingModal/SavingModal";

import SaveIcon from "@material-ui/icons/Save"
import HelpIc from "@material-ui/icons/HelpOutline";
import InfoIc from "@material-ui/icons/InfoOutlined"
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Fade from '@material-ui/core/Fade';
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import green from "@material-ui/core/es/colors/green";

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class ChallengeDialog extends Component {

    initialState = {
        saving: false,
        challengeId: null,
        questions: [],
        isPartial: true,
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

    state = {
        saving: false,
        challengeId: null,
        isPartial: true,
        questions: [],
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
        },
        open: false,
    };

    handleSave = () => {
        this.writeChallenge()
            .then(() => {
                this.setState({saving: false});
                this.props.closed();
            });
    };

    deleteChallenge = () => {
        console.log('Delete challenge called !!!!');
        // Delete the challenge questions
        for (let question of this.state.questions) {
            fire.database().ref('/questions/' + question.id)
                .remove()
                .then(() => {
                    console.log('Challenge question deleted')
                })
                .catch(error => {
                    alert(error.message)
                });
        }
        // Delete the challenge itself
        fire.database().ref('/challenges/' + this.state.challengeId)
            .remove()
            .then(() => {
                console.log('Challenge deleted')
            })
            .catch(error => {
                alert(error.message)
            });
        // Delete the challenge image
        fire.database().ref('/challengeImages/' + this.state.challengeId)
            .remove()
            .then(() => {
                console.log('Challenge image deleted')
            })
            .catch(error => {
                alert(error.message)
            });
        // Delete challenge from the user's list of challenges
        const user = fire.auth().currentUser;
        fire.database().ref('/users/' + user.uid + '/challenges/' + this.state.challengeId)
            .remove()
            .then(() => {
                console.log('Challenge removed from list of user challenges');
            })
            .catch(error => {
                alert(error.message)
            });
    };

    writeChallenge = () => {
        // Write the challenge title, description and isPartial,
        // since the questions are already in the database by now.
        const updates = {};
        updates['/challenges/' + this.state.challengeId + '/title'] = this.state.title.value;
        updates['/challenges/' + this.state.challengeId + '/description'] = this.state.description.value;
        updates['/challenges/' + this.state.challengeId + '/isPartial'] = false;

        this.setState({saving: true});
        return saveChallengeImageURL(this.state.challengeId, this.state.title.value)
            .then(() => (fire.database().ref().update(updates)));
    };

    writePartialChallenge = () => {
        // Write the challenge title, description and isPartial,
        // since the questions are already in the database by now.
        const user = fire.auth().currentUser;
        const updates = {};
        updates['/challenges/' + this.state.challengeId + '/title'] = this.state.title.value;
        updates['/challenges/' + this.state.challengeId + '/description'] = this.state.description.value;
        updates['/challenges/' + this.state.challengeId + '/owner'] = user.uid;
        updates['/users/' + user.uid + '/challenges/' + this.state.challengeId] = true;

        fire.database().ref().update(updates)
            .then(() => {
                console.log('The partial challenge was saved in the database.')
            })
            .catch(error => {
                alert(error.message)
            });
    };

    checkFormValidity = () => {
        let validForm = true;
        const form = {...this.state};
        for (let element in form) {
            if (element === 'questions' && element !== 'open') {
                validForm = validForm && form[element].length !== 0;
            } else if (element !== 'open' && element !== 'challengeId'
                && element !== 'isPartial' && element !== 'saving') {
                validForm = validForm && form[element].valid;
            }
        }
        return validForm;
    };

    setListeners = (challengeId) => {
        fire.database().ref('/challenges/' + challengeId + '/questions')
            .on('child_added', questionId => {
                fire.database().ref('/questions/' + questionId.val()).once('value')
                    .then(snapshot => {
                        const updatedQuestions = [...this.state.questions];
                        const question = snapshot.val();
                        question.id = questionId.val();
                        question.key = questionId.key;
                        updatedQuestions.push(question);
                        console.log('Updated Questions', updatedQuestions);
                        this.setState({questions: updatedQuestions});
                    })
                    .catch(error => {
                        alert(error.message);
                    });
            });

        fire.database().ref('/challenges/' + challengeId + '/questions')
            .on('child_removed', snapshot => {
                const questionKey = snapshot.key;
                const updatedQuestions = this.state.questions
                    .filter(question => (question.key !== questionKey));
                this.setState({questions: updatedQuestions})
            });

        fire.database().ref('/questions/')
            .on('child_changed', snapshot => {
                if (snapshot.val().challenge === challengeId) {
                    const questionId = snapshot.key;
                    const updatedQuestions = [...this.state.questions];
                    const oldQuestionIndex = updatedQuestions
                        .findIndex((question) => (question.id === questionId));
                    const oldQuestion = {...updatedQuestions[oldQuestionIndex]};
                    const updatedQuestion = snapshot.val();
                    updatedQuestion.id = questionId;
                    updatedQuestion.key = oldQuestion.key;
                    updatedQuestions[oldQuestionIndex] = updatedQuestion;
                    this.setState({questions: updatedQuestions});
                }
            });
    };

    initializeStateFromProps = () => {
        const propsState = {
            challengeId: this.props.challenge.id,
            questions: [...this.props.challenge.questions],
            isPartial: this.props.challenge.isPartial,
            title: {
                value: this.props.challenge.title,
                error: '',
                focused: false,
                valid: true
            },
            description: {
                value: this.props.challenge.description,
                error: '',
                focused: false,
                valid: true
            }
        };
        this.setState(propsState);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Get ID for the new challenge.
        if (prevProps.open === false && this.props.open === true) {
            if (!this.props.challenge) {
                this.setState(this.initialState);
                // Also initialize the challenge isPartial to true.
                fire.database().ref().child('challenges').push(
                    {
                        title: '',
                        description: '',
                        isPartial: true,
                        owner: fire.auth().currentUser.uid,
                        timesCompleted: 0
                    })
                    .then(response => {
                        console.log('Challenge Id' + response.key);
                        this.setListeners(response.key);
                        this.setState({challengeId: response.key});

                        const user = fire.auth().currentUser;
                        const updates = {};
                        updates['/users/' + user.uid + '/challenges/' + response.key] = true;

                        fire.database().ref().update(updates)
                            .then(() => {
                                console.log('Added the challenge id to the users list of challenges');
                            })
                            .catch(error => {
                                alert(error.message)
                            });
                    });
            } else {
                this.initializeStateFromProps();
                this.setListeners(this.props.challenge.id)
            }
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

    getQuestionsError = () => {
        if (this.state.questions.length === 0) {
            return 'You must add at least 1 question to the challenge';
        } else {
            return '';        // No error
        }
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

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {

        const questionsError = this.getQuestionsError();

        const validForm = this.checkFormValidity();

        const questionItems = this.state.questions.map((question, index) => (
            <EditQuestionListItem
                key={question.key}
                question={question}
                index={index + 1}
                wasSaved
            />
        ));

        const NeedHelp = "Not sure what to do? \n Click here for more help";
        const SaveProgress = "Save Challenge";

        return (
            <>
                <Dialog
                    fullScreen
                    open={this.props.open}
                    onClose={this.props.closed}
                    TransitionComponent={Transition}
                >
                    <AppBar style={{position: 'relative'}}>
                        <Toolbar style={{background: "#2096F3"}}>
                            <CloseEditChallenge
                                challengeValid={validForm}
                                challengePartial={this.state.isPartial}
                                closeChallengeDialog={this.props.closed}
                                deleteChallenge={this.deleteChallenge}
                                saveChallenge={this.writeChallenge}
                            />
                            <Typography variant="h6" color="inherit" style={{flex: '1', textAlign: "center"}}>
                                New Challenge
                            </Typography>
                            <Tooltip TransitionComponent={Fade} TransitionProps={{timeout: 300}} disableFocusListener
                                     title={SaveProgress}>
                                <Button
                                    className={classes.bouton}
                                    color="inherit"
                                    onClick={this.handleSave}
                                    disabled={!validForm}
                                ><SaveIcon style={{marginRight: '4px'}}/>Save
                                </Button>
                            </Tooltip>
                        </Toolbar>
                    </AppBar>

                    <DialogContent className={classes.root}>
                        <h3 style={{marginTop: "50px"}}>Input the title of Your challenge:</h3>
                        <TextField
                            label="Title"
                            multiline
                            rowsMax="4"
                            //margin="normal"
                            fullWidth
                            error={this.state.title.error.length > 0}
                            helperText={this.state.title.error}
                            value={this.state.title.value}
                            onChange={this.handleFieldChange('title')}
                            onFocus={this.handleFieldFocus('title')}
                        />
                        <h3 style={{marginTop: "30px"}}>Write a short description of the content of your Challenge:</h3>
                        <TextField
                            label="Description"
                            multiline
                            rowsMax="4"
                            style={{marginBottom: "15px"}}
                            fullWidth
                            error={this.state.description.error.length > 0}
                            helperText={this.state.description.error}
                            value={this.state.description.value}
                            onChange={this.handleFieldChange('description')}
                            onFocus={this.handleFieldFocus('description')}
                        />
                        <FormControl
                            error={questionsError.length > 0}
                            style={{width: '100%'}}
                        >
                            <FormLabel component="label">Questions</FormLabel>
                            {(questionsError.length > 0) ? <FormHelperText>{questionsError}</FormHelperText> : null}
                        </FormControl>
                        <List>
                            {questionItems}
                        </List>
                        <AddQuestion
                            challengeId={this.state.challengeId}
                            savePartial={this.writePartialChallenge}
                        />

                        <div>
                            <MuiThemeProvider theme={theme}>
                                <Tooltip TransitionComponent={Fade} TransitionProps={{timeout: 300}}
                                         disableFocusListener
                                         placement={"right"} title={NeedHelp}>
                                    <Button
                                        color={"primary"}
                                        variant={"raised"}
                                        style={{
                                            margin: 0,
                                            top: 'auto',
                                            right: 'auto',
                                            bottom: 20,
                                            left: 20,
                                            position: 'fixed', zIndex: "1"
                                        }}
                                        onClick={this.handleClickOpen}>
                                        <HelpIc style={{color: "white"}}/>
                                    </Button>
                                </Tooltip>
                            </MuiThemeProvider>
                            <Dialog
                                open={this.state.open}
                                onClose={this.handleClose}
                                aria-labelledby="form-dialog-title"
                                TransitionComponent={Transition}
                            >
                                <DialogTitle id="form-dialog-title"><InfoIc
                                    style={{marginRight: "10px", color: "blue"}}/>Description</DialogTitle>
                                <DialogContent>
                                    <DialogContentText style={{color: "black"}}>
                                        In order to create a valid question, you must fill out the required fields, this
                                        includes the Title of the Challenge;
                                        the Description is optional. After that, you must create at least one question
                                        for
                                        the challenge. Once that is completed you are
                                        all done! You can then later add more questions to your challenge if you desire.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClose} color="primary" className={classes.bouton}>
                                        Got it!
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>

                    </DialogContent>
                </Dialog>
                <SavingModal open={this.state.saving}/>
            </>
        );
    }
}

export default ChallengeDialog;