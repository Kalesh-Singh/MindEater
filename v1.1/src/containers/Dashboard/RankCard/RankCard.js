import React, {Component} from 'react';
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import Divider from "@material-ui/core/Divider/Divider";
import classes from "../RankCard/RankCard.module.css";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Card from "@material-ui/core/Card/Card";
import fire from "../../../fire";
// ----------------- Rank Icon Imports ------------------
import Beginner from "../../../assets/svg/Rank Icons/Beginner.svg";
import Inexperienced from "../../../assets/svg/Rank Icons/Inexperienced.svg";
import Rookie from "../../../assets/svg/Rank Icons/Rookie.svg";
import Novice from "../../../assets/svg/Rank Icons/Novice.svg";
import Average from "../../../assets/svg/Rank Icons/Average.svg";
import Reasonable from "../../../assets/svg/Rank Icons/Average.svg";
import AboveAverage from "../../../assets/svg/Rank Icons/AboveAverage.svg";
import Competent from "../../../assets/svg/Rank Icons/Competent.svg";
import HighlyCompetent from "../../../assets/svg/Rank Icons/HighlyCompetent.svg";
import Veteran from "../../../assets/svg/Rank Icons/Veteran.svg";
import Distinguished from "../../../assets/svg/Rank Icons/Distinguished.svg";
import HighlyDistinguished from "../../../assets/svg/Rank Icons/HighlyDistinguished.svg";
import Professional from "../../../assets/svg/Rank Icons/Professional.svg";
import Star from "../../../assets/svg/Rank Icons/Star.svg";
import Master from "../../../assets/svg/Rank Icons/Master.svg";
import Outstanding from "../../../assets/svg/Rank Icons/Outstanding.svg";
import Supreme from "../../../assets/svg/Rank Icons/Supreme.svg";
import Champion from "../../../assets/svg/Rank Icons/Champion.svg";
import Heroic from "../../../assets/svg/Rank Icons/Heroic.svg";
import Legendary from "../../../assets/svg/Rank Icons/Legendary.svg";
import Elite from "../../../assets/svg/Rank Icons/Elite.svg";
import GrandMaster from "../../../assets/svg/Rank Icons/GrandMaster.svg";
// --------------------------------------------------------



class RankCard extends Component {

    state = {
        rankIcon: Beginner,
        rankTitle: "Beginner",
        rankDescription: "Still a long way to the top!",
        rankColor: {background:"#000"},
        rankFeed: "Welcome to MindEater!"
    };

    componentDidMount() {
        fire.auth().onAuthStateChanged(this.updateRank);
        const user = fire.auth().currentUser;
        if (user) {
            this.updateRank(user);
        }
    }
    updateRank = (user) => {
        if (user) {
            fire.database().ref('/users/' + user.uid + '/points')
                .once('value')
                .then(snapshot => {
                    if (snapshot.val()) {
                        this.setState(this.getStateFromPoints(snapshot.val()));
                    }
                })
                .catch(error => {
                    alert(error.message)
                });
            this.setListener(user);
        }
    };
    setListener = (user) => {
        fire.database().ref('/users/' + user.uid + '/points')
            .on('child_changed', snapshot => {
                this.setState(this.getStateFromPoints(snapshot.val()))
            });
    };

