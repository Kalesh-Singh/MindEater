import React, {Component} from 'react';
import fire from "../../fire";
import SolveChallengeCard from "../../components/SolveChallengeCard/SolveChallengeCard";
import classes from "./SolveChallenges.module.css";
import List from "@material-ui/core/List/List";
import Typography from "@material-ui/core/Typography/Typography";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core";
import green from "@material-ui/core/es/colors/green";
import lightBlue from "@material-ui/core/es/colors/lightBlue";
import Divider from "@material-ui/core/Divider/Divider";
import InputBase from "@material-ui/core/InputBase/InputBase";
import SearchIcon from '@material-ui/icons/Search';

const theme = createMuiTheme({
    palette: {
        primary: lightBlue,
        secondary: green,
    },
    typography: {
        useNextVariants: true,
    },
});

class SolveChallenges extends Component {

    state = {
        loading: false,
        challenges: [],
        searchQuery: ''
    };

    setListeners = () => {
        fire.database().ref('/challenges/')
            .on('child_added', snapshot => {
                // TODO: Check if owner is not this user
                this.setState({loading: true});
                const challenge = snapshot.val();
                challenge.id = snapshot.key;
                const updatedChallenges = [...this.state.challenges];
                fire.database().ref('/challengeImages/' + challenge.id)
                    .once('value')
                    .then(imgSnapshot => {
                        challenge.imgURL = (imgSnapshot.val()) ? imgSnapshot.val().imgURL : null;
                        fire.database().ref('/users/' + challenge.owner + '/username')
                            .once('value')
                            .then(authorSnapshot => {
                                challenge.authorName = authorSnapshot.val();
                                updatedChallenges.push(challenge);
                                updatedChallenges.sort((a, b) => (a.timesCompleted - b.timesCompleted));
                                this.setState({challenges: updatedChallenges, loading: false});
                            })
                            .catch(error => {
                                alert(error.message)
                            });
                    });
            });
        fire.database().ref('/challenges/')
            .on('child_removed', snapshot => {
                // TODO: Check if owner is not this user
                const challengeId = snapshot.key;
                const updatedChallenges
                    = this.state.challenges.filter((challenge) => (challenge.id !== challengeId));
                this.setState({challenges: updatedChallenges});
            });
        fire.database().ref('/challenges/')
            .on('child_changed', snapshot => {
                // TODO: Check if owner is not this user
                this.setState({loading: true});
                const challengeId = snapshot.key;
                const updatedChallenges = [...this.state.challenges];
                const oldChallengeIndex = updatedChallenges
                    .findIndex(challenge => (challenge.id === challengeId));
                const updatedChallenge = snapshot.val();
                updatedChallenge.id = challengeId;
                fire.database().ref('/challengeImages/' + challengeId)
                    .once('value')
                    .then(imgSnapshot => {
                        updatedChallenge.imgURL = (imgSnapshot.val()) ? imgSnapshot.val().imgURL : null;
                        fire.database().ref('/users/' + updatedChallenge.owner + '/username')
                            .once('value')
                            .then(authorSnapshot => {
                                updatedChallenge.authorName = authorSnapshot.val();
                                updatedChallenges[oldChallengeIndex] = updatedChallenge;
                                updatedChallenges.sort((a, b) => (a.timesCompleted - b.timesCompleted));
                                this.setState({challenges: updatedChallenges, loading: false});
                            })
                            .catch(error => {
                                alert(error.message)
                            });
                    });
            });
    };

    /*
     fire.database().ref('/users/' + challenge.owner + '/username')
                            .once('value')
                            .then(authorSnapshot => {
                                challenge.authorName = authorSnapshot.val();
                                this.setState({challenges: updatedChallenges, loading: false});
                            })
                            .catch(error => {alert(error.message)});
     */


    componentDidMount() {
        this.setListeners();
        this.setState({loading: true});
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
                        }).catch(error => {alert(error.message)});
                    });
            });
    }

    handleSearch = event => {
        const updatedSearchQuery = event.target.value;
        this.setState({searchQuery: updatedSearchQuery});
    };


    render() {
        const challenges = this.state.challenges
            .filter(challenge =>
                challenge.title.toLowerCase().includes(this.state.searchQuery.toLowerCase())
                || challenge.description.toLowerCase().includes(this.state.searchQuery.toLowerCase()))
            .map(challenge => (
                <SolveChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                />
            ));

        return (
            <div style={{marginTop: "100px"}}>
                <MuiThemeProvider theme={theme}>
                    <div className={classes.header}>
                        <h1>Let the games Begin!</h1>
                        <p>Start Solving Challenges</p>
                    </div>
                    <Divider className={classes.DividerLine}/>
                    <div className={classes.Search}>
                        <div>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            onChange={this.handleSearch}
                            value={this.state.searchQuery}
                        />
                    </div>
                    {this.state.loading ?
                        <div className={classes.LoadingBar}>
                            <LinearProgress variant="query" color={"primary"}/>
                            <br/>
                            <LinearProgress variant="query" color="secondary"/>
                            <br/>
                            <Typography
                                variant="h6"
                                color="inherit"
                                align="center">
                                Loading Challenges ...
                            </Typography>
                        </div>
                        : null}
                    <List className={classes.List}>
                        {challenges}
                    </List>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default SolveChallenges;