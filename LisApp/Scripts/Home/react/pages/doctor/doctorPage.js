﻿import React from 'react';
import { Trans } from 'react-i18next';
import CustomModal from '../../components/customModal';
import CustomTable from '../../components/customTable';
import CustomButton from '../../components/customButton';
import { getJson, postJson } from '../../services/rests';
import { withAlert } from 'react-alert';
import i18n from '../../i18n';
import OrderForm from './orderForm';
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

class DoctorPage extends React.Component {
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
        this.setOrderList();
    }
    componentDidUpdate() {
        if (this.state.actualLang !== i18n.language) {
            this.setOrderList();
            this.setLanguage();
        }
    }

    setOrderList() {
        getJson("Doctor/GetOrderList", response => {
            console.log(response);
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
            disableMode: row === null
        });
    };

    openAddModal = () => {
        this.setState({
            titleOfModal: "AddOrder",
            mode: "add"
        });
        this.modalRef.current.openModal();
    };

    getOrderAndOpenModal = () => {
        getJson("Doctor/GetOrder?id=" + this.state.actualRow.IdOrder, response => {
            if (response.status === 200) {
                response.json().then(responseJson => {
                    this.setState({ selectedData: responseJson.data });
                    this.modalRef.current.openModal();
                });
            }
        });
    }

    openEditModal = () => {
        this.setState({
            titleOfModal: "EditOrder",
            mode: "edit"
        });
        this.getOrderAndOpenModal();
    };

    openShowModal = () => {
        this.setState({
            titleOfModal: "Details",
            mode: "show"
        });
        this.getOrderAndOpenModal();
    };

    addNewOrder = () => {
        postJson("Doctor/AddNewOrder", this.formRef.current.getData(), response => {
            if (response.status === 200) {
                this.setOrderList();
                this.modalRef.current.closeModal();
                response.json().then(responseJson => {
                    this.props.alert.success(<Trans i18nKey="AddOrderSuccess" values={{ id: responseJson }} />);
                });
            } else {
                this.props.alert.error(<Trans>AddOrderError</Trans>);
            }
        });
    };

    closeModal = () => {
        this.modalRef.current.closeModal();
    }

    editOrder = () => {
        console.log(this.formRef.current.getData());
        postJson("Doctor/EditOrder", this.formRef.current.getData(), response => {
            if (response.status === 200) {
                this.setOrderList();
                this.modalRef.current.closeModal();
                response.json().then(responseJson => {
                    this.props.alert.success(<Trans i18nKey="EditOrderSuccess" values={{ id: responseJson }} />);
                });
            } else {
                this.props.alert.error(<Trans>EditOrderError</Trans>);
            }
        });
    };

    onAccept = () => {
        switch (this.state.mode) {
            case 'add':
                this.addNewOrder();
                break;
            case 'edit':
                this.editOrder();
                break;
            case 'show':
                return null;
        }
    };

    goToStudyList = () => {
        this.props.history.push("/doctorstudies");
    }

    render() {
        return (
            <div>
                <CustomButton onClick={this.openAddModal} text={<Trans>AddOrder</Trans>} image="order_add.png"/>
                <CustomButton onClick={this.openEditModal} text={<Trans>EditOrder</Trans>} disable={this.state.disableMode} image="order_edit.png"/>
                <CustomButton onClick={this.openShowModal} text={<Trans>Details</Trans>} disable={this.state.disableMode} image="order_show.png" />
                <CustomButton onClick={this.goToStudyList} text={<Trans>ListOfStudy</Trans>} image="study_go_to.png" />

                <CustomModal ref={this.modalRef}>
                    <OrderForm
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

export default withRouter(withAlert()(DoctorPage));