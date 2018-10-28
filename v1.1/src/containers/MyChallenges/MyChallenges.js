import React from 'react';
import CreateChallengeDialog from "../../components/CreateChallengeDialog/CreateChallengeDialog";

function MyChallenges() {
    return (
        <div style={{marginTop: '100px'}}>
            <h1>My Challenges</h1>
            <p>All of the awesome challenges I created!</p>
            <CreateChallengeDialog/>
        </div>
    );
}

export default MyChallenges;
