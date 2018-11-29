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
import Password from "@material-ui/icons/HttpsOutlined"
import User from "@material-ui/icons/PermIdentity"
import Grid from "@material-ui/core/Grid/Grid";
import Dialog from "@material-ui/core/Dialog/Dialog";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from "@material-ui/icons/CloseOutlined"
import SaveIcon from "@material-ui/icons/SaveOutlined";
import OldPassword from "@material-ui/icons/EnhancedEncryptionOutlined"
import CheckPassword from "@material-ui/icons/LockOpenOutlined"
import withMobileDialog from "@material-ui/core/es/withMobileDialog/withMobileDialog";
import firebase from 'firebase/app';


class UserProfile extends Component {

    state = {
        imgSrc: null,
        imgFile: null,
        state: false,
        oldPassword: {
            value: '',
            error: '',
            focused: false,
            valid: false
        },
        password: {
            value: '',
            error: '',
            focused: false,
            valid: false
        },
        repeatPassword: {
            value: '',
            error: '',
            focused: false,
            valid: false
        }
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

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleChange = name => event => {
        const updatedField = {...this.state[name]};
        updatedField.value = event.target.value.trim();
        updatedField.error = this.checkValidity(name, updatedField);
        updatedField.valid = updatedField.error.length === 0;
        if (name === "password") {
            const updatedRepeatPassword = {...this.state.repeatPassword};
            updatedRepeatPassword.error = this.checkPasswordsMatch(updatedField.value, updatedRepeatPassword.value);
            updatedRepeatPassword.valid = updatedRepeatPassword.error.length === 0;
            this.setState({password: updatedField, repeatPassword: updatedRepeatPassword});
        } else {
            this.setState({[name]: updatedField});
        }
    };

    checkPasswordsMatch = (password, repeatedPassword) => {
        if (password !== repeatedPassword) {
            return "Passwords don't match";
        } else {
            return '';      // No error
        }
    };

    checkValidity = (name, element) => {
        switch (name) {
            case 'password':
                return this.checkPassword(element);
            case 'repeatPassword':
                return this.checkRepeatPassword(element);
            case 'oldPassword':
                return this.checkOldPassword(element);
            default:
                return '';      // No error
        }
    };

    checkPassword = (password) => {
        if (password.value.length === 0 && password.focused) {
            return '* Required';
        } else if (password.value.length < 6) {
            return 'Must have 6 or more characters';
        } else if (password.value.length > 26) {
            return 'Cannot be longer than 26 characters';
        } else if (password.value.search(/[A-Z]/) === -1) {
            return 'Must contain an uppercase character';
        } else if (password.value.search(/[a-z]/) === -1) {
            return 'Must contain an lowercase character';
        } else if (password.value.search(/\d/) === -1) {
            return 'Must contain at least 1 digit';
        } else {
            return '';      // No error
        }
    };

    checkRepeatPassword = (repeatPassword) => {
        if (repeatPassword.value.length === 0 && repeatPassword.focused) {
            return '* Required';
        } else if (repeatPassword.value !== this.state.password.value) {
            return 'Passwords don\'t match';
        } else {
            return '';      // No error
        }
    };

    checkOldPassword = (oldPassword) => {
        this.reauthenticateUser(oldPassword);
        if (oldPassword.value.length === 0 && oldPassword.focused) {
            return '* Required';
        } else {
            return '';      // No error
        }
    };

    reauthenticateUser = (oldPassword) => {
        const user = fire.auth().currentUser;
        fire.auth().fetchSignInMethodsForEmail(user.email)
            .then((signInMethods) => {
                if (signInMethods.length > 0) {
                    const updatedOldPassword = {...oldPassword};
                    const provider = user.providerData[0].providerId;
                    if (provider !== "password") {
                        let providerName;
                        if (provider === 'facebook.com') {
                            providerName = "Facebook";
                        } else if (provider === 'twitter.com') {
                            providerName = "Twitter";
                        } else if (provider === 'google.com') {
                            providerName = "Google";
                        }
                        updatedOldPassword.error = 'Please change the password from your associated ' + providerName + ' account';
                        updatedOldPassword.valid = false;
                        this.setState({oldPassword: updatedOldPassword});
                    }
                }
            });
    };

    handleFocus = name => () => {
        const updatedField = {...this.state[name]};
        if (!updatedField.focused) {
            updatedField.focused = true;
            updatedField.error = this.checkValidity(name, updatedField);
            this.setState({[name]: updatedField});

            if (name === 'password') {
                this.handleFocus('repeatPassword')();
            }
        }
    };

    checkFormValidity = () => {
        return this.state.oldPassword.valid && this.state.password.valid && this.state.repeatPassword.valid;
    };

    updatePassword = () => {
        const user = fire.auth().currentUser;

        const credential = firebase.auth.EmailAuthProvider.credential(user.email, this.state.oldPassword.value);

        user.reauthenticateAndRetrieveDataWithCredential(credential)
            .then(() => {
                return user.updatePassword(this.state.password.value)
            })
            .then(() => {
                console.log("Password updated successfully");
            })
            .catch(error => {
                alert(error.message);
            });

        this.handleClose();
    };

    render() {

        const imgSrc = this.state.imgSrc;

        const {fullScreen} = this.props;

        const formValid = this.checkFormValidity();

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
                                <User style={{width: 40, height: 40}}/>
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    label="New username"
                                    multiline
                                    rowsMax="4"
                                    variant={"outlined"}
                                    margin={"normal"}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div className={classes.SubTitles}>
                        <h2>Change password:</h2>
                        <Tooltip TransitionComponent={Fade} TransitionProps={{timeout: 300}} disableFocusListener
                                 placement={"right"}
                                 title={"change password"}>
                            <Button
                                variant={"raised"}
                                className={classes.PasswordButton}
                                onClick={this.handleClickOpen}>
                                <Password style={{verticalAlign: "center", marginRight: "5px", height: 20}}/> change
                            </Button>
                        </Tooltip>

                        <Dialog
                            fullScreen={fullScreen}
                            open={this.state.open}
                            closed={this.handleClose}>
                            <AppBar className={classes.appBar}>
                                <Toolbar>
                                    <Tooltip TransitionComponent={Fade} TransitionProps={{timeout: 300}}
                                             disableFocusListener
                                             placement={"right"}
                                             title={"Cancel"}>
                                        <IconButton color="inherit" onClick={this.handleClose} aria-label="Close"
                                                    className={classes.butonCancel}>
                                            <CloseIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Typography variant="h6" color="inherit" className={classes.AppbarTitle}>
                                        Change Password
                                    </Typography>
                                    <Tooltip TransitionComponent={Fade} TransitionProps={{timeout: 300}}
                                             disableFocusListener
                                             placement={"bottom"}
                                             title={"save changes"}>
                                        <Button color="inherit"
                                                onClick={this.updatePassword}
                                                className={classes.butonSave}
                                                disabled={!formValid}
                                        >
                                            <SaveIcon style={{marginRight: "4px"}}/>
                                            Save
                                        </Button>
                                    </Tooltip>
                                </Toolbar>
                            </AppBar>
                            <div>
                                <div className={classes.SubTitles}>
                                    <h2>Enter old password:</h2>
                                    <Grid container={true} spacing={8} style={{alignItems: "center"}}>
                                        <Grid item>
                                            <OldPassword style={{width: 40, height: 40}}/>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <TextField
                                                label="Old Password"
                                                multiline
                                                rowsMax="4"
                                                variant={"outlined"}
                                                margin={"normal"}
                                                error={this.state.oldPassword.error.length > 0}
                                                helperText={this.state.oldPassword.error}
                                                value={this.state.oldPassword.value}
                                                onChange={this.handleChange('oldPassword')}
                                                onFocus={this.handleFocus('oldPassword')}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className={classes.SubTitles}>
                                    <h2>Enter new password:</h2>
                                    <Grid container={true} spacing={8} alignItems="center">
                                        <Grid item>
                                            <CheckPassword style={{width: 40, height: 40}}/>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <TextField
                                                label="New Password"
                                                multiline
                                                rowsMax="4"
                                                variant={"outlined"}
                                                margin={"normal"}
                                                error={this.state.password.error.length > 0}
                                                helperText={this.state.password.error}
                                                value={this.state.password.value}
                                                onChange={this.handleChange('password')}
                                                onFocus={this.handleFocus('password')}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className={classes.SubTitles}>
                                    <h2>Confirm new password:</h2>
                                    <Grid container={true} spacing={8} alignItems="center">
                                        <Grid item>
                                            <Password style={{width: 40, height: 40}}/>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <TextField
                                                label="Confirm password"
                                                multiline
                                                rowsMax="4"
                                                variant={"outlined"}
                                                margin={"normal"}
                                                error={this.state.repeatPassword.error.length > 0}
                                                helperText={this.state.repeatPassword.error}
                                                value={this.state.repeatPassword.value}
                                                onChange={this.handleChange('repeatPassword')}
                                                onFocus={this.handleFocus('repeatPassword')}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </Dialog>
                    </div>
                </form>
            </div>
        );
    }
}

export default withMobileDialog('xs')(UserProfile);