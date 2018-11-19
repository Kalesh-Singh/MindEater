import React, {Component} from 'react';
import classes from "./CompletedChallenges.module.css";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Card from "@material-ui/core/Card/Card";
import Check from "@material-ui/icons/CheckCircleOutline"
import Divider from "@material-ui/core/Divider/Divider";

class CompletedChallenges extends Component {
    render() {
        return (
            <div>
                <Card style={{marginTop: 20}}>
                    <div style ={{marginTop:20}}>
                        <div className={classes.Box}>
                            <Check style={{width:60, height:60, color:"white"}}/>
                        </div>
                    </div>
                    <CardContent>
                        <Typography gutterBottom variant={"h4"} component={"h2"}>
                            Completed Challenges
                        </Typography>
                        <Typography component={'p'}>
                            "@userName" Progress
                        </Typography>
                    </CardContent>
                    <Divider className={classes.Divider}/>
                    <CardActions>
                        <h4>You have completed a total of ###### challenges</h4>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default CompletedChallenges;