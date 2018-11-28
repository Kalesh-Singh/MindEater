import React, {Component} from 'react';
import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/Typography/Typography";
import ProfilePlaceholder from "../../assets/svg/users.svg";
import fire from "../../fire";
import {arrayBufferToBlob} from 'blob-util';
import classes from "./UserProfile.module.css";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Fade from "@material-ui/core/Fade/Fade";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import TextField from "@material-ui/core/TextField/TextField";
import Password from "@material-ui/icons/Https"
import User from "@material-ui/icons/PermIdentity"
import Grid from "@material-ui/core/Grid/Grid";
import EditIcon from "@material-ui/core/SvgIcon/SvgIcon";


class UserProfile extends Component {

    state = {
        imgSrc: null,
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
            const imgSrc = URL.createObjectURL(input.target.files[0]);
            this.setState({
                imgSrc: imgSrc,
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
        const picRef = fire.storage().ref(/users/ + user.uid + '/img.' + 'webp');
        picRef.put(this.state.imgFile)
            .then(() => {
                return picRef.getDownloadURL();
            })
            .then(url => {
                return user.updateProfile({photoURL: url})
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
            <div style={{marginTop: '100px'}}>
                <div className={classes.header}>
                    <h1>User Profile Page</h1>
                    <p>Update your profile</p>
                </div>
                <form>
                    <Typography variant={"h4"} component={"h5"} className={classes.Title}>
                        Profile Picture
                    </Typography>
                    <div style={{textAlign: "center"}}>
                        <img src={imgSrc} className={classes.ProfileImage}/>
                    </div>
                    <div style={{textAlign: "center"}}>
                        <input
                            onChange={this.handleFile}
                            style={{display: 'none'}}
                            id="edit-pic-button"
                            multiple
                            type="file"
                        />
                        <label htmlFor="edit-pic-button">
                            <Tooltip TransitionComponent={Fade} TransitionProps={{timeout: 300}} disableFocusListener
                                     placement={"bottom"}
                                     title={"Change your profile picture"}>
                                <Button
                                    variant="raised"
                                    component="span"
                                    className={classes.ButtonStyle}
                                >
                                    Change Picture <PhotoCamera style={{marginLeft: 10}}/>
                                </Button>
                            </Tooltip>
                        </label>

                        <Tooltip TransitionComponent={Fade} TransitionProps={{timeout: 300}} disableFocusListener
                                 placement={"bottom"}
                                 title={"Upload picture"}>
                            <Button
                                onClick={this.updateProfilePic}
                                variant={"raised"}
                                className={classes.ButtonStyle}
                            >
                                Upload <CloudUploadIcon style={{marginLeft: 10}}/>
                            </Button>
                        </Tooltip>
                    </div>
                    <div className={classes.SubTitles}>
                        <h2>Update username:</h2>
                        <Grid container={true} spacing={8} alignItems="center">
                            <Grid item>
                                <User/>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    label="New username"
                                    multiline
                                    rowsMax="4"
                                    variant={"outlined"}
                                    margin={"normal"}
                                    // style={{marginBottom: "15px"}}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div className={classes.SubTitles}>
                        <h2>Change password:</h2>
                        <Tooltip TransitionComponent={Fade} TransitionProps={{timeout: 300}} disableFocusListener
                                 placement={"bottom"}
                                 title={""}>
                            <Button
                                variant={"raised"}
                                className={classes.ButtonStyle}>
                                <Password style={{verticalAlign: "center", marginRight: "5px", height: 20}}/> change
                            </Button>
                        </Tooltip>
                    </div>
                </form>
            </div>
        );
    }
}

export default UserProfile;