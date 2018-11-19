import React, {Component} from 'react';
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import classes from "../ChallengesCard/ChallengesCard.module.css";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Card from "@material-ui/core/Card/Card";
import Check from "@material-ui/icons/CheckCircle"
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import Divider from "@material-ui/core/Divider/Divider";

class CompletedChallenges extends Component {
    render() {
        return (
            <div>
                <Card style={{marginTop:20}}>
                    <CardActionArea>
                        <CardMedia>
                            <Check/>
                        </CardMedia>
                        <CardContent>
                            <Typography gutterBottom variant={"h4"} component={"h2"}>
                                Completed Challenges
                            </Typography>
                            <Typography component={'p'}>
                                "@userName" Progress
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <Divider className={classes.Divider}/>
                    <CardActions>
                        <h4>jdbgjdbgjdgh</h4>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default CompletedChallenges;