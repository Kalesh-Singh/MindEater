import React, {Component} from 'react';
import {Button} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import withMobileDialog from "@material-ui/core/es/withMobileDialog/withMobileDialog";

import classes from './CreateQuestionDialog.module.css';
import TextField from "@material-ui/core/TextField/TextField";
import Options from "./Options/Options";

class CreateQuestionDialog extends Component {

    state = {
        open: false,
        question: '',
        hint: '',
        explanation: '',
        optionsValue: 'no options entered',
        options: ['', '', '', ''],
        correctOption: null
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = event => {
        this.setState({optionsValue: event.target.value, correctOption: event.target.value});
    };

    handleOptionChange = index => event => {
        const updatedOptions = [...this.state.options];
        updatedOptions[index] = event.target.value.trim();
        this.setState({options: updatedOptions});
    };

    handleFieldChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    handleSave = (event) => {
        event.preventDefault();
        console.log('Create question');
        this.handleClose();
    };

    handleCancel = (event) => {
        event.preventDefault();
        console.log('Canceled Create Question');
        this.handleClose();
    };

    render() {
        console.log(this.state);
        const { fullScreen } = this.props;
        return (
            <div>
                <Button onClick={this.handleClickOpen}>Add Question</Button>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">Create Question</DialogTitle>
                    <DialogContent className={classes.root}>
                        <form className={classes.Form}>
                            <TextField
                                label="Question"
                                multiline
                                rowsMax="4"
                                margin="normal"
                                fullWidth
                                onChange={this.handleFieldChange('question')}
                            />
                            <Options
                                options={this.state.options}
                                textChanged={this.handleOptionChange}
                                value={this.state.optionsValue}
                                changed={this.handleChange}
                            />
                            <TextField
                                label="Hint"
                                multiline
                                rowsMax="4"
                                margin="normal"
                                fullWidth
                                onChange={this.handleFieldChange('hint')}
                            />
                            <TextField
                                label="Explanation"
                                multiline
                                rowsMax="4"
                                margin="normal"
                                fullWidth
                                onChange={this.handleFieldChange('explanation')}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={this.handleCancel}
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.handleSave}
                            color="primary" autoFocus
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withMobileDialog('xs')(CreateQuestionDialog);