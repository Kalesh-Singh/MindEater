import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import fire from '../../../fire';

import Popper from "@material-ui/core/Popper/Popper";
import Grow from "@material-ui/core/Grow/Grow";
import Paper from "@material-ui/core/Paper/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList/MenuList";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import AccountIcon from '@material-ui/icons/AccountCircleOutlined';
import IconButton from "@material-ui/core/IconButton/IconButton";
import Avatar from "@material-ui/core/Avatar/Avatar";

class UserMenu extends Component {
    state = {
        open: false,
    };

    componentDidMount() {
        fire.auth().onAuthStateChanged(this.signOutObserver);
    }

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

    handleProfile = (event)  => {
        console.log("PROPS", this.props);
        this.handleClose(event);
        this.props.history.push('/profile');
    };

    render() {
        return (
            <>
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
                    {fire.auth().currentUser && fire.auth().currentUser.photoURL
                        ? <Avatar src={fire.auth().currentUser.photoURL}/>
                        : <AccountIcon/>}
                </IconButton>
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
                                        <MenuItem onClick={this.handleProfile}>Profile</MenuItem>
                                        <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                        <MenuItem onClick={this.signOut}>Sign Out</MenuItem>
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