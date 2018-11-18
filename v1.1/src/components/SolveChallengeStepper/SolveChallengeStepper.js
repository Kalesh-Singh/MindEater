import React, {Component} from 'react';
import Stepper from "@material-ui/core/Stepper/Stepper";
import Step from "@material-ui/core/Step/Step";
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import StepContent from "@material-ui/core/StepContent/StepContent";
import Button from "@material-ui/core/Button/Button";
import SolveQuestionOptions from "../SolveQuestionOptions/SolveQuestionOptions";
import Dialog from "@material-ui/core/Dialog/Dialog";
import Slide from "@material-ui/core/Slide/Slide";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import SolveChallengeSummary from "../SolveChallengeSummary/SolveChallengeSummary";
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography/Typography";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classes from "./SolveChallengeStepper.module.css";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core";
import ThinkingIcon from "../../assets/svg/QuestionIcons/ThinkingIcon";
import SadIcon from "../../assets/svg/QuestionIcons/SadIcon";
import HappyIcon from "../../assets/svg/QuestionIcons/HappyIcon";
import Correct from "./Correct/Correct";
import Wrong from "./Wrong/Wrong";
import Puzzled from "./Puzzled/Puzzled";
import Paper from "@material-ui/core/Paper/Paper";
import grey from "@material-ui/core/es/colors/grey";

