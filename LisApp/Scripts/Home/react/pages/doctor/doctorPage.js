﻿import React from 'react';
import { Trans } from 'react-i18next';
import CustomModal from '../../components/customModal';
import CustomTable from '../../components/customTable';
import CustomButton from '../../components/customButton';
import { getJson, postJson } from '../../services/rests';
import { withAlert } from 'react-alert';
import i18n from '../../i18n';
import OrderForm from './orderForm';


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
        getJson("Doctor/GetOrderList", response => this.setState({ data: response.data }));
    }
    componentDidUpdate() {
        if (this.state.actualLang !== i18n.language) {
            getJson("Doctor/GetOrderList", response => this.setState({ data: response.data }));
            this.setLanguage();
        }
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
        //getJson("Registrar/GetPatient?id=" + this.state.actualRow.IdPatient, response => {
        //    this.setState({ selectedData: response });
        //    this.modalRef.current.openModal();
        //});
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
        //postJson("Registrar/AddNewPatient", this.formRef.current.getData(), response => {
        //    if (response === "Success") {
        //        getJson("Registrar/GetPatientList", response => this.setState({ data: response }));
        //        this.modalRef.current.closeModal();
        //        this.props.alert.success(<Trans>AddPatientSuccess</Trans>);
        //    } else {
        //        this.modalRef.current.closeModal();
        //        this.props.alert.error(<Trans>AddPatientError</Trans>);
        //    }
        //});
    };

    closeModal = () => {
        this.modalRef.current.closeModal();
    }

    editOrder = () => {
        //postJson("Registrar/EditPatient", this.formRef.current.getData(), response => {
        //    if (response === "Success") {
        //        getJson("Registrar/GetPatientList", response => this.setState({ data: response }));
        //        this.modalRef.current.closeModal();
        //        this.props.alert.success(<Trans>EditPatientSuccess</Trans>);

        //    } else {
        //        this.modalRef.current.closeModal();
        //        this.props.alert.error(<Trans>EditPatientError</Trans>);
        //    }
        //});
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

    render() {
        return (
            <div>
                <CustomButton onClick={this.openAddModal} text={<Trans>AddOrder</Trans>} />
                <CustomButton onClick={this.openEditModal} text={<Trans>EditOrder</Trans>} disable={this.state.disableMode} />
                <CustomButton onClick={this.openShowModal} text={<Trans>Details</Trans>} disable={this.state.disableMode} />

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
                />
            </div>
        );
    }
}

export default withAlert()(DoctorPage);