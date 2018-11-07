import React, {Component} from 'react';
import SolveChallengeCard from "../../components/SolveChallengeCard/SolveChallengeCard";
import List from "@material-ui/core/List/List";
import Grid from "@material-ui/core/Grid/Grid";
import Card from "@material-ui/core/Card/Card";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import classes from "./Dashboard.module.css";
import CardActions from "@material-ui/core/CardActions/CardActions";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";


class Dashboard extends Component {

    render() {
        const CardStyle = {
            boxShadow: "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
            marginTop: "100px",
            width: "350px",
            height: "560px"
        };

        const primaryColor = "#9c27b0";
        const warningColor = "#ff9800";
        const dangerColor = "#f44336";
        const successColor = "#4caf50";
        const infoColor = "#00acc1";
        const roseColor = "#e91e63";
        const grayColor = "#999999";

        const backgroundColor = {}

        return (
            <div className={classes.root}>
                <Grid
                    container
                    spacing={0}
                    direction="row"
                    alignItems="flex-start"
                    justify="center"
                >
                    <Grid GridItem xs={12} sm={6} md={3}>
                        {/*<div className={classes.Db}>*/}
                        <Card
                            style={CardStyle}>
                            <CardActionArea>
                                <CardMedia
                                    title="Start Solving Challenges"
                                    className={classes.ChallengeImage}
                                    style={{height: "200px"}}
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
                        {/*</div>*/}
                    </Grid>


                    <Grid GridItem xs={12} sm={5} md={3}>
                        <Card
                            style={{marginTop: "100px"}}>
                            <CardHeader style={{background: "green"}}/>

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
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Dashboard;