import React from 'react';
import {NavLink} from 'react-router-dom'

import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import SolveChallengesIcon from '@material-ui/icons/Extension';
import CreateChallengeIcon from '@material-ui/icons/NoteAdd';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MyChallengesIcon from '@material-ui/icons/LibraryBooks';

import classes from './NavigationItems.module.css';

function NavigationItems(props) {

    const listStyle = (props.display === 'flex') ? classes.DesktopOnly : '';

    return (
        <div className={listStyle}>
            <List
                className={classes.NavigationItems}
                style={{display: props.display, width: '100%'}}
            >
                <NavLink
                    activeClassName={classes.active}
                    to='/dashboard'
                    onClick={props.toggleDrawer}
                >
                    <ListItem button>
                        {props.display === 'block' ? (
                            <ListItemIcon>
                                <DashboardIcon/>
                            </ListItemIcon>
                        ) : null}
                        <ListItemText primary='Dashboard'/>
                    </ListItem>
                </NavLink>
                <NavLink
                    activeClassName={classes.active}
                    to='/my-challenges'
                    onClick={props.toggleDrawer}
                >
                    <ListItem button>
                        {props.display === 'block' ? (
                            <ListItemIcon>
                                <MyChallengesIcon/>
                            </ListItemIcon>
                        ) : null}
                        <ListItemText primary='My Challenges'/>
                    </ListItem>
                </NavLink>
                <NavLink
                    activeClassName={classes.active}
                    to='/create-challenge'
                    onClick={props.toggleDrawer}
                >
                    <ListItem button>
                        {props.display === 'block' ? (
                            <ListItemIcon>
                                <CreateChallengeIcon/>
                            </ListItemIcon>
                        ) : null}
                        <ListItemText primary='Create Challenge'/>
                    </ListItem>
                </NavLink>
                <NavLink
                    activeClassName={classes.active}
                    to='/solve-challenges'
                    onClick={props.toggleDrawer}
                >
                    <ListItem button>
                        {props.display === 'block' ? (
                            <ListItemIcon>
                                <SolveChallengesIcon/>
                            </ListItemIcon>
                        ) : null}
                        <ListItemText primary='Solve Challenges'/>
                    </ListItem>
                </NavLink>
            </List>
        </div>
    );
}

export default NavigationItems;