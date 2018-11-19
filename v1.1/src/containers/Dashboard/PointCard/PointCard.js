import React, {Component} from 'react';
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import Card from "@material-ui/core/Card/Card";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Divider from "@material-ui/core/Divider/Divider";
import classes from "./PointCard.module.css"

class PointCard extends Component {
    render() {
        return (
            <div>
                <Card>
                    <CardHeader style={{background: "#2096F3"}}/>
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
                    <Divider className={classes.Divider}/>
                    <CardActions>
                        <h4>This is where the points will be shown</h4>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default PointCard;