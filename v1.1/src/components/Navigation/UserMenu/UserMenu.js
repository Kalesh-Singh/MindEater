import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import fire from '../../../fire';

import classes from "./UserMenu.module.css"
import Popper from "@material-ui/core/Popper/Popper";
import Grow from "@material-ui/core/Grow/Grow";
import Paper from "@material-ui/core/Paper/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList/MenuList";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import AccountIcon from '@material-ui/icons/AccountCircleOutlined';
import IconButton from "@material-ui/core/IconButton/IconButton";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Zoom from "@material-ui/core/Zoom/Zoom";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import ProfileIcon from "@material-ui/icons/FaceTwoTone"
import LogOut from "@material-ui/icons/PowerSettingsNewTwoTone"
import ProfilePlaceholder from "../../../assets/svg/users.svg";

class UserMenu extends Component {
    state = {
        open: false,
        imgSrc: null,
    };

    componentDidMount() {
        fire.auth().onAuthStateChanged(user => {
            this.signOutObserver(user);
            this.getProfilePic(user);
        });
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

    // Triggers when the auth state changes to handle sign-ins.
    signOutObserver = (user) => {
        if (!user) {
            this.props.history.push('/');
        }
    };

    signOut = (event) => {
        this.handleClose(event);
        fire.auth().signOut()
            .catch((error) => {
                alert(error.message);
            });
    };

    handleToggle = () => {
        this.setState(state => ({open: !state.open}));
    };

    handleClose = (event) => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({open: false});
    };

    handleProfile = (event) => {
        this.handleClose(event);
        this.props.history.push('/profile');
    };

    render() {
        return (
            <>
                <Tooltip classes={{tooltip:classes.Tool}} TransitionComponent={Zoom} TransitionProps={{ timeout: 600 }} placement={"left"} title={"Profile"} enterDelay={25} leaveDelay={150}>
                <IconButton
                    style={{position: 'absolute', right: '16px'}}
                    color="inherit"
                    aria-label="Open Account Properties"
                    buttonRef={node => {
                        this.anchorEl = node;
                    }}
                    aria-owns={this.state.open ? 'menu-list-grow' : null}
                    aria-haspopup="true"
                    onClick={this.handleToggle}
                >
                    {this.state.imgSrc
                        ? <Avatar src={this.state.imgSrc}/>
                        : <AccountIcon/>}
                </IconButton>
                </Tooltip>
                <Popper open={this.state.open} anchorEl={this.anchorEl} transition disablePortal>
                    {({TransitionProps, placement}) => (
                        <Grow
                            {...TransitionProps}
                            id="menu-list-grow"
                            style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={this.handleClose}>
                                    <MenuList>
                                        <MenuItem className={classes.IconStyleProfile} onClick={this.handleProfile}><ProfileIcon className={classes.Icon}/>Profile</MenuItem>
                                        <MenuItem className={classes.IconStyleLogout} onClick={this.signOut}><LogOut className={classes.Icon}/>Sign Out</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </>
        );
    }
}

export default withRouter(UserMenu);