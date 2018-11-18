import React, {Component} from 'react';
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Card from "@material-ui/core/Card/Card";
import classes from "./ChallengesCard.module.css";

class ChallengesCard extends Component {
    render() {
        return (
            <Card>
                <CardActionArea>
                    <CardMedia
                        title="Start Solving Challenges"
                    />
                    <CardContent>
                        <Typography gutterBottom variant={"h4"} component={"h2"}>
                            Challenges
                        </Typography>
                        <Typography component={'p'}>
                            Begin solving other users challenges.
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <div className={classes.flex}>
                        <c className={classes.bttn}>Start</c>
                    </div>
                </CardActions>
            </Card>
        );
    }
}

export default ChallengesCard;