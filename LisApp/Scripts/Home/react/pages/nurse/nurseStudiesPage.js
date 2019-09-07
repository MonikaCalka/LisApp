import React from 'react';
import { Trans } from 'react-i18next';
import CustomModal from '../../components/customModal';
import CustomTable from '../../components/customTable';
import CustomButton from '../../components/customButton';
import { getJson, postJson } from '../../services/rests';
import { withAlert } from 'react-alert';
import i18n from '../../i18n';
import NurseStudyForm from './nurseStudyForm';


const columns = [
    {
        name: <Trans>OrderId</Trans>,
        selector: 'IdOrder',
        sortable: true
    },
    {
        name: <Trans>StudyId</Trans>,
        selector: 'IdStudy',
        sortable: true,
        wrap: true
    },
    {
        name: <Trans>Patient</Trans>,
        selector: 'Patient',
        sortable: true,
        wrap: true
    },
    {
        name: <Trans>DateOfOrder</Trans>,
        selector: 'DateOfOrder',
        sortable: true,
        wrap: true
    },
    {
        name: <Trans>Profile</Trans>,
        selector: 'Profile',
        sortable: true,
        wrap: true
    },
    {
        name: <Trans>Status</Trans>,
        selector: 'Status',
        sortable: true,
        wrap: true
    },
    {
        name: <Trans>Priority</Trans>,
        selector: 'Priority',
        sortable: true,
        wrap: true
    }
];

const titleOfTable = <Trans>Studies</Trans>;

class NurseStudiesPage extends React.Component {
    constructor(props) {
        super(props);
        this.modalRef = React.createRef();
        this.formRef = React.createRef();
        this.state = {
            data: [],
            actualRow: null,
            actualLang: 'pl',
            disableMode: true,
            disableRegister: true,
            titleOfModal: "",
            mode: "",
            postResult: "",
            selectedData: null
        };
    }

    componentDidMount() {
        this.setStudyList();
    }
    componentDidUpdate() {
        if (this.state.actualLang !== i18n.language) {
            this.setStudyList();
            this.setLanguage();
        }
    }

    setStudyList() {
        getJson("Nurse/GetStudyList", response => this.setState({ data: response.data }));
    }
    setLanguage() {
        this.setState({ actualLang: i18n.language });
    }

    rowClick = (row) => {
        this.setState({
            actualRow: row,
            disableMode: row === null,
            disableRegister: row === null || row.IdStatus !== 1
        });
    };

    getStudyAndOpenModal = () => {
        getJson("Nurse/GetStudy?id=" + this.state.actualRow.IdStudy, response => {
            this.setState({ selectedData: response });
            this.modalRef.current.openModal();
            console.log(response);
        });
    }

    openShowModal = () => {
        this.setState({
            titleOfModal: "Details",
            mode: "show"
        });
        this.getStudyAndOpenModal();
    };

    openRegisterSampleModal = () => {
        this.setState({
            titleOfModal: "RegisterSample",
            mode: "show"
        });
        this.getStudyAndOpenModal();
    };

    closeModal = (refreshTable) => {
        this.modalRef.current.closeModal();

        if (refreshTable) {
            this.setStudyList();
        }
    }


    render() {
        return (
            <div>
                <CustomButton onClick={this.openRegisterSampleModal} text={<Trans>RegisterSample</Trans>} disable={this.state.disableRegister} />
                <CustomButton onClick={this.openShowModal} text={<Trans>Details</Trans>} disable={this.state.disableMode} />

                <CustomModal ref={this.modalRef}>
                    <NurseStudyForm
                        title={this.state.titleOfModal}
                        mode={this.state.mode}
                        data={this.state.selectedData}
                        ref={this.formRef}
                        onCancel={this.closeModal}
                    />
                </CustomModal>
                <br />

                <CustomTable key={i18n.language}
                    titleOfTable={titleOfTable}
                    columns={columns}
                    data={this.state.data}
                    onRowClicked={this.rowClick}
                    idName="IdStudy"
                />
            </div>
        );
    }
}

export default withAlert()(NurseStudiesPage);