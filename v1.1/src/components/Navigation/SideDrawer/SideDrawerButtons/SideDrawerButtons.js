import React from 'react';
import {NavLink} from "react-router-dom";

import List from "@material-ui/core/List/List";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import SolveChallengesIcon from '@material-ui/icons/ExtensionTwoTone';
import AccountIcon from '@material-ui/icons/AccountCircleOutlined';
import DashboardIcon from '@material-ui/icons/DashboardTwoTone';
import MyChallengesIcon from '@material-ui/icons/LibraryBooksTwoTone';
import Divider from "@material-ui/core/Divider/Divider";

import classes from "./SideDrawerButtons.module.css";
import Blogo from "../../../../assets/svg/black_logo.png";

function SideDrawerButtons(props, routeName) {
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
                    onClick={props.toggleDrawer}
                    activeClassName={classes.active}
                >
                    <ListItem button className={classes.Bttn}>
                        <ListItemIcon>
                            <DashboardIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Dashboard'/>
                    </ListItem>
                </NavLink>
                <NavLink
                    activeClassName={classes.active}
                    to='/my-challenges'
                    onClick={props.toggleDrawer}
                >
                    <ListItem button className={classes.Bttn}>
                        <ListItemIcon>
                            <MyChallengesIcon/>
                        </ListItemIcon>
                        <ListItemText primary='My Challenges'/>
                    </ListItem>
                </NavLink>
                <NavLink
                    activeClassName={classes.active}
                    to='/solve-challenges'
                    onClick={props.toggleDrawer}
                >
                    <ListItem button className={classes.Bttn}>
                        <ListItemIcon>
                            <SolveChallengesIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Solve Challenges'/>
                    </ListItem>
                </NavLink>
                <NavLink
                    activeClassName={classes.active}
                    to='/profile'
                    onClick={props.toggleDrawer}
                >
                    <ListItem button className={classes.Bttn}>
                        <ListItemIcon>
                            <AccountIcon/>
                        </ListItemIcon>
                        <ListItemText primary='My Account'/>
                    </ListItem>
                </NavLink>
            </List>
        </div>
    );
}

export default SideDrawerButtons;