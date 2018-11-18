import React, {Component} from 'react';
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import Card from "@material-ui/core/Card/Card";

class PointCard extends Component {
    render() {
        return (
            <div>
                <Card>
                    <CardHeader style={{background: "#2096F3"}}/>
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
            </div>
        );
    }
}

export default PointCard;