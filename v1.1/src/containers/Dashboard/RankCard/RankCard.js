import React, {Component} from 'react';
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import Divider from "@material-ui/core/Divider/Divider";
import classes from "../RankCard/RankCard.module.css";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Card from "@material-ui/core/Card/Card";
import Rank from "../../../assets/svg/Rank Icons/Beginner.svg";

class RankCard extends Component {

    render() {
        return (
            <div>
                <Card style={{marginTop:20}}>
                    <div className={classes.ImgWrapper}>
                        <img
                            className={classes.RankSvg}
                            alt={"Rank"}
                            src={Rank}>
                        </img>
                    </div>
                        <CardMedia
                            title={"Rank"}/>
                        <CardContent>
                            <Typography gutterBottom variant={"h4"} component={"h1"}>
                               Rank: [Beginner]
                            </Typography>
                            <Typography component={'p'}>
                                lopum corus epnum
                            </Typography>
                        </CardContent>
                    <Divider className={classes.Divider}/>
                    <CardActions>
                        <h4>Short description maybe?</h4>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default RankCard;