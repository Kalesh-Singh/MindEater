import React, {Component} from 'react';
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import classes from "./Puzzled.module.css";
import PuzzledIcon from '@material-ui/icons/HelpOutline';

class Puzzled extends Component {
    render() {
        return (
            <Paper elevation={14}>
                <div className={classes.Row}>
                    <Typography variant="h5" component="h3">Hmm...</Typography>
                </div>
            </Paper>
        );
    }
}

export default Puzzled;