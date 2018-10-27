import React, {Component} from 'react';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton/IconButton";
import fire from '../../fire';

import DeleteIcon from "@material-ui/icons/Delete"

class QuestionItem extends Component {

    deleteQuestion = () => {
        fire.database().ref('/questions/' + this.props.question.id)
            .remove()
            .then(() => {console.log('Question deleted from Questions');})
            .catch(error => alert(error.message));
        fire.database()
            .ref('/challenges/' + this.props.question.challenge + '/questions/' + this.props.question.key)
            .remove()
            .then(() => {console.log('Question ID deleted from Challenge');})
            .catch(error => alert(error.message));
    };

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
                    <IconButton
                        aria-label="Delete"
                        onClick={this.deleteQuestion}
                    >
                        <DeleteIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default QuestionItem;