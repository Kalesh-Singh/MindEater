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

            <Card style={{marginTop:20, width:350}}>
                <div style ={{marginTop:20}}>
                    <div className={classes.Box}>
                        <img
                            width={"200px"}
                            height={"150px"}
                            className={classes.Challenge}
                            alt={"Solve challenges"}
                            src={Challenge}>
                        </img>
                    </div>
                    <div>
                    <CardContent>
                        <Typography gutterBottom variant={"h4"} component={"h2"}>
                            Challenges
                        </Typography>
                        <Typography component={'p'}>
                            Begin solving other users challenges.
                        </Typography>
                    </CardContent>
                    </div>
                </div>

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