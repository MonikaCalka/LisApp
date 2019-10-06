import React from 'react';
import { Trans } from 'react-i18next';
import CustomModal from '../../components/customModal';
import CustomTable from '../../components/customTable';
import CustomButton from '../../components/customButton';
import { getJson, postJson } from '../../services/rests';
import { withAlert } from 'react-alert';
import i18n from '../../i18n';
import LabForm from './labForm';
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

class LabPage extends React.Component {

    constructor(props) {
        super(props);
        this.modalRef = React.createRef();
        this.formRef = React.createRef();
        this.state = {
            data: [],
            actualLang: 'pl',
            actualRow: null,
            disableMode: true,
            disableStart: true,
            disableAddResult: true,
            disableVerify: true,
            titleOfModal: "",
            mode: "",
            postResult: "",
            selectedData: null,
            tabHeaders: [],
            tabCount: 0

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

    setStudyList = () => {
        getJson("Lab/GetStudyList", response => {
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
            disableStart: row === null || row.IdStatus !== 7,
            disableAddResult: row === null || row.IdStatus !== 3,
            disableVerify: row === null || row.IdStatus !== 4
        });
    };

    getStudyAndOpenModal = () => {
        this.getStudyByIdAndOpenModal(this.state.actualRow.IdStudy);
    }

    getStudyByIdAndOpenModal = (id) => {
        getJson("Lab/GetStudy?id=" + id, response => {
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
            mode: "show",
            tabHeaders: [
                { index: 0, name: 'Order' },
                { index: 1, name: 'Sample' },
                { index: 2, name: 'Tests' },
                { index: 3, name: 'Result' }
            ],
            tabCount: 4
        });
        this.getStudyAndOpenModal();
    };

    openStartModal = () => {
        this.setState({
            titleOfModal: "StartStudy",
            mode: "start",
            tabHeaders: [
                { index: 0, name: 'Order' },
                { index: 1, name: 'Sample' },
                { index: 2, name: 'Tests' }
            ],
            tabCount: 3
        });
        this.getStudyAndOpenModal();
    };

    openAddResultModal = () => {
        this.setState({
            titleOfModal: "AddResult",
            mode: "addResult",
            tabHeaders: [
                { index: 0, name: 'Order' },
                { index: 1, name: 'Sample' },
                { index: 2, name: 'Result' }
            ],
            tabCount: 3
        });
        this.getStudyAndOpenModal();
    };

    openVerifyModal = () => {
        this.setState({
            titleOfModal: "Verify",
            mode: "verify",
            tabHeaders: [
                { index: 0, name: 'Order' },
                { index: 1, name: 'Sample' },
                { index: 2, name: 'Tests' },
                { index: 3, name: 'Result' },
                { index: 4, name: 'Verification' }
            ],
            tabCount: 5
        });
        this.getStudyAndOpenModal();
    };

    openRepeatModal = () => {
        this.setState({
            titleOfModal: "Repeat",
            mode: "repeat",
            tabHeaders: [
                { index: 0, name: 'Order' },
                { index: 1, name: 'Sample' },
                { index: 2, name: 'Tests' },
                { index: 3, name: 'Result' },
                { index: 4, name: 'Repeating' }
            ],
            tabCount: 5
        });
        this.getStudyAndOpenModal();
    };

    closeModal = () => {
        this.modalRef.current.closeModal();
    }

    onStartStudy = () => {
        postJson("Lab/StartStudy", this.formRef.current.getData(), response => {
            if (response.status === 200) {
                this.setStudyList();
                this.modalRef.current.closeModal();
                this.props.alert.info(<Trans>StartStudyInfo</Trans>);
                this.setState({
                    disableStart: true,
                    disableAddResult: false,
                    disableVerify: true
                });
            } else {
                this.modalRef.current.closeModal();
                this.props.alert.error(<Trans>StartStudyError</Trans>);
            }
        });
    }

    onAddResult = () => {
        postJson("Lab/AddResult", this.formRef.current.getData(), response => {
            if (response.status === 200) {
                this.setStudyList();
                this.modalRef.current.closeModal();
                this.setState({
                    disableStart: true,
                    disableAddResult: true,
                    disableVerify: false
                });

                response.json().then(responseJson => {
                    this.props.alert.success(<Trans i18nKey="AddResultSuccess" values={{ id: responseJson }} />);
                });
            } else {
                this.modalRef.current.closeModal();
                this.props.alert.error(<Trans>AddResultError</Trans>);
            }
        });
    }

    onVerify = () => {
        postJson("Lab/AddVerify", this.formRef.current.getData(), response => {
            if (response.status === 200) {
                response.json().then(responseJson => {
                    this.setStudyList();
                    this.modalRef.current.closeModal();
                    if (responseJson.Result !== null ) {
                        this.props.alert.success(<Trans i18nKey="VerifySuccess" values = {{ id: responseJson.IdStudy }} />);
                    } else {
                        this.props.alert.success(<Trans i18nKey="RepeatSuccess" values={{ id: responseJson }} />);
                    }
                    this.setState({
                        disableStart: true,
                        disableAddResult: true,
                        disableVerify: true,
                        actualRow: null
                    });
                });
            } else {
                this.modalRef.current.closeModal();
                this.props.alert.error(<Trans>VerifyError</Trans>);
            }
        });
    }

    onRepeat = () => {
        postJson("Lab/RepeatStudy", this.formRef.current.getData(), response => {
            if (response.status === 200) {
                response.json().then(responseJson => {
                    this.setStudyList();
                    this.modalRef.current.closeModal();
                    this.setState({
                        actualRow: null
                    });
                    this.props.alert.success(<Trans i18nKey="RepeatSuccess" values={{ id: responseJson }} />);
                });
            } else {
                this.modalRef.current.closeModal();
                this.props.alert.error(<Trans>VerifyError</Trans>);
            }
        });
    }

    onAccept = () => {
        switch (this.state.mode) {
            case 'start':
                this.onStartStudy();
                break;
            case 'addResult':
                this.onAddResult();
                break;
            case 'verify':
                this.onVerify();
                break;
            case 'repeat':
                this.onRepeat();
                break;
            case 'show':
                return null;
        }
    };

    onChangeStudy = (id) => {
        this.modalRef.current.closeModal();
        this.setState({
            titleOfModal: "DetailsAndResult",
            mode: "show",
            tabHeaders: [
                { index: 0, name: 'Order' },
                { index: 1, name: 'Sample' },
                { index: 2, name: 'Tests' },
                { index: 3, name: 'Result' },
                { index: 4, name: 'Repeating' }
            ],
            tabCount: 5
        });
        this.getStudyByIdAndOpenModal(id);
    }

    render() {
        return (
            <div>
                <CustomButton onClick={this.openStartModal} text={<Trans>StartStudy</Trans>} disable={this.state.disableStart} image="study_start.png"/>
                <CustomButton onClick={this.openAddResultModal} text={<Trans>AddResult</Trans>} disable={this.state.disableAddResult} image="result_add.png" />
                <CustomButton onClick={this.openVerifyModal} text={<Trans>Verify</Trans>} disable={this.state.disableVerify} image="result_verify.png"/>
                <CustomButton onClick={this.openRepeatModal} text={<Trans>Repeat</Trans>} disable={this.state.disableMode} image="study_restart.png"/>
                <CustomButton onClick={this.openShowModal} text={<Trans>Details</Trans>} disable={this.state.disableMode} image="study_show.png"/>

                <CustomModal ref={this.modalRef}>
                    <LabForm
                        title={this.state.titleOfModal}
                        mode={this.state.mode}
                        data={this.state.selectedData}
                        ref={this.formRef}
                        onCancel={this.closeModal}
                        tabs={this.state.tabHeaders}
                        tabCount={this.state.tabCount}
                        onAccept={this.onAccept}
                        onChangeStudy={this.onChangeStudy}
                    />
                </CustomModal>

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

export default withRouter(withAlert()(LabPage));