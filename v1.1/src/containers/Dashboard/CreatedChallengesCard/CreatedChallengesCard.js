import React, {Component} from 'react';
import Card from "@material-ui/core/Card/Card";
import classes from "./CreatedChallengesCard.module.css";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import Completed from "@material-ui/icons/AssignmentOutlined";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import fire from "../../../fire";
import Divider from "@material-ui/core/Divider/Divider";
import CardActions from "@material-ui/core/CardActions/CardActions";

class CreatedChallengesCard extends Component {

    state = {
        username: "Guest",
        createdChallenges: 0
    };

    componentDidMount() {
        fire.auth().onAuthStateChanged(this.updateUsername);
        const user = fire.auth().currentUser;
        if (user) {
            this.updateUsername(user);
        }
    }

    updateUsername = (user) => {
        if (user) {
            fire.database().ref('/users/' + user.uid + '/username')
                .once('value')
                .then(snapshot => {
                    console.log("USER Snapshot", snapshot);
                    if (snapshot.val()) {
                        console.log("USER Snapshot Val", snapshot.val());
                        this.setState({username: snapshot.val()});
                    }
                }).catch(error => {
                alert(error.message)
            });
            this.setListener(user);
        }
    };

    setListener = (user) => {
        fire.database().ref('/users/' + user.uid + '/challenges')
            .on('child_added', snapshot => {
                this.setState(state => {
                    return {createdChallenges: state.createdChallenges + 1}
                })
            });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.username !== this.state.username) {
            const user = fire.auth().currentUser;
            if (user) {
                fire.database().ref('/users/' + user.uid + '/challenges')
                    .once('value')
                    .then(snapshot => {
                        this.setState({createdChallenges: snapshot.numChildren()});
                    })
                    .catch(error => {
                        alert(error.message)
                    });
            }
        }
    }

    render() {
        return (
            <div>
                <div>
                    <Card className={classes.CardStyle}>
                        <CardHeader style={{background: "#ff5722"}}/>
                        <div style={{marginTop: 20}}>
                            <div className={classes.Box}>
                                <Completed className={classes.CompletedIcon}/>
                            </div>
                        </div>
                        <CardContent style={{marginTop: 25}}>
                            <Typography style={{fontWeight:"bold"}} gutterBottom variant={"h4"} component={"h2"}>
                                Created Challenges
                            </Typography>
                            <Typography style={{fontSize:18}} component={'p'}>
                                {this.state.username}'s contributions:
                            </Typography>
                        </CardContent>
                        <Divider className={classes.Divider}/>
                        <CardActions>
                            <h4>You have created {this.state.createdChallenges} challenges</h4>
                        </CardActions>
                    </Card>
                </div>
            </div>
        );
    }
}

export default CreatedChallengesCard;