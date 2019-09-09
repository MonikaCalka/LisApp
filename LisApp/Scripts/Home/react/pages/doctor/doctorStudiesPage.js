import React from 'react';
import { Trans } from 'react-i18next';
import CustomModal from '../../components/customModal';
import CustomTable from '../../components/customTable';
import CustomButton from '../../components/customButton';
import { getJson } from '../../services/rests';
import { withAlert } from 'react-alert';
import i18n from '../../i18n';
import StudyForm from './studyForm';


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

class DoctorStudiesPage extends React.Component {
    constructor(props) {
        super(props);
        this.modalRef = React.createRef();
        this.formRef = React.createRef();
        this.state = {
            data: [],
            actualRow: null,
            actualLang: 'pl',
            disableMode: true,
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
        getJson("Doctor/GetStudyList", response => this.setState({ data: response.data }));
    }
    setLanguage() {
        this.setState({ actualLang: i18n.language });
    }

    rowClick = (row) => {
        this.setState({
            actualRow: row,
            disableMode: row === null
        });
    };

    getStudyAndOpenModal = () => {
        getJson("Doctor/GetStudy?id=" + this.state.actualRow.IdStudy, response => {
            this.setState({ selectedData: response });
            this.modalRef.current.openModal();
            console.log(response);
        });
    }

    openShowModal = () => {
        this.setState({
            titleOfModal: "DetailsAndResult",
            mode: "show"
        });
        this.getStudyAndOpenModal();
    };

    closeModal = () => {
        this.modalRef.current.closeModal();
    }

    render() {
        return (
            <div>
                <CustomButton onClick={this.openShowModal} text={<Trans>DetailsAndResult</Trans>} disable={this.state.disableMode} />

                <CustomModal ref={this.modalRef}>
                    <StudyForm
                        title={this.state.titleOfModal}
                        mode={this.state.mode}
                        data={this.state.selectedData}
                        ref={this.formRef}
                        onAccept={this.onAccept}
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

export default withAlert()(DoctorStudiesPage);