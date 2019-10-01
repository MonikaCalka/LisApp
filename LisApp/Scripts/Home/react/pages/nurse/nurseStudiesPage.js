import React from 'react';
import { Trans } from 'react-i18next';
import CustomModal from '../../components/customModal';
import CustomTable from '../../components/customTable';
import CustomButton from '../../components/customButton';
import { getJson } from '../../services/rests';
import { withAlert } from 'react-alert';
import i18n from '../../i18n';
import NurseStudyForm from './nurseStudyForm';
import { withRouter } from 'react-router-dom';


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

const searchableColumn = [{ name: "Patient", id: 0 }, { name: "DateOfOrder", id: 1 }, { name: "Profile", id: 2 }, { name: "Status", id: 3 }, { name: "Priority", id: 4 }];

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
        getJson("Nurse/GetStudyList", response => {
            if (response.status === 200) {
                response.json().then(responseJson => {
                    this.setState({ data: responseJson.data });
                });
            }
        });
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
            if (response.status === 200) {
                response.json().then(responseJson => {
                    this.setState({ selectedData: responseJson });
                    this.modalRef.current.openModal();
                });
            }
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
            mode: "addSample"
        });
        this.getStudyAndOpenModal();
    };

    closeModal = (refreshTable) => {
        this.modalRef.current.closeModal();

        if (refreshTable) {
            this.setStudyList();
        }
    }

    goToOrderList = () => {
        this.props.history.push("/nurse");
    }

    render() {
        return (
            <div>
                <CustomButton onClick={this.openRegisterSampleModal} text={<Trans>RegisterSample</Trans>} disable={this.state.disableRegister} image="sample_add.png" />
                <CustomButton onClick={this.openShowModal} text={<Trans>Details</Trans>} disable={this.state.disableMode} image="study_show.png" />
                <CustomButton onClick={this.goToOrderList} text={<Trans>ListOfOrder</Trans>} image="order_go_to.png" />

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
                    searchableColumn={searchableColumn}
                />
            </div>
        );
    }
}

export default withRouter(withAlert()(NurseStudiesPage));