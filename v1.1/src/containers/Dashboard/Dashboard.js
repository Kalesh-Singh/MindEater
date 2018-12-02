import React, {Component} from 'react';
import classes from "./Dashboard.module.css";
import ChallengesCard from "./ChallengesCard/ChallengesCard";
import PointCard from "./PointCard/PointCard";
import CompletedChallenges from "./CompletedChallenges/CompletedChallenges";
import RankCard from "./RankCard/RankCard";
import CreatedChallengesCard from "./CreatedChallengesCard/CreatedChallengesCard";
import fire from "../../fire";
import ChallengeStepper from "./ChallengeStepper/ChallengeStepper";
import BlackLogo from "../../assets/svg/black_logo.png"


class Dashboard extends Component {
    state = {
        username: "Guest",
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
        fire.database().ref('/users/' + user.uid)
            .on('child_added', snapshot => {
                this.setState(state => {
                    return {username: state.username}
                })
            });
    };

    render() {

        return (
            <div className={classes.PageStyle}>

                <div className={classes.UserName}>
                    <span className={classes.UserNameStyle}>{this.state.username}'s Dashboard</span>
                    {/*<img className={classes.Logo} src={BlackLogo} alt='MindEater'/>*/}
                </div>
                <div className={classes.RowR}>
                    <ChallengesCard className={classes.root}/>
                    <ChallengeStepper className={classes.root}/>
                    <RankCard className={classes.root}/>
                    <PointCard className={classes.root}/>
                    <CompletedChallenges className={classes.root}/>
                    <CreatedChallengesCard className={classes.root}/>
                </div>
            </div>
        );
    }
}

export default Dashboard;