    getStateFromPoints = (points) => {
        if (!points) {
            return ({rankIcon: Beginner, rankTitle: "Beginner", rankDescription: "Still a long way to the top!", rankFeed: "Welcome to MindEater", rankColor:{background:"#BC6428"}});
        }
        if (points >= 462) {
            return ({rankIcon: GrandMaster, rankTitle: "Grandmaster", rankDescription: "Earned 462+ points!", rankFeed:"\ud83c\udf96 Rumor has it the creators of this site are the only Grandmasters...welcome to the big leagues champ \ud83c\udf96", rankColor:{background:"#FFCB5B"}});
        } else if (points >= 420) {
            return ({rankIcon: Elite, rankTitle: "Elite", rankDescription: "Earned 420+ points!", rankFeed:"\uD83E\uDD2F 420 Points!?...oh that's right, YOU'RE A GENIUS \uD83E\uDD2F", rankColor:{background:"#E2E5E7"}});
        } else if (points >= 380) {
            return ({rankIcon: Legendary, rankTitle: "Legendary", rankDescription: "Earned 380+ points!", rankFeed:"\uD83E\uDD47 One of a kind MindEater \uD83E\uDD47", rankColor:{background:"#3CB54A"}});
        } else if (points >= 342) {
            return ({rankIcon: Heroic, rankTitle: "Heroic", rankDescription: "Earned 342+ points!", rankFeed:"\uD83C\uDFE0 Your second home \uD83C\uDFE0", rankColor:{background:"#E2E5E7"}});
        } else if (points >= 306) {
            return ({rankIcon: Champion, rankTitle: "Champion", rankDescription: "Earned 306+ points!", rankFeed:"\u1F3C6 Einstein \u1F3C6", rankColor:{background:"#E2E5E7"}});
        } else if (points >= 272) {
            return ({rankIcon: Supreme, rankTitle: "Supreme", rankDescription: "Earned 272+ points!", rankFeed:"\uD83D\uDD25 Supreme \uD83D\uDD25", rankColor:{background:"#E2E5E7"}});
        } else if (points >= 240) {
            return ({rankIcon: Outstanding, rankTitle: "Outstanding", rankDescription: "Earned 240+ points!", rankFeed:"\uD83E\uDDDE\u200D\u2642\uFE0F You're a Genie \uD83E\uDDDE\u200D\u2640\uFE0F", rankColor:{background:"#FFCB5B"}});
        } else if (points >= 210) {
            return ({rankIcon: Master, rankTitle: "Master", rankDescription: "Earned 210+ points!", rankFeed:"\uD83E\uDDE0 MindEater \uD83E\uDDE0", rankColor:{background:"#FFCB5B"}});
        } else if (points >= 182) {
            return ({rankIcon: Star, rankTitle: "Star", rankDescription: "Earned 182+ points!", rankFeed:"\uD83C\uDF1F Solid Gold \uD83C\uDF1F", rankColor:{background:"#FFCB5B"}});
        } else if (points >= 156) {
            return ({rankIcon: Professional, rankTitle: "Professional", rankDescription: "Earned 156+ points!", rankFeed:"\uD83D\uDC7E True Gamer \uD83D\uDC7E", rankColor:{background:"#EE2C39"}});
        } else if (points >= 132) {
            return ({rankIcon: HighlyDistinguished, rankTitle: "Highly Distinguished", rankDescription: "Earned 132+ points!", rankFeed:"\uD83E\uDDD9\u200D\u2640\uFE0F Yer a Wizard Harry! \uD83E\uDDD9\u200D\u2642\uFE0F", rankColor:{background:"#EE2C39"}});
        } else if (points >= 110) {
            return ({rankIcon: Distinguished, rankTitle: "Distinguished", rankDescription: "Earned 110+ points!", rankFeed:" \ud83d\ude0e THREE DIGITS!!! \ud83d\ude0e ", rankColor:{background:"#EE2C39"}});
        } else if (points >= 90) {
            return ({rankIcon: Veteran, rankTitle: "Veteran", rankDescription: "Earned 90+ points!", rankFeed:" \uD83D\uDC74 Veteran! \uD83D\uDC75", rankColor: {background:"#3689C9"}});
        } else if (points >= 72) {
            return ({rankIcon: HighlyCompetent, rankTitle: "Highly Competent", rankDescription: "Earned 72+ points!", rankFeed:"\uD83E\uDD14 Are you really gonna stop now? \uD83E\uDD14", rankColor: {background:"#3689C9"}});
        } else if (points >= 56) {
            return ({rankIcon: Competent, rankTitle: "Competent", rankDescription: "Earned 56+ points!", rankFeed:"\uD83E\uDDD0 You've done it! You are now...Competent \uD83E\uDDD0", rankColor: {background:"#3689C9"}});
        } else if (points >= 42) {
            return ({rankIcon: AboveAverage, rankTitle: "Above Average", rankDescription: "Earned 42+ points!", rankFeed:"\ud83d\ude1c Wow, just Average? \ud83d\ude1c", rankColor: {background:"#3CB54A"}});
        } else if (points >= 30) {
            return ({rankIcon: Reasonable, rankTitle: "Reasonable", rankDescription: "Earned 30+ points!", rankFeed:"Dedication pays off \uD83D\uDC4C", rankColor: {background:"#3CB54A"}});
        } else if (points >= 20) {
            return ({rankIcon: Average, rankTitle: "Average", rankDescription: "Earned 20+ points!", rankFeed:"\uD83E\uDD13 You deserve more challenges! \uD83E\uDD13", rankColor: {background:"#3CB54A"}});
        } else if (points >= 12) {
            return ({rankIcon: Novice, rankTitle: "Novice", rankDescription: "Earned 12+ points!", rankFeed:"\uD83D\uDE24 Is this the best you can do?? \uD83D\uDE24", rankColor: {background:"#3CB54A"}});
        } else if (points >= 6) {
            return ({rankIcon: Rookie, rankTitle: "Rookie", rankDescription: "Earned 6+ points!", rankFeed:"\uD83D\uDC69\u200D\uD83D\uDCBB The journey begins!! \uD83D\uDC68\u200D\uD83D\uDCBB", rankColor: {background:"#BC6428"}});
        } else if (points >= 2) {
            return ({rankIcon: Inexperienced, rankTitle: "Inexperienced", rankDescription: "Earned 2+ points!", rankFeed: "Do you really want to stay inexperienced? \uD83E\uDD2A", rankColor: {background:"#BC6428"}});
        } else {
            return ({rankIcon: Beginner, rankTitle: "Beginner", rankDescription: "Still a long way to the top!", rankFeed: "\uD83C\uDF8A Welcome to MindEater \uD83C\uDF8A", rankColor: {background:"#BC6428"}});
        }
    };

    render() {
        return (
            <div>
                <Card className={classes.CardStyle}>
                    <CardHeader style={this.state.rankColor}/>
                    <div className={classes.ImgWrapper}>
                        <img
                            className={classes.RankSvg}
                            alt={"Rank"}
                            src={this.state.rankIcon}>
                        </img>
                    </div>
                        <CardMedia
                            title={"Rank"}/>
                        <CardContent>
                            <Typography gutterBottom variant={"h4"} component={"h1"}>
                               Rank: {this.state.rankTitle}
                            </Typography>
                            <Typography component={'p'}>
                                {this.state.rankDescription}
                            </Typography>
                        </CardContent>
                    <Divider className={classes.Divider}/>
                    <CardActions>
                        <Typography gutterBottom variant={"h6"}>
                        {this.state.rankFeed}
                        </Typography>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default RankCard;