import React, {Component} from 'react';
import fire from "../../fire";
import SolveChallengeCard from "../../components/SolveChallengeCard/SolveChallengeCard";
import classes from "./Dashboard.module.css";
import List from "@material-ui/core/List/List";

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
            <div style={{marginTop: '100px'}}>
                <h1>Dashboard</h1>
                <p>Some awesome dashboard content!</p>
                <List className={classes.root}>
                    {challenges}
                </List>
            </div>
        );
    }
}

export default Dashboard;

/*<Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="top"
                style={{minHeight: '100vh'}}
            >
                <Grid item xs={12} style={{background: "red"}}>
                    <div style={{marginTop: '100px'}}>
                        <h1>Dashboard</h1>
                        <p>Some awesome dashboard content!</p>
                    </div>
                </Grid>
                <SolveChallengeStepper/>
            </Grid>*/