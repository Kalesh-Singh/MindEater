import React, {Component} from 'react';
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Card from "@material-ui/core/Card/Card";
import Challenge from '../../../assets/svg/StaticChallenge.png';
import classes from "./ChallengesCard.module.css";
import Divider from "@material-ui/core/Divider/Divider";

class ChallengesCard extends Component {
    render() {
        return (
            <>

            <Card>
                <CardActionArea>
                    <img
                        className={classes.Challenge}
                        alt={"Solve challenges"}
                        src={Challenge}>
                    </img>
                    <CardContent>
                        <Typography gutterBottom variant={"h4"} component={"h2"}>
                            Challenges
                        </Typography>
                        <Typography component={'p'}>
                            Begin solving other users challenges.
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <Divider className={classes.Divider}/>
                <CardActions>
                    <div className={classes.flex}>
                        <c className={classes.bttn}>Start</c>
                    </div>
                </CardActions>
            </Card>
            </>
        );
    }
}

export default ChallengesCard;