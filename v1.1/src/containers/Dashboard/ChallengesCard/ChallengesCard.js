import React, {Component} from 'react';
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Card from "@material-ui/core/Card/Card";
import classes from "./ChallengesCard.module.css";
import Divider from "@material-ui/core/Divider/Divider";
import Play from "@material-ui/icons/ExtensionSharp"
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import {withRouter} from 'react-router-dom';

class ChallengesCard extends Component {
    render() {
        console.log("CHALLENGES PROPS !!!!!!!!!", this.props);

        return (
            <>
            <Card className={classes.CardStyle}>
                <CardHeader style={{background: "#2096F3"}}/>
                <div style ={{marginTop:20}}>
                    <div className={classes.Box}>
                    <Play className={classes.IconP}/>
                    </div>
                    <div>
                    <CardContent style={{textAlign:"center"}}>
                        <Typography style={{fontWeight:"bold"}} gutterBottom variant={"h4"} component={"h2"}>
                            Challenges
                        </Typography>
                        <Typography style={{fontSize:18}} component={'p'}>
                            Begin solving other users challenges
                        </Typography>
                    </CardContent>
                    </div>
                </div>

                <Divider className={classes.Divider}/>
                <CardActions>
                    <div className={classes.flex}>
                        <c
                            className={classes.bttn}
                            onClick={() => {this.props.history.push('/solve-challenges');}}
                        >
                            Start
                        </c>
                    </div>
                </CardActions>
            </Card>
            </>
        );
    }
}

export default withRouter(ChallengesCard);