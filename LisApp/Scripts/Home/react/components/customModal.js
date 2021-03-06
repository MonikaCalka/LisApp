﻿import React from 'react';
import Modal from 'react-modal';
import { Trans } from 'react-i18next';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#app');

class CustomModal extends React.Component {

    state = {
        modalIsOpen: false
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal = () => {
        if (typeof this.props.afterOpenModal === "function")
            this.props.afterOpenModal();
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    onAccept = () => {
        this.setState({ modalIsOpen: false });
        if (typeof this.props.onAccept === "function")
            this.props.onAccept();
    }

    render() {
        return (
            <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                width="200px"
                shouldCloseOnOverlayClick={false}
            >
                {this.props.children}
            </Modal>
        );
    }
}

export default CustomModal;