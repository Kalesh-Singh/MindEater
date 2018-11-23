import React, {Component} from 'react';
import AddChallenge from "../../components/AddChallenge/AddChallenge";
import fire from "../../fire";
import EditChallengeCard from "../../components/EditChallengeCard/EditChallengeCard";
import List from "@material-ui/core/List/List";

import classes from "./MyChallenges.module.css";
import Divider from "@material-ui/core/Divider/Divider";

class MyChallenges extends Component {

    state = {
        myChallenges: []
    };

    setListeners = () => {
        fire.database().ref('/challenges/')
            .on('child_added', snapshot => {
                console.log('Child Added - challenges');
                if (snapshot.val().owner === fire.auth().currentUser.uid) {
                    const challenge = snapshot.val();
                    challenge.id = snapshot.key;
                    const updatedMyChallenges = [...this.state.myChallenges];
                    updatedMyChallenges.push(challenge);
                    this.setState({myChallenges: updatedMyChallenges});
                }
            });
        fire.database().ref('/challenges/')
            .on('child_removed', snapshot => {
                console.log('Child Removed - challenges');
                if (snapshot.val().owner === fire.auth().currentUser.uid) {
                    const challengeId = snapshot.key;
                    const updatedMyChallenges
                        = this.state.myChallenges.filter((challenge) => (challenge.id !== challengeId));
                    this.setState({myChallenges: updatedMyChallenges});
                }
            });
        fire.database().ref('/challenges/')
            .on('child_changed', snapshot => {
                console.log('Child Changed - challenges');
                if (snapshot.val().owner === fire.auth().currentUser.uid) {
                    const challengeId = snapshot.key;
                    const updatedMyChallenges = [...this.state.myChallenges];
                    const oldChallengeIndex = updatedMyChallenges
                        .findIndex(challenge => (challenge.id === challengeId));
                    const updatedChallenge = snapshot.val();
                    updatedChallenge.id = challengeId;
                    updatedMyChallenges[oldChallengeIndex] = updatedChallenge;
                    this.setState({myChallenges: updatedMyChallenges});
                }
            });
    };

    componentDidMount() {
        console.log('My challenges did mount');
        this.setListeners();

        fire.database().ref('/challenges/')
            .once('value')
            .then(snapshot => {
                const challengesObject = snapshot.val();
                const updatedChallenges = [];
                for (let challengeId in challengesObject) {
                    const challenge = challengesObject[challengeId];
                    if (challenge.owner === fire.auth().currentUser.uid) {
                        challenge.id = challengeId;
                        updatedChallenges.push(challenge);
                    }
                }
                this.setState({myChallenges: updatedChallenges});
            });
    }

    render() {
        console.log('My Challenges - render');
        console.log('My Challenges - state', this.state);

        const myChallenges = this.state.myChallenges.map(challenge => (
            <EditChallengeCard
                key={challenge.id}
                challenge={challenge}
            />
        ));

        return (
            <div className={classes.PageStyle}>
            <div style={{marginTop: '100px'}}>
                <div className={classes.header}>
                    <h1>My Challenges</h1>
                    <p>All of the awesome challenges I've created!</p>
                </div>
                <div className={classes.CreateChallenge}>
                    <AddChallenge/>
                </div>
                <Divider style={{marginBottom:"20px"}}/>
                <List className={classes.root}
                >
                    {myChallenges}
                </List>
            </div>
            </div>
        );
    }
}

export default MyChallenges;