const theme = createMuiTheme({
    completed: {
        display: "inline-block"
    },
    icon: {
        color: "green !important"
    }
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class SolveChallengeStepper extends Component {

    // Expected props:
    // 1. open                  (bool)
    // 2. closed                (func)
    // 3. questions             (Array)
    // 4. challengeTitle        (string)
    // 5. challengeDescription  (string)

    state = {
        open: false,
        score: 0,
        activeStep: 0,
        selectedOption: null,
        timesAttempted: 0,
        finished: false,
        questions: [],
        icon: 'THINKING'
    };

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.questions !== this.props.questions || prevProps.open !== this.props.open) {
            console.log('Questions did update - Stepper');
            const updatedQuestions = [...this.props.questions];
            if (!prevProps.open && this.props.open) {
                this.setState({
                    open: false,
                    score: 0,
                    activeStep: 0,
                    selectedOption: null,
                    timesAttempted: 0,
                    finished: false,
                    questions: updatedQuestions,
                    icon: 'THINKING'
                })
            } else {
                this.setState({questions: updatedQuestions});
            }
        }

    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleChange = event => {
        this.setState({selectedOption: event.target.value});
    };

    getSteps = () => {
        return this.props.questions.map(question => (question.question));
    };

    getStepContent = (step) => {
        return this.props.questions[step].options;
    };

    handleSolve = () => {
        this.setState(state => {
            const correctAnswer = state.questions[state.activeStep].correctOption;
            console.log('correct option', correctAnswer);
            const selectedAnswer = state.selectedOption;
            const questionScore = (correctAnswer === selectedAnswer) ? 2 - state.timesAttempted : 0;

            const updatedQuestion = {
                ...state.questions[state.activeStep],
                score: questionScore,
                selectedAnswer: selectedAnswer,
            };

            const updatedQuestions = [...state.questions];
            updatedQuestions[state.activeStep] = updatedQuestion;

            const finished = state.timesAttempted === 1 || correctAnswer === selectedAnswer;
            const icon = (correctAnswer === state.selectedOption) ? "HAPPY" : "SAD";

            return {
                score: state.score + questionScore,
                selectedOption: null,
                timesAttempted: state.timesAttempted + 1,
                finished: finished,
                questions: updatedQuestions,
                icon: icon
            }
        });
    };

    handleNext = () => {
        this.setState(state => {
            return {
                activeStep: state.activeStep + 1,
                selectedOption: null,
                timesAttempted: 0,
                finished: false,
                icon: "THINKING"
            }
        });
    };

    handleFinish = () => {
        this.handleNext();
        this.handleClickOpen();
    };

    render() {

        const steps = this.getSteps();

        let feedback = null;

        switch (this.state.icon) {
            case "HAPPY":
                feedback = <Paper className={classes.ContentCol} elevation={15}
                                  style={{background: "#4CAF50", marginRight: "auto"}}><HappyIcon/><Correct/></Paper>;
                break;
            case "SAD":
                feedback = <Paper className={classes.ContentCol} elevation={15}
                                  style={{background: "#d60000", marginRight: "auto"}}><SadIcon/><Wrong/></Paper>;
                break;
            case "THINKING":
                feedback = <Paper className={classes.ContentCol} elevation={15}
                                  style={{background: "#2096F3", marginRight: "auto"}}><ThinkingIcon/><Puzzled/></Paper>;
                break;
            default:
                feedback = <Paper className={classes.ContentCol} elevation={15}
                                  style={{background: "#2096F3", marginRight: "auto"}}><ThinkingIcon/><Puzzled/></Paper>;
        }

        return (
            <>
                <Dialog
                    fullScreen
                    open={this.props.open}
                    onClose={this.props.closed}
                    TransitionComponent={Transition}
                >
                    <DialogTitle id="solve-question-dialog-title">{this.props.challengeTitle}</DialogTitle>

                    <DialogContent>
                        <DialogContentText id="solve-question-dialog-description" style={{alignItems: "center"}}>
                            {this.props.challengeDescription}
                        </DialogContentText>
                        <MuiThemeProvider theme={theme}>
                            <Stepper activeStep={this.state.activeStep} orientation="vertical">
                                {steps.map((label, index) => {
                                    return (
                                        <Step key={index}
                                            className={index === this.state.activeStep
                                                ? classes.stepperActive
                                                : (index < this.state.activeStep)
                                                    ?
                                                    classes.stepperCompleted
                                                    : classes.stepperDisabled}
                                        >
                                            <StepLabel
                                                StepIconProps={{ classes: { root: this.props.icon } }}>
                                                {label}</StepLabel>
                                            <StepContent>
                                                <div className={classes.ContentRow}>
                                                    {/* TODO: Style with flex box */}
                                                    <div>
                                                        {this.state.timesAttempted === 1 && !this.state.finished ?
                                                            <ExpansionPanel>
                                                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                                    <Typography variant="h7" component="h3" style={{color: '#D50000'}}>Show
                                                                        hint</Typography>
                                                                </ExpansionPanelSummary>
                                                                <ExpansionPanelDetails>
                                                                    <Typography>
                                                                        {this.props.questions[index].hint}
                                                                    </Typography>
                                                                </ExpansionPanelDetails>
                                                            </ExpansionPanel> : null
                                                        }
                                                        <SolveQuestionOptions
                                                            options={this.getStepContent(index)}
                                                            selectedOption={this.state.selectedOption}
                                                            optionChanged={this.handleChange}
                                                            disabled={this.state.finished}
                                                        />
                                                        {this.state.finished ?
                                                            <ExpansionPanel>
                                                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                                    <Typography variant="h7" component="h3" style={{color: '#469c4a'}}>See
                                                                        Explanation</Typography>
                                                                </ExpansionPanelSummary>
                                                                <ExpansionPanelDetails>
                                                                    <Typography>
                                                                        {this.props.questions[index].explanation}
                                                                    </Typography>
                                                                </ExpansionPanelDetails>
                                                            </ExpansionPanel> : null
                                                        }
                                                        <div className={classes.Buttons}>
                                                            <Button
                                                                style={{marginRight: '10px'}}
                                                                className={classes.Submit}
                                                                variant="raised"
                                                                color="primary"
                                                                disabled={!this.state.selectedOption}
                                                                onClick={this.handleSolve}
                                                            >
                                                                Submit
                                                            </Button>

                                                            <Button
                                                                className={classes.Next}
                                                                variant="raised"
                                                                color="primary"
                                                                disabled={!this.state.finished}
                                                                onClick={this.state.activeStep === steps.length - 1 ? this.handleFinish : this.handleNext}
                                                            >
                                                                {this.state.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className={classes.ContentCol}>
                                                        {feedback}
                                                    </div>
                                                </div>
                                            </StepContent>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                        </MuiThemeProvider>
                    </DialogContent>
                </Dialog>
                <SolveChallengeSummary
                    open={this.state.open}
                    closed={this.handleClose}
                    closeStepper={this.props.closed}
                    questions={this.state.questions}
                    score={this.state.score}
                />
            </>
        );
    }
}

export default SolveChallengeStepper;