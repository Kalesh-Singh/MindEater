import React from 'react';
import {NavLink} from "react-router-dom";

import List from "@material-ui/core/List/List";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import SolveChallengesIcon from '@material-ui/icons/Extension';
import CreateChallengeIcon from '@material-ui/icons/NoteAdd';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MyChallengesIcon from '@material-ui/icons/LibraryBooks';
import Divider from "@material-ui/core/Divider/Divider";

import classes from "./SideDrawerButtons.module.css";

function SideDrawerButtons(props) {
    return (
        <div>
            <List
                className={classes.SideDrawerItems}
                style={{display: 'block', width: '100%'}}
            >
                <h3 className={classes.Header}>MindEater</h3>
                <Divider/>
                <NavLink
                    activeClassName={classes.active}
                    to='/dashboard'
                    onClick={props.toggleDrawer}
                >
                    <ListItem button>
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
                    <ListItem button>
                        <ListItemIcon>
                            <MyChallengesIcon/>
                        </ListItemIcon>
                        <ListItemText primary='My Challenges'/>
                    </ListItem>
                </NavLink>
                <NavLink
                    activeClassName={classes.active}
                    to='/create-challenge'
                    onClick={props.toggleDrawer}
                >
                    <ListItem button>
                        <ListItemIcon>
                            <CreateChallengeIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Create Challenge'/>
                    </ListItem>
                </NavLink>
                <NavLink
                    activeClassName={classes.active}
                    to='/solve-challenges'
                    onClick={props.toggleDrawer}
                >
                    <ListItem button>
                        <ListItemIcon>
                            <SolveChallengesIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Solve Challenges'/>
                    </ListItem>
                </NavLink>
            </List>
        </div>
    );
}

export default SideDrawerButtons;