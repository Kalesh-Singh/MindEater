import React, {Component} from 'react';
import Card from "@material-ui/core/Card/Card";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import classes from "./EditChallengeCard.module.css";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ChallengeDialog from "../ChallengeDialog/ChallengeDialog";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Button from "@material-ui/core/Button/Button";
import DeleteIcon from '@material-ui/icons/Delete';

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
                    style={{width: '100%', height: '100%', display: 'flex',
                        flexFlow: 'column', justifyContent: 'space-between'}}
                >
                    <CardActionArea onClick={this.handleClickOpen}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.props.challenge.title}
                            </Typography>
                            <Typography component="p">
                                {this.props.challenge.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions style={{alignSelf: 'flex-end'}}>
                        <Button color="secondary">
                            Delete
                            <DeleteIcon style={{marginLeft: '8px'}} />
                        </Button>
                    </CardActions>
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