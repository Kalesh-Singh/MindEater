import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import Paper from "@material-ui/core/Paper/Paper";
import CorrectIcon from '@material-ui/icons/Check';
import classes from "./Correct.module.css";

class Correct extends Component {
    render() {
        return (
            <Paper elevation={1}>
                <div className={classes.Row}>
                    <Typography variant="h5" component="h3">
                        Correct!
                    </Typography>
                    <CorrectIcon/>
                </div>
            </Paper>
        );
    }
}

export default Correct;