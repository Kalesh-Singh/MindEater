import React, {Component} from 'react';

class UserProfile extends Component {
    render() {
        return (
            <div style={{marginTop: "100px"}}>
                <h3>User Profile Page</h3>
                <form id="image-form" action="#">
                    <input id="mediaCapture" type="file" accept="image/*" capture="camera"/>
                        <button id="submitImage" title="Add an image"
                                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--amber-400 mdl-color-text--white">
                            <i className="material-icons">image</i>
                        </button>
                </form>
            </div>
        );
    }
}

export default UserProfile;
