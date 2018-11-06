import React, {Component} from 'react';
import classes from "./SolveChallengeCard.module.css";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import ListItem from "@material-ui/core/ListItem/ListItem";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import Typography from "@material-ui/core/Typography/Typography";
import fire from "../../fire";
import SolveChallengeStepper from "../SolveChallengeStepper/SolveChallengeStepper";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";

class SolveChallengeCard extends Component {

    state = {
        open: false,
        questions: []
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    setListeners = (challengeId) => {
        fire.database().ref('/challenges/' + challengeId + '/questions')
            .on('child_added', questionId => {
                console.log('Question child added!');
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

    componentDidMount() {
        this.setListeners(this.props.challenge.id);
    }

    render() {
        return (
            <ListItem className={classes.root}>
                <Card
                    style={{
                        width: '100%', height: '100%', display: 'flex',
                        flexFlow: 'column', justifyContent: 'space-between'
                    }}
                >
                    <CardActionArea onClick={this.handleClickOpen}>
                        <CardMedia
                            image={this.props.challenge.imgURL}
                            title={this.props.challenge.title}
                        />

                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.props.challenge.title}
                            </Typography>
                            <Typography component="p">
                                {this.props.challenge.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <SolveChallengeStepper
                    open={this.state.open}
                    closed={this.handleClose}
                    questions={this.state.questions}
                    challengeTitle={this.props.challenge.title}
                    challengeDescription={this.props.challenge.description}
                />
            </ListItem>
        );
    }
}

export default SolveChallengeCard;