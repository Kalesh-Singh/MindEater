import React, {Component} from 'react';
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import Card from "@material-ui/core/Card/Card";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Divider from "@material-ui/core/Divider/Divider";
import classes from "./PointCard.module.css"
import Android from "@material-ui/icons/AndroidOutlined";

class PointCard extends Component {
    render() {
        return (
            <div>
                <Card style={{width:"300px"}}>
                    <CardHeader style={{background: "#2096F3"}}/>
                        <CardMedia
                            title={"Points"}/>
                    <div style ={{marginTop:20}}>
                        <div className={classes.Box}>
                            <Android style={{width:70, height:70, color:"white"}}/>
                        </div>
                    </div>
                        <CardContent>
                            <Typography gutterBottom variant={"h4"} component={"h1"}>
                                Points:
                            </Typography>
                        </CardContent>
                    <Divider className={classes.Divider}/>
                </Card>
            </div>
        );
    }
}

export default PointCard;