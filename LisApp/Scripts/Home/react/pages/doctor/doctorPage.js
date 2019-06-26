import React from 'react';
import { Trans } from 'react-i18next';
import CustomModal from '../../components/customModal';

class DoctorPage extends React.Component {
    constructor(props) {
        super(props);
        this.modalRef = React.createRef();
    }

    openModal = () => {
        this.modalRef.current.openModal();
    }

    render() {
        return (
            <div>
                Trust me I'm DOGTOR :3
                <Trans>Welcome to React</Trans>
                <button onClick={this.openModal}>Modal</button>
                <CustomModal onAccept={this.openModal} ref={this.modalRef}>Piszę ja</CustomModal>
            </div>
        );
    }
}

export default DoctorPage;