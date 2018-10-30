import React, {Component} from 'react';
import Card from "@material-ui/core/Card/Card";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import classes from "./EditChallengeCard.module.css";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ChallengeDialog from "../ChallengeDialog/ChallengeDialog";

class EditChallengeCard extends Component {
    state = {
        open: false,
        challenge: {
            id: this.props.challenge.id,
            title: this.props.challenge.title,
            description: this.props.challenge.description,
            questions: []
        }
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        return (
            <ListItem className={classes.root}>
                <Card
                    style={{width: '100%', height: '100%'}}
                    onClick={this.handleClickOpen}
                >
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.props.challenge.title}
                            </Typography>
                            <Typography component="p">
                                {this.props.challenge.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <ChallengeDialog
                    open={this.state.open}
                    closed={this.handleClose}
                    challenge={this.state.challenge}
                />
            </ListItem>
        );
    }
}

export default EditChallengeCard;