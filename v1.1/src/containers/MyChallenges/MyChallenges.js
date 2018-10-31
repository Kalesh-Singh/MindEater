import React, {Component} from 'react';
import AddChallenge from "../../components/AddChallenge/AddChallenge";
import fire from "../../fire";
import EditChallengeCard from "../../components/EditChallengeCard/EditChallengeCard";
import List from "@material-ui/core/List/List";

import classes from "./MyChallenges.module.css";

class MyChallenges extends Component {

    state = {
        myChallenges: []
    };

    setListeners = () => {
        fire.database().ref('/challenges/')
            .on('child_added', snapshot => {
                console.log('Child Added - challenges');
                // TODO: Check if owner is this user
                const challenge = snapshot.val();
                challenge.id = snapshot.key;
                const updatedMyChallenges = [...this.state.myChallenges];
                updatedMyChallenges.push(challenge);
                this.setState({myChallenges: updatedMyChallenges});
            });
        fire.database().ref('/challenges/')
            .on('child_removed', snapshot => {
                console.log('Child Removed - challenges');
                // TODO: Check if owner is this user
                const challengeId = snapshot.key;
                const updatedMyChallenges
                    = this.state.myChallenges.filter((challenge) => (challenge.id !== challengeId));
                this.setState({myChallenges: updatedMyChallenges});
            });
        fire.database().ref('/challenges/')
            .on('child_changed', snapshot => {
                console.log('Child Changed - challenges');
                // TODO: Check if owner is this user
                const challengeId = snapshot.key;
                const updatedMyChallenges = [...this.state.myChallenges];
                const oldChallengeIndex = updatedMyChallenges
                    .findIndex(challenge => (challenge.id === challengeId));
                const updatedChallenge = snapshot.val();
                updatedChallenge.id = challengeId;
                updatedMyChallenges[oldChallengeIndex] = updatedChallenge;
                this.setState({myChallenges: updatedMyChallenges});
            });
    };

    componentDidMount() {
        console.log('My challenges did mount');
        this.setListeners();
    }

    render() {
        console.log(this.state);

        const myChallenges = this.state.myChallenges.map(challenge => (
            <EditChallengeCard
                key={challenge.id}
                challenge={challenge}
            />
        ));

        return (
            <div style={{marginTop: '100px'}}>
                <h1>My Challenges</h1>
                <p>All of the awesome challenges I created!</p>
                <AddChallenge/>
                <List className={classes.root}>
                    {myChallenges}
                </List>
            </div>
        );
    }
}

export default MyChallenges;
