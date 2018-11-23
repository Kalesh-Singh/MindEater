import React, {Component} from 'react';
import Card from "@material-ui/core/Card/Card";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import classes from "./EditChallengeCard.module.css";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ChallengeDialog from "../ChallengeDialog/ChallengeDialog";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Button from "@material-ui/core/Button/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import fire from "../../fire";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Zoom from "@material-ui/core/Zoom/Zoom";
import Divider from "@material-ui/core/Divider/Divider";

class EditChallengeCard extends Component {
    state = {
        open: false,
        challenge: {
            id: this.props.challenge.id,
            title: this.props.challenge.title,
            description: this.props.challenge.description,
            questions: []
        },
        getColor: EditChallengeCard.getRandomColor(),
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.challenge.title !== this.props.challenge.title
            || prevProps.challenge.description !== this.props.challenge.description) {
            this.state.challenge.title= this.props.challenge.title;
            this.state.challenge.description = this.props.challenge.description;
        }
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    deleteChallenge = () => {
        // Get the question IDs of the challenge
        fire.database().ref('/challenges/' + this.state.challenge.id + '/questions').once('value')
            .then(snapshot => {
                // Delete the challenge questions
                const questionObject = snapshot.val();
                for (let questionKey in questionObject) {
                    const questionId = questionObject[questionKey];
                    fire.database().ref('/questions/' + questionId)
                        .remove()
                        .then(() => {
                            console.log('Challenge question deleted')
                        })
                        .catch(error => {
                            alert(error.message)
                        });
                }

                // Delete the challenge itself
                fire.database().ref('/challenges/' + this.state.challenge.id)
                    .remove()
                    .then(() => {
                        console.log('Challenge deleted')
                    })
                    .catch(error => {
                        alert(error.message)
                    });
            })
            .catch(error => {
                alert(error.message)
            });
        // Delete the challenge image
        fire.database().ref('/challengeImages/' + this.state.challenge.id)
            .remove()
            .then(() => {
                console.log('Challenge image deleted')
            })
            .catch(error => {
                alert(error.message)
            });
        // Delete challenge from the user's list of challenges
        const user = fire.auth().currentUser;
        fire.database().ref('/users/' + user.uid + '/challenges/' + this.state.challenge.id)
            .remove()
            .then(() => {
                console.log('Challenge removed from list of user challenges');
            })
            .catch(error => {
                alert(error.message)
            });
    };

    static getRandomColor(){
        let colorValues = ["red", "blue", "green", "yellow", "orange", "pink", "violet",
            "brown", "teal", "olive", "lime", "navy", "#2096F3", "#4CAF50", "#d50000"];
        return colorValues[Math.floor(Math.random() * colorValues.length)];
    };


    render() {
        return (
            <ListItem className={classes.root}>
                <Card
                    className={classes.Hov}
                    style={{
                        width: '100%', height: '100%', display: 'flex',
                        flexFlow: 'column', justifyContent: 'space-between'
                    }}>
                    <CardHeader style={{background:this.state.getColor}}/>
                    <Tooltip TransitionComponent={Zoom} TransitionProps={{ timeout: 600 }} placement={"bottom"} title={"Edit"} enterDelay={50} leaveDelay={200}>
                    <CardActionArea onClick={this.handleClickOpen}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.props.challenge.title}
                            </Typography>
                            <Typography component="p">
                                {this.props.challenge.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    </Tooltip>
                    <Divider/>
                    <CardActions style={{alignSelf: 'flex-end'}}>
                        <Button
                            className={classes.Del}
                            color="secondary"
                            onClick={this.deleteChallenge}
                        >
                            Delete
                            <DeleteIcon style={{marginLeft: '8px'}}/>
                        </Button>
                    </CardActions>
                </Card>
                <ChallengeDialog
                    open={this.state.open}
                    closed={this.handleClose}
                    challenge={this.state.challenge}
                />
            </ListItem>
        );
    }
}

export default EditChallengeCard;
