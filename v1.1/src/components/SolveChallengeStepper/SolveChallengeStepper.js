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
        questions: []
    };


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

    handleNext = () => {

        this.setState(state => {
            const correctAnswer = this.props.questions[state.activeStep].correctOption;
            console.log('correct option', correctAnswer);
            const selectedAnswer = state.selectedOption;
            const questionScore = (correctAnswer === selectedAnswer) ? 1 : 0;

            const updatedQuestion = {
                ...this.props.questions[state.activeStep],
                score: questionScore,
                selectedAnswer: selectedAnswer
            };

            const updatedQuestions = [...this.state.questions];
            updatedQuestions.push(updatedQuestion);

            return {
                activeStep: state.activeStep + 1,
                score: state.score + questionScore,
                selectedOption: null,
                questions: updatedQuestions
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
                                            <SolveQuestionOptions
                                                options={this.getStepContent(index)}
                                                selectedOption={this.state.selectedOption}
                                                optionChanged={this.handleChange}
                                            />
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.state.activeStep === steps.length - 1 ? this.handleFinish : this.handleNext}
                                            >
                                                {this.state.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                            </Button>
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