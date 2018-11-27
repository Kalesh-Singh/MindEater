import React, {Component} from 'react';
import classes from "../Authentication/SignUp/SignUp.module.css";
import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/Typography/Typography";
import Face from "@material-ui/core/SvgIcon/SvgIcon";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import ProfilePlaceholder from "../../assets/svg/users.svg";
import fire from "../../fire";

class UserProfile extends Component {

    state = {
        imgSrc: ProfilePlaceholder,
        username: {
            value: '',
            error: '',
            focused: false,

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
        },
        showPassword: false
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
        if (input.files && input.files[0]) {
            const reader = new FileReader();

            reader.onload = event => {
                this.setState({img_path: event.target.result})
            };

            reader.readAsDataURL(input.files[0]);
        }
    };

    handleFileChange = event => {
        this.setState({
            imgSrc: URL.createObjectURL(event.target.files[0])
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
                <form
                    className={classes.SignUp}
                    onSubmit={this.signUp}
                >
                    <Typography gutterBottom variant={"h5"} component={"h2"}>
                        Profile Pic
                    </Typography>
                    <img src={imgSrc} height="250px" width="250px"/>
                    <div>
                        <Button
                            containerElement='label'
                            label='My Label'>
                            <input type="file" onChange={this.handleFileChange}/>
                        </Button>
                        <Button>
                            Upload
                        </Button>
                    </div>

                    {/* onChange and onFocus */}
                    <TextField
                        name='username'
                        label='Username'
                        placeholder='Username'
                        margin='normal'
                        variant='outlined'
                        error={this.state.username.error.length > 0}
                        helperText={this.state.username.error}
                        value={this.state.username.value}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment variant="outlined" position="start">
                                    <Face/>
                                </InputAdornment>
                            )
                        }}
                    />

                    {/*TODO: If sign in method is email password
                        1. Allow password update.
                    */}

                </form>
            </div>
        );
    }
}

export default UserProfile;