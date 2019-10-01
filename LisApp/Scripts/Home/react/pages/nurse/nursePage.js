import React from 'react';
import { Trans } from 'react-i18next';
import CustomModal from '../../components/customModal';
import CustomTable from '../../components/customTable';
import CustomButton from '../../components/customButton';
import { getJson } from '../../services/rests';
import { withAlert } from 'react-alert';
import i18n from '../../i18n';
import NurseOrderForm from './nurseOrderForm';
import { withRouter } from 'react-router-dom';

const columns = [
    {
        name: <Trans>OrderId</Trans>,
        selector: 'IdOrder',
        sortable: true
    },
    {
        name: <Trans>Patient</Trans>,
        selector: 'PatientName',
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

const titleOfTable = <Trans>Orders</Trans>;

const searchableColumn = [{ name: "PatientName", id: 0 }, { name: "DateOfOrder", id: 1 }, { name: "Status", id: 2 }, { name: "Priority", id: 3 }];

class NursePage extends React.Component {

    constructor(props) {
        super(props);
        this.modalRef = React.createRef();
        this.formRef = React.createRef();
        this.state = {
            data: [],
            actualLang: 'pl',
            actualRow: null,
            disableMode: true,
            titleOfModal: "",
            mode: "",
            postResult: "",
            selectedData: null
        };
    }

    componentDidMount() {
        this.getData();
    }
    componentDidUpdate() {
        if (this.state.actualLang !== i18n.language) {
            this.getData();
            this.setLanguage();
        }
    }

    getData = () => {
        getJson("Nurse/GetOrderList", response => {
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
            disableMode: row === null
        });
    };

    getOrderAndOpenModal = () => {
        getJson("Nurse/GetOrder?id=" + this.state.actualRow.IdOrder, response => {
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
        this.getOrderAndOpenModal();
    };

    closeModal = () => {
        this.modalRef.current.closeModal();
    }

    goToStudyList = () => {
        this.props.history.push("/nursestudies");
    }

    render() {
        return (
            <div>
                <CustomButton onClick={this.openShowModal} text={<Trans>Details</Trans>} disable={this.state.disableMode} image="order_show.png" />
                <CustomButton onClick={this.goToStudyList} text={<Trans>ListOfStudy</Trans>} image="study_go_to.png" />

                <CustomModal ref={this.modalRef}>
                    <NurseOrderForm
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
                    idName="IdOrder"
                    searchableColumn={searchableColumn}
                />
            </div>
        );
    }
}

export default withRouter(withAlert()(NursePage));