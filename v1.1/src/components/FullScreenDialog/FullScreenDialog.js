import React, {Component} from 'react';
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Typography from "@material-ui/core/Typography/Typography";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Divider from "@material-ui/core/Divider/Divider";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Slide from "@material-ui/core/Slide/Slide";
import CloseIcon from '@material-ui/icons/Close';
import CreateQuestionDialog from "../CreateQuestionDialog/CreateQuestionDialog";

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends Component {

    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
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
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" style={{flex: '1'}}>
                                New Challenge
                            </Typography>
                            <Button color="inherit" onClick={this.handleClose}>
                                Save
                            </Button>
                        </Toolbar>
                    </AppBar>
                    {/* TODO: Remove list and add challenge form here*/}
                    <List>
                        <ListItem button>
                            <ListItemText primary="Phone ringtone" secondary="Titania" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                        </ListItem>
                    </List>
                    <CreateQuestionDialog/>
                </Dialog>
            </div>
        );
    }
}

export default FullScreenDialog;