import React, {Component} from 'react';
import classes from "./Dashboard.module.css";
import ChallengesCard from "./ChallengesCard/ChallengesCard";
import PointCard from "./PointCard/PointCard";
import CompletedChallenges from "./CompletedChallenges/CompletedChallenges";
import RankCard from "./RankCard/RankCard";


class Dashboard extends Component {

    render() {

        return (
            <div className={classes.RowR}>
                <PointCard className={classes.root}/>
                <RankCard className={classes.root}/>
                <ChallengesCard className={classes.root}/>
                <CompletedChallenges className={classes.root}/>
            </div>
        );
    }
}

export default Dashboard;