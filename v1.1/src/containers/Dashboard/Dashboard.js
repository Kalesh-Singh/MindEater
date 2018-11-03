import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Card from "@material-ui/core/Card/Card";
import Play from "@material-ui/icons/PlayArrowTwoTone";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import ClipArt from "../../assets/svg/Challenge_clipArt.png";

import classes from "./Dashboard.module.css";
import Button from "@material-ui/core/Button/Button";
import CardActions from "@material-ui/core/CardActions/CardActions";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import Icon from "@material-ui/core/Icon/Icon";

class Dashboard extends Component {

    render() {

        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="top"
                style={{minHeight: '100vh'}}
            >
                <Grid GridItem xs={12} sm={1} md={3}>
            {/*<div className={classes.Db}>*/}
                <Card
                style={{marginTop:"100px", boxShadow:"50px", width:"350px", height:"560px"}}>
                    <CardActionArea>
                    <CardMedia
                        title="Start Solving Challenges"
                        className={classes.ChallengeImage}
                        style={{height:"200px"}}
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
                        {/*<Button size={"small"} color={"primary"} variant={"raised"}>*/}
                            {/*<Play/>*/}
                            {/*Start*/}
                        {/*</Button>*/}
                        <div className={classes.flex}>
                        <c className={classes.bttn}>Start</c>
                        </div>
                    </CardActions>
                </Card>
                </Grid>

                <Grid GridItem xs={12} sm={6} md={3}>
                <Card
                    style={{marginTop:"50px"}}>
                    <CardHeader style={{background:"green"}}/>

                    <CardActionArea>
                        <CardMedia
                        title={"Points"}/>
                        <CardContent>
                            <Typography gutterBottom variant={"h4"} component={"h1"}>
                                Points
                            </Typography>
                            <Typography component={'p'}>
                                User tier will be displayed here:
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            {/*</div>*/}
                </Grid>
                </Grid>
        );
    }
}

export default Dashboard;