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
        questions: []
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.questions !== this.props.questions) {
            console.log('Questions did update - Stepper');
            const updatedQuestions = [...this.props.questions];
            this.setState({questions: updatedQuestions})
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

            return {
                score: state.score + questionScore,
                selectedOption: null,
                timesAttempted: state.timesAttempted + 1,
                finished: finished,
                questions: updatedQuestions
            }
        });
    };

    handleNext = () => {

        this.setState(state => {
            return {
                activeStep: state.activeStep + 1,
                selectedOption: null,
                timesAttempted: 0,
                finished: false
            }
        });
    };

    handleFinish = () => {
        this.handleNext();
        this.handleClickOpen();
    };

    render() {

        const steps = this.getSteps();

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
                        <DialogContentText id="solve-question-dialog-description">
                            {this.props.challengeDescription}
                        </DialogContentText>
                        <Stepper activeStep={this.state.activeStep} orientation="vertical">
                            {steps.map((label, index) => {
                                return (
                                    <Step key={index}>
                                        <StepLabel>{label}</StepLabel>
                                        <StepContent>
                                            {this.state.timesAttempted === 1 && !this.state.finished ?
                                                <ExpansionPanel className={classes.Hint}>
                                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                        <Typography>Show hint</Typography>
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
                                                <ExpansionPanel className={classes.Explanation}>
                                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                                        <Typography>See Explanation</Typography>
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails>
                                                        <Typography>
                                                            {this.props.questions[index].explanation}
                                                        </Typography>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel> : null
                                            }
                                            <div>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    disabled={!this.state.selectedOption}
                                                    onClick={this.handleSolve}
                                                >
                                                    Solve
                                                </Button>

                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    disabled={!this.state.finished}
                                                    onClick={this.state.activeStep === steps.length - 1 ? this.handleFinish : this.handleNext}
                                                >
                                                    {this.state.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                </Button>
                                            </div>
                                        </StepContent>
                                    </Step>
                                );
                            })}
                        </Stepper>
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