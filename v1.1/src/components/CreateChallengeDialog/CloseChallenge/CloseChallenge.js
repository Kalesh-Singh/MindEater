import React, {Component} from 'react';
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import ChallengeIncompleteDialog from "./ChallengeIncompleteDialog/ChallengeIncompleteDialog";

class CloseChallenge extends Component {
    // Expected props:
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

    render() {
        let closeAction;
        if (!this.props.challengeValid) {
            closeAction = this.handleClickOpenIncomplete;
        } else {
            closeAction = this.props.closeChallengeDialog();
        }
        return (
            <>
                <IconButton
                    color="inherit"
                    onClick={closeAction}>
                    <CloseIcon/>
                </IconButton>
                <ChallengeIncompleteDialog
                    open={this.state.openIncomplete}
                    closed={this.handleCloseIncomplete}
                    closeChallengeDialog={this.props.closeChallengeDialog}
                    deleteChallenge={this.props.deleteChallenge}
                    saveChallenge={this.props.saveChallenge}
                />
            </>
        );
    }
}

export default CloseChallenge;