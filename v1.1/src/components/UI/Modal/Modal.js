import React, {Component} from 'react';

class Modal extends Component {

    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default Modal;