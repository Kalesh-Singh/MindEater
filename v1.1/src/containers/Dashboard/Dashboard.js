import React, {Component} from 'react';
import classes from "./Dashboard.module.css";
import ChallengesCard from "./ChallengesCard/ChallengesCard";
import PointCard from "./PointCard/PointCard";
import CompletedChallenges from "./CompletedChallenges/CompletedChallenges";


class Dashboard extends Component {

    render() {

        return (
            <div className={classes.Row}>
                    <ChallengesCard className={classes.root}/>
                    <PointCard className={classes.root}/>
                <CompletedChallenges className={classes.root}/>
            </div>
        );
    }
}

export default Dashboard;