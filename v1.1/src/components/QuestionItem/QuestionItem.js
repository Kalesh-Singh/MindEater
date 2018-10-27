import React, {Component} from 'react';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton/IconButton";

import DeleteIcon from "@material-ui/icons/Delete"

class QuestionItem extends Component {

    render() {
        return (
            <ListItem key={this.props.question.id}>
                <ListItemAvatar>
                    <Avatar>
                        {this.props.index}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={this.props.question.question}
                />
                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete">
                        <DeleteIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default QuestionItem;