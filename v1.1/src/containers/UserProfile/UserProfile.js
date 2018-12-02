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
        username: {
            value: 'Guest',
            error: '',
            valid: false
        },
        imgSrc: null,
        imgFile: null,
        open: false,
        usernameChanged: false

    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    componentDidMount() {
        fire.auth().onAuthStateChanged((user) => {
            this.getProfilePic(user);
            this.getUsername(user);
        });
        const user = fire.auth().currentUser;
        if (user) {
            this.getProfilePic(user);
            this.getUsername(user);
        }
    }

    getProfilePic = (user) => {
        if (user) {
            const imgSrc = user.photoURL;
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

    handleUsernameChange = event => {
        const updatedUsername = {...this.state.username};
        updatedUsername.value = event.target.value;
        updatedUsername.error = this.checkUserName(updatedUsername);
        updatedUsername.valid = updatedUsername.error.length === 0;
        this.setState({username: updatedUsername, usernameChanged: true})
    };

    checkUserName = (username) => {
        const pattern = /^[a-zA-Z0-9-_]+$/; // Alphanumeric dashes and underscores.
        if (username.value.length === 0) {
            return '* Required';
        } else if (username.value.length > 15) {
            return 'Cannot be longer than 15 characters';
        } else if (!pattern.test(username.value)) {
            return 'Only characters A-Z, a-z, -, and _ allowed';
        } else {
            return '';      // No error
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
                this.setState({imgFile: null});     // Reset image file to null
                console.log("Updated user profile pic");
                window.location.reload();
            })
            .catch(error => {
                alert(error.message);
            })
    };

    getUsername = (user) => {
        if (user) {
            fire.database().ref('/users/' + user.uid + '/username')
                .once('value')
                .then(snapshot => {
                    if (snapshot.val()) {
                        const updatedUsername = {...this.state.username};
                        updatedUsername.value = snapshot.val();
                        this.setState({username: updatedUsername});
                    }
                }).catch(error => {
                alert(error.message)
            });
            this.setListener(user);
        }
    };

    updateUsername = () => {
        const user = fire.auth().currentUser;
        if (user) {
            user.updateProfile({
                displayName: this.state.username.value,
            })
                .then(() => {
                    return fire.database().ref('/users/' + user.uid)
                        .update({username: this.state.username.value})
                })
                .then(() => {
                    console.log("Updated username");
                })
                .catch(error => {
                    alert(error.message);
                });
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

        const NotDisabled = classes.SaveNewUserName;

        return (
            <div style={{marginTop: '100px'}}>
                <div className={classes.header}>
                    <h1>{this.state.username.value}'s Profile Page</h1>
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
                                disabled={this.state.imgFile === null}
                                className={classes.ButtonStyle}
                            >
                                Upload <CloudUploadIcon style={{marginLeft: 10}}/>
                            </Button>
                        </Tooltip>
                    </div>

                    <div style={{textAlign: "center"}}>
                        <div className={classes.SubTitles}>
                            <h2>Update username:</h2>
                            <TextField
                                label="Username"
                                rowsMax="4"
                                variant={"outlined"}
                                margin={"normal"}
                                onChange={this.handleUsernameChange}
                                error={this.state.username.error.length > 0}
                                helperText={this.state.username.error}
                                value={this.state.username.value}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment variant="outlined" position="start">
                                            <User/>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Tooltip TransitionComponent={Fade} TransitionProps={{timeout: 300}} placement={"bottom"}
                                     title={"save changes"}>
                                <Button
                                    variant={"raised"}
                                    className={classes.SaveNewUserName}
                                    disabled={!this.state.usernameChanged || !this.state.username.valid}
                                    onClick={this.updateUsername}
                                >
                                    <SaveIcon style={{verticalAlign: "center", marginRight: "5px", height: 20}}/>
                                    Apply
                                </Button>
                            </Tooltip>
                        </div>
                        <div className={classes.SubTitles}>
                            <Tooltip TransitionComponent={Fade} TransitionProps={{timeout: 300}} placement={"right"}
                                     title={"change password"}>
                                <Button
                                    variant={"raised"}
                                    className={classes.PasswordButton}
                                    onClick={this.handleClickOpen}>
                                    <Password style={{verticalAlign: "center", marginRight: "5px", height: 20}}/>Change
                                    Password
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