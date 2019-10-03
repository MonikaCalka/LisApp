import React from 'react';
import { Trans } from 'react-i18next';
import CustomModal from '../../components/customModal';
import CustomTable from '../../components/customTable';
import CustomButton from '../../components/customButton';
import { getJson, getUrl } from '../../services/rests';
import { withAlert } from 'react-alert';
import i18n from '../../i18n';
import PatientStudyForm from './patientStudyForm';
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
        name: <Trans>Profile</Trans>,
        selector: 'Profile',
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

const searchableColumn = [{ name: "DateOfOrder", id: 0 }, { name: "Profile", id: 1 }, { name: "Status", id: 2 }, { name: "Priority", id: 3 }];

class PatientPage extends React.Component {
    constructor(props) {
        super(props);
        this.modalRef = React.createRef();
        this.state = {
            data: [],
            actualRow: null,
            actualLang: 'pl',
            disableMode: true,
            disableReport: true,
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
        getJson("Patient/GetStudyList", response => {
            if (response.status === 200) {
                response.json().then(responseJson => {
                    this.setState({ data: responseJson.data });
                });
            } else {
                response.json().then(responseJson => {
                    if (responseJson.needLogin === true) {
                        localStorage.setItem("token", null);
                        localStorage.setItem("login", "");
                        localStorage.setItem("userType", null);
                        this.props.history.push("/login");
                    }
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
            disableReport: row === null || row.IdStatus !== 5
        });
    };

    getStudyAndOpenModal = (id) => {
        getJson("Patient/GetStudy?id=" + id, response => {
            if (response.status === 200) {
                response.json().then(responseJson => {
                    this.setState({ selectedData: responseJson.data });
                    this.modalRef.current.openModal();
                    console.log(response);
                });
            }
            console.log(response);
        });
    }

    getReport = () => {
        let win = window.open(getUrl + "Patient/GetReport?id=" + this.state.actualRow.IdStudy + "&lang=" + i18n.language + "&t="
            + localStorage.getItem("token").toString().replace('+', 'xMl3Jkaaswss').replace('/', 'Por21Ld105sE78').replace('=', 'Ml32XXASsd1dd')
            , "_blank");
        win.focus;
    }

    openShowModal = () => {
        this.setState({
            titleOfModal: "DetailsAndResult",
            mode: "show"
        });
        this.getStudyAndOpenModal(this.state.actualRow.IdStudy);
    };

    closeModal = () => {
        this.modalRef.current.closeModal();
    }

    onChangeStudy = (id) => {
        this.modalRef.current.closeModal();
        this.setState({
            titleOfModal: "DetailsAndResult",
            mode: "show"
        });
        this.getStudyAndOpenModal(id);
    }

    render() {
        return (
            <div>
                <CustomButton onClick={this.openShowModal} text={<Trans>DetailsAndResult</Trans>} disable={this.state.disableMode} image="study_show.png"/>
                <CustomButton onClick={this.getReport} text={<Trans>Report</Trans>} disable={this.state.disableReport} image="result_report.png"/>

                <CustomModal ref={this.modalRef}>
                    <PatientStudyForm
                        title={this.state.titleOfModal}
                        mode={this.state.mode}
                        data={this.state.selectedData}
                        ref={this.formRef}
                        onAccept={this.onAccept}
                        onCancel={this.closeModal}
                        onChangeStudy={this.onChangeStudy}
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

export default withRouter(withAlert()(PatientPage));