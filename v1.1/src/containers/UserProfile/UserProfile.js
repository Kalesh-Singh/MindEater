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
import TextField from "@material-ui/core/TextField/TextField";
import Password from "@material-ui/icons/HttpsOutlined";
import User from "@material-ui/icons/PermIdentity";
import SaveIcon from "@material-ui/icons/SaveOutlined";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";

import withMobileDialog from "@material-ui/core/es/withMobileDialog/withMobileDialog";
import ChangePasswordDialog from "./ChangePasswordDialog/ChangePasswordDialog";


class UserProfile extends Component {

    state = {
        username: "Guest",
        imgSrc: null,
        imgFile: null,
        open: false,

    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    componentDidMount() {
        fire.auth().onAuthStateChanged(this.getProfilePic);
        const user = fire.auth().currentUser;
        if (user) {
            this.getProfilePic(user);
            this.updateUsername(user);
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

        const imgSrc = this.state.imgSrc;

        const {fullScreen} = this.props;

        // const formValid = this.checkFormValidity();

        return (
            <div style={{marginTop: '100px'}}>
                <div className={classes.header}>
                    <h1>{this.state.username}'s Profile Page</h1>
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

                    <div style={{textAlign:"center"}}>
                        <div className={classes.SubTitles}>
                            <h2>Update username:</h2>
                            <TextField
                                label="Username"
                                helperText={"Input new username"}
                                rowsMax="4"
                                variant={"outlined"}
                                margin={"normal"}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment variant="outlined" position="start">
                                            <User/>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Tooltip TransitionComponent={Fade} TransitionProps={{timeout: 300}} disableFocusListener
                                     placement={"bottom"}
                                     title={"save changes"}>
                                <Button
                                    variant={"raised"}
                                    className={classes.SaveNewUserName}>
                                    <SaveIcon style={{verticalAlign: "center", marginRight: "5px", height: 20}}/> Apply
                                </Button>
                            </Tooltip>
                        </div>
                        <div className={classes.SubTitles}>
                            <Tooltip TransitionComponent={Fade} TransitionProps={{timeout: 300}} disableFocusListener
                                     placement={"right"}
                                     title={"change password"}>
                                <Button
                                    variant={"raised"}
                                    className={classes.PasswordButton}
                                    onClick={this.handleClickOpen}>
                                    <Password style={{verticalAlign: "center", marginRight: "5px", height: 20}}/>Change Password
                                </Button>
                            </Tooltip>
                        </div>
                    </div>
                    <ChangePasswordDialog
                        open={this.state.open}
                        closed={this.handleClose}
                    />
                </form>
            </div>
        );
    }
}

export default withMobileDialog('xs')(UserProfile);