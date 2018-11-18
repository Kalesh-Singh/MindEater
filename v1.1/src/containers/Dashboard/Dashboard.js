import React, {Component} from 'react';
import classes from "./Dashboard.module.css";
import ChallengesCard from "./ChallengesCard/ChallengesCard";
import PointCard from "./PointCard/PointCard";


class Dashboard extends Component {

    render() {

        return (
            <div className={classes.Row}>
                    <ChallengesCard/>
                    <PointCard/>
            </div>
        );
    }
}

export default Dashboard;