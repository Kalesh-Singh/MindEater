import React, {Component} from 'react';
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Typography from "@material-ui/core/Typography/Typography";
import Slide from "@material-ui/core/Slide/Slide";
import CloseIcon from '@material-ui/icons/Close';
import CreateQuestionDialog from "../CreateQuestionDialog/CreateQuestionDialog";
import TextField from "@material-ui/core/TextField/TextField";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";

import classes from "./CreateChallengeDialog.module.css";

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class CreateChallengeDialog extends Component {

    state = {
        open: false,
        title: '',
        description: '',
        hasQuestion: false
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleFieldChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    render() {
        return (
            <div>
                <Button onClick={this.handleClickOpen}>New Challenge</Button>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar style={{position: 'relative'}}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography variant="h6" color="inherit" style={{flex: '1'}}>
                                New Challenge
                            </Typography>
                            <Button
                                color="inherit"
                                disabled={!this.state.hasQuestion}
                                onClick={this.handleClose}>
                                Save
                            </Button>
                        </Toolbar>
                    </AppBar>

                    <DialogContent className={classes.root}>
                        <form>
                            <TextField
                                label="Title"
                                multiline
                                rowsMax="4"
                                margin="normal"
                                fullWidth
                                onChange={this.handleFieldChange('title')}
                            />
                            <TextField
                                label="Description"
                                multiline
                                rowsMax="4"
                                margin="normal"
                                fullWidth
                                onChange={this.handleFieldChange('description')}
                            />
                            <h4>Questions</h4>
                            <CreateQuestionDialog disabled={!this.state.hasQuestion}/>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default CreateChallengeDialog;