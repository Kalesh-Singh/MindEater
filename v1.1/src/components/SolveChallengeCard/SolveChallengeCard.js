import React, {Component} from 'react';
import classes from "./SolveChallengeCard.module.css";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import ListItem from "@material-ui/core/ListItem/ListItem";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import Typography from "@material-ui/core/Typography/Typography";

class SolveChallengeCard extends Component {
    render() {
        return (
            <ListItem className={classes.root}>
                <Card
                    style={{
                        width: '100%', height: '100%', display: 'flex',
                        flexFlow: 'column', justifyContent: 'space-between'
                    }}
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
                </Card>
                {/*<ChallengeDialog
                    open={this.state.open}
                    closed={this.handleClose}
                    challenge={this.state.challenge}
                />*/}
            </ListItem>
        );
    }
}

export default SolveChallengeCard;