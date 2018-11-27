import React, {Component} from 'react';
import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/Typography/Typography";
import ProfilePlaceholder from "../../assets/svg/users.svg";
import fire from "../../fire";
import {arrayBufferToBlob} from 'blob-util';

class UserProfile extends Component {

    state = {
        imgSrc: null,
        imgExt: null,
        imgFileName: null,
        imgFile: null
    };

    componentDidMount() {
        fire.auth().onAuthStateChanged(this.getProfilePic);
        const user = fire.auth().currentUser;
        if (user) {
            this.getProfilePic(user);
        }
    }

    getProfilePic = (user) => {
        if (user) {
            const imgSrc = fire.auth().currentUser.photoURL;
            if (imgSrc) {
                this.setState({imgSrc: imgSrc});
            } else {
                this.setState({imgSrc: ProfilePlaceholder});
            }
        }
    };

    handleFile = input => {
        if (input.target.files && input.target.files[0]) {
            console.log("ENTERED IF");
            const imgSrc = URL.createObjectURL(input.target.files[0]);
            const imgFileName = input.target.files[0].name;
            const imgExt = imgFileName.split('.')[1];
            console.log("IMG EXTENSION", imgExt);
            this.setState({
                imgSrc: imgSrc,
                imgExt: imgExt,
                imgFileName: imgFileName
            });

            const reader = new FileReader();
            reader.onloadend = e => {
                const arrayBuffer = e.target.result;
                const blob = arrayBufferToBlob(arrayBuffer, 'image/webp');
                this.setState({imgFile: blob})
            };

            reader.readAsArrayBuffer(input.target.files[0]);
        }
    };

    updateProfilePic = () => {
        const user = fire.auth().currentUser;
        if (!user) {
            return;
        }
        const picRef = fire.storage().ref(/users/ + user.uid + '/img.' + this.state.imgExt);
        picRef.put(this.state.imgFile)
            .then(() => {
                return picRef.getDownloadURL();
            })
            .then(url => {
                user.updateProfile({photoURL: url})
            })
            .then(() => {
                console.log("Updated user profile pic")
            })
            .catch(error => {
                alert(error.message);
            })
    };

    render() {

        const imgSrc = this.state.imgSrc;
        return (

            <div style={{marginTop: "100px"}}>
                <h3>User Profile Page</h3>
                <p>User Details goes here.</p>
                <p>Update profile pic</p>
                <p>Update username</p>
                <p>Change password if you are an email / password user</p>
                <form>
                    <Typography gutterBottom variant={"h5"} component={"h2"}>
                        Profile Pic
                    </Typography>
                    <img src={imgSrc} height="250px" width="250px"/>
                    <div>
                        <Button
                            containerElement='label'
                            label='My Label'>
                            <input type="file" onChange={this.handleFile}/>
                        </Button>
                        <Button
                            onClick={this.updateProfilePic}
                        >
                            Upload
                        </Button>
                    </div>


                    {/*TODO:
                        1. Allow username update.
                        2. If sign in method is email password, allow password update.
                    */}

                </form>
            </div>
        );
    }
}

export default UserProfile;