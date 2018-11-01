import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Card from "@material-ui/core/Card/Card";
import Play from "@material-ui/icons/PlayArrowOutlined";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";

import classes from "./Dashboard.module.css";
import Button from "@material-ui/core/Button/Button";
import CardActions from "@material-ui/core/CardActions/CardActions";
import DeleteIcon from "@material-ui/core/SvgIcon/SvgIcon";

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
                <Grid item xs={10}>
            <div className={classes.Db}>
                <Card
                style={{marginTop:"100px", boxShadow:"50px"}}>
                    <CardActionArea>
                    <CardMedia
                        title="Start Solving Challenges"
                        style={{background:"#5983da"}}
                        />
                    <CardContent>
                        <Typography gutterBottom variant={"h5"} component={"h2"}>
                            Challenges
                        </Typography>
                        <Typography component={'p'}>
                            Begin solving other users challenges.
                        </Typography>
                    </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size={"small"} color={"primary"} >
                            <Play style={{marginLeft: '1px'}}/>
                            Start
                        </Button>
                    </CardActions>
                </Card>
            </div>
                </Grid>
                </Grid>
        );
    }
}

export default Dashboard;