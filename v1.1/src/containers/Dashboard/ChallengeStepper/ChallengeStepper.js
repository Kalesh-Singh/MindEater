import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import {autoPlay} from 'react-swipeable-views-utils';
import fire from "../../../fire";
import SolveChallengeStepper from "../../../components/SolveChallengeStepper/SolveChallengeStepper";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = theme => ({
    root: {
        maxWidth: 400,
        flexGrow: 1,
        marginTop: 20,
        boxShadow:"rgba(0, 0, 0, 0.2) 5px 10px 15px"
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing.unit * 4,
        backgroundColor: theme.palette.background.default,
    },
    img: {
        height: 255,
        display: 'block',
        maxWidth: 400,
        overflow: 'hidden',
        width: '100%',
        marginBottom: '-20px'
    },
});

class ChallengeStepper extends React.Component {
    state = {
        activeStep: -1,
        challenges: [],
        questions: [],
        open: false
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    getQuestions = (challengeId) => {
        console.log("GET QUESTIONS called");
        fire.database().ref('/challenges/' + challengeId + '/questions')
            .on('child_added', questionId => {
                console.log('Question child added!');
                fire.database().ref('/questions/' + questionId.val()).once('value')
                    .then(snapshot => {
                        const updatedQuestions = [...this.state.questions]
                            .filter(question => (question.challenge === challengeId));
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
    };

    getChallenges = () => {
        fire.database().ref('/challenges/')
            .once('value')
            .then(snapshot => {
                const updatedChallenges = [];
                const challengesObject = snapshot.val();

                fire.database().ref('/challengeImages/')
                    .once('value')
                    .then(imagesSnapshot => {
                        const imagesObject = imagesSnapshot.val();

                        fire.database().ref('/users/')
                            .once('value')
                            .then(usersSnapshot => {
                                const userObjects = usersSnapshot.val();

                                for (let challengeId in challengesObject) {
                                    const challenge = challengesObject[challengeId];
                                    challenge.id = challengeId;
                                    if (imagesObject) {
                                        challenge.imgURL = (imagesObject[challengeId]) ? imagesObject[challengeId].imgURL : null;
                                        const challengeOwner = challenge.owner;
                                        challenge.authorName = userObjects[challengeOwner].username;
                                    }
                                    if (!challenge.isPartial) {    // TODO: Check if owner is not this user
                                        updatedChallenges.push(challenge);
                                    }
                                }
                                updatedChallenges.sort((a, b) => (a.timesCompleted - b.timesCompleted));
                                this.setState({challenges: updatedChallenges, loading: false});
                            }).catch(error => {
                            alert(error.message)
                        });
                    });
            });
    };


    componentDidMount() {
        this.setState({loading: true, activeStep: 0});

        if (this.state.challenges.length === 0) {
            this.getChallenges();
        }

        if (this.state.challenges.length > 0) {
            this.getQuestions(this.state.challenges[this.state.activeStep].id);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.activeStep !== this.state.activeStep && !prevProps.open) {
            if (this.state.activeStep < this.state.challenges.length && this.state.activeStep >= 0) {
                this.getQuestions(this.state.challenges[this.state.activeStep].id);
            }
        }
        if (this.state.challenges.length !== prevState.challenges.length && this.state.questions.length === 0) {
            if (this.state.activeStep < this.state.challenges.length && this.state.activeStep >= 0) {
                this.getQuestions(this.state.challenges[this.state.activeStep].id);
            }
        }
    }

    handleNext = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep - 1,
        }));
    };

    handleStepChange = activeStep => {
        if (!this.state.open) {
            this.setState({activeStep});
        }
    };

    render() {
        const {classes, theme} = this.props;
        const {activeStep} = this.state;
        let maxSteps = 5;
        if (this.state.challenges.length < maxSteps) {
            maxSteps = this.state.challenges.length;
        }

        const popularChallenges = this.state.challenges.slice(0, maxSteps);

        return (
            <>
                <div className={classes.root}>
                    <Paper square elevation={0} className={classes.header}
                           style={{display: "flex", flexFlow: "column"}}>
                        <Typography style={{display: "flex"}}>Popular Challenges</Typography>
                        <Typography
                            style={{display: "flex"}}>{
                            popularChallenges[activeStep]
                                ? popularChallenges[activeStep].title : "Challenge"}
                        </Typography>
                    </Paper>
                    <CardActionArea>
                    <AutoPlaySwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={activeStep}
                        onChangeIndex={this.handleStepChange}
                        enableMouseEvents
                    >
                        {popularChallenges.map((step, index) => (
                            <div key={step.label}>
                                {Math.abs(activeStep - index) <= 2 ? (
                                    <img
                                        className={classes.img}
                                        src={step.imgURL}
                                        alt={step.title}
                                        onClick={this.handleClickOpen}
                                    />
                                ) : null}
                            </div>
                        ))}

                    </AutoPlaySwipeableViews>
                    </CardActionArea>
                    <MobileStepper
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}
                        className={classes.mobileStepper}
                        nextButton={
                            <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1 || maxSteps === 0}>
                                Next
                                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={this.handleBack} disabled={activeStep === 0 || maxSteps === 0}>
                                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
                                Back
                            </Button>
                        }
                    />
                </div>
                {this.state.challenges.length > 0 ?
                    <SolveChallengeStepper
                        open={this.state.open}
                        closed={this.handleClose}
                        questions={this.state.questions}
                        challengeTitle={this.state.challenges[this.state.activeStep].title}
                        challengeDescription={this.state.challenges[this.state.activeStep].description}
                    /> : null
                }
            </>
        );
    }
}

ChallengeStepper.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(ChallengeStepper);