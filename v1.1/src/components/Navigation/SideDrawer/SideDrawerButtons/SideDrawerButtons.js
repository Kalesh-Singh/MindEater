import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

import List from "@material-ui/core/List/List";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import SolveChallengesIcon from '@material-ui/icons/ExtensionTwoTone';
import AccountIcon from '@material-ui/icons/AccountCircleTwoTone';
import DashboardIcon from '@material-ui/icons/DashboardTwoTone';
import MyChallengesIcon from '@material-ui/icons/LibraryBooksTwoTone';
import Divider from "@material-ui/core/Divider/Divider";

import classes from "./SideDrawerButtons.module.css";
import Blogo from "../../../../assets/svg/black_logo.png";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import red from "@material-ui/core/es/colors/red";

const theme = createMuiTheme({
    active: {
        backgroundColor: red
    }
});

class SideDrawerButtons extends Component {
    state = {
        selectedIndex: 1,
    };

    handleListItemClick = (event, index) => {
        this.setState({selectedIndex: index});
    }

    render() {
        return (
            <div>
                <List
                    className={classes.SideDrawerItems}
                    style={{display: 'block', width: '100%'}}
                >
                    <img className={classes.Logo} src={Blogo} alt='Mind Eater Logo'/>
                    <h3 className={classes.Header}>MindEater</h3>
                    <Divider style={{margin:"15px"}}/>
                    <NavLink
                        to='/dashboard'
                        onClick={this.props.toggleDrawer}
                        activeClassName={classes.active}
                    >
                        <ListItem button className={classes.Bttn}
                        selected={this.state.selectedIndex === 0}
                        onClick={event => this.handleListItemClick(event, 0)}>
                            <ListItemIcon>
                                <DashboardIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Dashboard'/>
                        </ListItem>
                    </NavLink>
                    <NavLink
                        activeClassName={classes.active}
                        to='/my-challenges'
                        onClick={this.props.toggleDrawer}
                    >
                        <ListItem button className={classes.Bttn}
                                  selected={this.state.selectedIndex === 1}
                                  onClick={event => this.handleListItemClick(event, 1)}>
                            <ListItemIcon>
                                <MyChallengesIcon/>
                            </ListItemIcon>
                            <ListItemText primary='My Challenges'/>
                        </ListItem>
                    </NavLink>
                    <NavLink
                        activeClassName={classes.active}
                        to='/solve-challenges'
                        onClick={this.props.toggleDrawer}
                    >
                        <ListItem button className={classes.Bttn}
                                  selected={this.state.selectedIndex === 2}
                                  onClick={event => this.handleListItemClick(event, 2)}>
                            <ListItemIcon>
                                <SolveChallengesIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Solve Challenges'/>
                        </ListItem>
                    </NavLink>
                    <NavLink
                        activeClassName={classes.active}
                        to='/profile'
                        onClick={this.props.toggleDrawer}
                    >
                        <ListItem button className={classes.Bttn}
                                  selected={this.state.selectedIndex === 3}
                                  onClick={event => this.handleListItemClick(event, 3)}>
                            <ListItemIcon>
                                <AccountIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Account'/>
                        </ListItem>
                    </NavLink>
                </List>
            </div>
        );
    }
}

export default SideDrawerButtons;