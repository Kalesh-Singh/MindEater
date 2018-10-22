import React from 'react';
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";

function NavigationItems(props) {
    return (
        <List style={{display: props.display}}>
            <ListItem button>
                <ListItemText primary='My Challenges'/>
            </ListItem>
            <ListItem button>
                <ListItemText primary='Solve Challenges'/>
            </ListItem>
        </List>
    );
}

export default NavigationItems;