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
        open: false
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
                    style={{width: '100%'}}
                    onClick={this.handleClickOpen}
                >
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {/*Lizard*/}
                                {this.props.challenge.title}
                            </Typography>
                            <Typography component="p">
                                {this.props.challenge.description}
                                {/*Some lizard details*/}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <ChallengeDialog
                    open={this.state.open}
                    closed={this.handleClose}
                />
            </ListItem>
        );
    }
}

export default EditChallengeCard;