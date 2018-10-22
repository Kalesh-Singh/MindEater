import React from 'react';
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import SolveChallengesIcon from '@material-ui/icons/Extension';
import CreateChallengeIcon from '@material-ui/icons/NoteAdd';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MyChallengesIcon from '@material-ui/icons/LibraryBooks';
function NavigationItems(props) {
    return (

        <List style={{display: props.display, width: '100%'}}>
            <ListItem button>
                {props.display === 'block' ? (
                    <ListItemIcon>
                        <DashboardIcon/>
                    </ListItemIcon>
                ): null}
                <ListItemText primary='Dashboard'/>
            </ListItem>
            <ListItem button>
                {props.display === 'block' ? (
                    <ListItemIcon>
                        <MyChallengesIcon/>
                    </ListItemIcon>
                ): null}
                <ListItemText primary='My Challenges'/>
            </ListItem>
            <ListItem button>
                {props.display === 'block' ? (
                    <ListItemIcon>
                        <CreateChallengeIcon/>
                    </ListItemIcon>
                ): null}
                <ListItemText primary='Create Challenge'/>
            </ListItem>
            <ListItem button>
                {props.display === 'block' ? (
                    <ListItemIcon>
                        <SolveChallengesIcon/>
                    </ListItemIcon>
                ): null}
                <ListItemText primary='Solve Challenges'/>
            </ListItem>
        </List>
    );
}

export default NavigationItems;