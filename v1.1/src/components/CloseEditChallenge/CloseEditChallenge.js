import React, {Component} from 'react';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton/IconButton";
import ChallengeIncompleteDialog
    from "./ChallengeIncompleteDialog/ChallengeIncompleteDialog";
import ChallengeNotSavedDialog from "./ChallengeNotSavedDialog/ChallengeNotSavedDialog";
import ChangesNotSaved from "./ChangesNotSaved/ChangesNotSaved";

class CloseEditChallenge extends Component {

    // Expect props:
    // 1. closeChallengeDialog  (func)
    // 2. deleteChallenge       (func)
    // 3. saveChallenge         (func)
    // 3. challengeValid        (bool)
    // 4. challengePartial      (bool)

    state = {
        openIncomplete: false,
        openChallengeNotSaved: false,
        openChangesNotSaved: false
    };

    handleClickOpenIncomplete = () => {
        this.setState({openIncomplete: true});
    };

    handleCloseIncomplete = () => {
        this.setState({openIncomplete: false});
    };

    handleClickOpenChallengeNotSaved = () => {
        this.setState({openChallengeNotSaved: true});
    };

    handleCloseChallengeNotSaved = () => {
        this.setState({openChallengeNotSaved: false});
    };

    handleClickOpenChangesNotSaved = () => {
        this.setState({openChangesNotSaved: true});
    };

    handleCloseChangesNotSaved = () => {
        this.setState({openChangesNotSaved: false});
    };

    render() {

        console.log("Challenge Valid", this.props.challengeValid);
        console.log("Challenge Partial", this.props.challengePartial);

        let openCloseDialog;

        if (!this.props.challengeValid) {
            console.log('All changes will be discarded -- Discard Changes, Cancel');
            openCloseDialog = this.handleClickOpenIncomplete;
        } else if (this.props.challengePartial) {
            console.log('Do you want to save the challenge -- No, Yes');
            openCloseDialog = this.handleClickOpenChallengeNotSaved;
        } else {
            console.log('Do you want to save any changes made -- No, Yes');
            openCloseDialog = this.handleClickOpenChangesNotSaved;
        }

        return (
            <>
                <IconButton
                    color="inherit"
                    onClick={openCloseDialog}>
                    <CloseIcon/>
                </IconButton>
                <ChallengeIncompleteDialog
                    open={this.state.openIncomplete}
                    closed={this.handleCloseIncomplete}
                    closeChallengeDialog={this.props.closeChallengeDialog}
                    deleteChallenge={this.props.deleteChallenge}
                    saveChallenge={this.props.saveChallenge}
                />
                <ChallengeNotSavedDialog
                    open={this.state.openChallengeNotSaved}
                    closed={this.handleCloseChallengeNotSaved}
                    closeChallengeDialog={this.props.closeChallengeDialog}
                    deleteChallenge={this.props.deleteChallenge}
                    saveChallenge={this.props.saveChallenge}
                />
                <ChangesNotSaved
                    open={this.state.openChangesNotSaved}
                    closed={this.handleCloseChangesNotSaved}
                    closeChallengeDialog={this.props.closeChallengeDialog}
                    deleteChallenge={this.props.deleteChallenge}
                    saveChallenge={this.props.saveChallenge}
                />
            </>
        );
    }
}

export default CloseEditChallenge;


{/*
<IconButton color="inherit" onClick={this.handleCancel(validForm)} aria-label="Close">
    <CloseIcon/>
</IconButton>*/
}
