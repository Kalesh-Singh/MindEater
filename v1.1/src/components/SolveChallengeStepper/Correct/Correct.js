import React from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import Paper from "@material-ui/core/Paper/Paper";
import CorrectIcon from '@material-ui/icons/CheckOutlined';
import classes from "./Correct.module.css";

function Correct() {
    return (
        <Paper elevation={1}>
            <div className={classes.Row}>
                <CorrectIcon style={{verticalAlign:"middle"}}/>
                <Typography variant="h5" component="h3">
                    Correct!
                </Typography>
            </div>
        </Paper>
    );
}

export default Correct;