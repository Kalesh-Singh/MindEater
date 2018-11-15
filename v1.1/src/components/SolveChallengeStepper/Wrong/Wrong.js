import React, {Component} from 'react';
import WrongIcon from '@material-ui/icons/CloseOutlined';
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import classes from "./Wrong.module.css";

class Wrong extends Component {
    render() {
        return (
            <Paper elevation={14}>
                <div className={classes.Row}>
                    <WrongIcon style={{verticalAlign:"middle"}}/>
                    <Typography variant="h5" component="h3">
                        Wrong
                    </Typography>
                </div>
            </Paper>
        );
    }
}

export default Wrong;