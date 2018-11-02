import React, {Component} from 'react';
import fire from "../../fire";
import SolveChallengeCard from "../../components/SolveChallengeCard/SolveChallengeCard";
import List from "@material-ui/core/List/List";
import Grid from "@material-ui/core/Grid/Grid";
import Card from "@material-ui/core/Card/Card";
import Play from "@material-ui/icons/PlayArrowOutlined";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import classes from "./Dashboard.module.css";
import Button from "@material-ui/core/Button/Button";
import CardActions from "@material-ui/core/CardActions/CardActions";
import DeleteIcon from "@material-ui/core/SvgIcon/SvgIcon";


class Dashboard extends Component {

    state = {
        challenges: []
    };

    setListeners = () => {
        fire.database().ref('/challenges/')
            .on('child_added', snapshot => {
                console.log('Child Added - challenges');
                // TODO: Check if owner is not this user
                const challenge = snapshot.val();
                challenge.id = snapshot.key;
                const updatedChallenges = [...this.state.challenges];
                updatedChallenges.push(challenge);
                this.setState({challenges: updatedChallenges});
            });
        fire.database().ref('/challenges/')
            .on('child_removed', snapshot => {
                console.log('Child Removed - challenges');
                // TODO: Check if owner is not this user
                const challengeId = snapshot.key;
                const updatedChallenges
                    = this.state.challenges.filter((challenge) => (challenge.id !== challengeId));
                this.setState({challenges: updatedChallenges});
            });
        fire.database().ref('/challenges/')
            .on('child_changed', snapshot => {
                console.log('Child Changed - challenges');
                // TODO: Check if owner is not this user
                const challengeId = snapshot.key;
                const updatedChallenges = [...this.state.challenges];
                const oldChallengeIndex = updatedChallenges
                    .findIndex(challenge => (challenge.id === challengeId));
                const updatedChallenge = snapshot.val();
                updatedChallenge.id = challengeId;
                updatedChallenges[oldChallengeIndex] = updatedChallenge;
                this.setState({challenges: updatedChallenges});
            });
    };

    componentDidMount() {
        console.log('Dashboard did mount');
        this.setListeners();

        fire.database().ref('/challenges/')
            .once('value')
            .then(snapshot => {
                const challengesObject = snapshot.val();
                const updatedChallenges = [];
                for (let challengeId in challengesObject) {
                    const challenge = challengesObject[challengeId];
                    challenge.id = challengeId;
                    updatedChallenges.push(challenge);
                }
                this.setState({challenges: updatedChallenges});
            });
    }

    render() {
        const challenges = this.state.challenges.map(challenge => (
            <SolveChallengeCard
                key={challenge.id}
                challenge={challenge}
            />
        ));

        return (
            <>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="top"
                >
                    <Grid item xs={10}>
                        <div className={classes.Db}>
                            <Card
                            style={{marginTop:"100px", boxShadow:"50px"}}>
                                <CardActionArea>
                                <CardMedia
                                    title="Start Solving Challenges"
                                    style={{background:"#5983da"}}
                                    />
                                <CardContent>
                                    <Typography gutterBottom variant={"h5"} component={"h2"}>
                                        Challenges
                                    </Typography>
                                    <Typography component={'p'}>
                                        Begin solving other users challenges.
                                    </Typography>
                                </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size={"small"} color={"primary"} >
                                        <Play style={{marginLeft: '1px'}}/>
                                        Start
                                    </Button>
                                </CardActions>
                            </Card>
                        </div>
                    </Grid>
                </Grid>
          
                <List className={classes.root}>
                  {challenges}
               </List>
           </>
        );
    }
}

export default Dashboard;
