import React, {Component} from 'react';
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import Card from "@material-ui/core/Card/Card";
import Divider from "@material-ui/core/Divider/Divider";
import classes from "./PointCard.module.css"
import Android from "@material-ui/icons/AndroidOutlined";
import fire from "../../../fire";

class PointCard extends Component {

    state = {
        points: 0
    };

    componentDidMount() {
        fire.auth().onAuthStateChanged(this.updatePoints);
    }
    updatePoints = (user) => {
        if (user) {
            fire.database().ref('/users/' + user.uid + '/points')
                .once('value')
                .then(snapshot => {
                    if (snapshot.val()) {
                        this.setState({points: snapshot.val()});
                    }
                })
                .catch(error => {
                    alert(error.message)
                });

            this.setState({username: user.displayName});
            this.setListener(user);
        }
    };
    setListener = (user) => {
        fire.database().ref('/users/' + user.uid + '/points')
            .on('child_changed', snapshot => {
                this.setState({points: snapshot.val()})
            });
    };

    render() {
        return (
            <div>
                <Card className={classes.CardStyle}>
                    <CardHeader style={{background: "#d60000"}}/>
                        <CardMedia
                            title={"Points"}/>
                    <div style ={{marginTop:20}}>
                        <div className={classes.Box}>
                            <Android style={{width:70, height:70, color:"white"}}/>
                        </div>
                    </div>
                        <CardContent>
                            <Typography gutterBottom variant={"h4"} component={"h1"}>
                                Points: {this.state.points}
                            </Typography>
                        </CardContent>
                    <Divider className={classes.Divider}/>
                </Card>
            </div>
        );
    }
}

export default PointCard;