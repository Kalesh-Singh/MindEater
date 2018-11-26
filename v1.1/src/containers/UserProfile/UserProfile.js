import React, {Component} from 'react';

class UserProfile extends Component {
    render() {
        return (

            <div style={{marginTop: "100px"}}>
                <h3>User Profile Page</h3>
                <p>User Details goes here.</p>
                <p>Update profile pic</p>
                <p>Update username</p>
                <p>Change password if you are an email / password user</p>
            </div>
        );
    }
}

export default UserProfile;