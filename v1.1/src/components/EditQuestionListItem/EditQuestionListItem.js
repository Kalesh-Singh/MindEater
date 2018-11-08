import React, {Component} from 'react';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton/IconButton";
import fire from '../../fire';
import DeleteIcon from "@material-ui/icons/Delete"
import QuestionDialog from "../QuestionDialog/QuestionDialog";
import Divider from "@material-ui/core/Divider/Divider";

import classes from "./EditQuestionListItem.module.css"
import Fade from "@material-ui/core/Fade/Fade";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";

class EditQuestionListItem extends Component {
    state = {
        open: false
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    deleteQuestion = () => {
        fire.database().ref('/questions/' + this.props.question.id)
            .remove()
            .then(() => {
                console.log('Question deleted from Questions');
            })
            .catch(error => alert(error.message));
        fire.database()
            .ref('/challenges/' + this.props.question.challenge + '/questions/' + this.props.question.key)
            .remove()
            .then(() => {
                console.log('Question ID deleted from Challenge');
            })
            .catch(error => alert(error.message));
    };

    render() {

        const EditQ = "Edit question";

        return (
            <div key={this.props.question.id}>
                <Tooltip TransitionComponent={Fade} disableFocusListener disableTouchListener title={EditQ}>
                <ListItem
                    className={classes.items}
                    onClick={this.handleClickOpen}
                >
                    <ListItemAvatar style={{background:"#33bfff", cursor:"pointer"}}>
                        <Avatar>
                            {this.props.index}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={this.props.question.question}
                        style={{cursor:"pointer"}}
                    />
                    <ListItemSecondaryAction>
                        <IconButton
                            aria-label="Delete"
                            onClick={this.deleteQuestion}
                        >
                            <DeleteIcon color="secondary"/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                </Tooltip>
                <Divider/>
                <QuestionDialog
                    open={this.state.open}
                    closed={this.handleClose}
                    challengeId={this.props.question.challenge}
                    question={this.props.question}
                    wasSaved={this.props.wasSaved}
                />
            </div>
        );
    }
}

export default EditQuestionListItem;
