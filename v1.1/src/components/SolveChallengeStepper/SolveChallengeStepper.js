import React, {Component} from 'react';
import Stepper from "@material-ui/core/Stepper/Stepper";
import Step from "@material-ui/core/Step/Step";
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import StepContent from "@material-ui/core/StepContent/StepContent";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import SolveQuestionOptions from "../SolveQuestionOptions/SolveQuestionOptions";


class SolveChallengeStepper extends Component {

    // Expected props:
    // questions[]

    state = {
        activeStep: 0,
    };

    getSteps = () => {
        return ['What is the answer for q1?', 'What is the answer for q2?', 'What is the answer for q3?'];
    };

    getStepContent = (step) => {
        // TODO: return questions[step]
        switch (step) {
            case 0:
                return `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`;
            case 1:
                return 'An ad group contains one or more ads which target a shared set of keywords.';
            case 2:
                return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
            default:
                return 'Unknown step';
        }
    };

    handleNext = () => {
        this.setState(state => ({activeStep: state.activeStep + 1}));
    };

    render() {

        const steps = this.getSteps();

        return (
            <Stepper activeStep={this.state.activeStep} orientation="vertical">
                {steps.map((label, index) => {
                    return (
                        <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                            <StepContent>
                                {/*<Typography>{this.getStepContent(index)}</Typography>*/}
                                <SolveQuestionOptions/>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleNext}
                                >
                                    {this.state.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </StepContent>
                        </Step>
                    );
                })}
            </Stepper>
        );
    }
}

export default SolveChallengeStepper;