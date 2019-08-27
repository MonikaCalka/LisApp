import React from 'react';
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
        this.setOrderList();
    }
    componentDidUpdate() {
        if (this.state.actualLang !== i18n.language) {
            this.setOrderList();
            this.setLanguage();
        }
    }

    setOrderList() {
        getJson("Doctor/GetOrderList", response => this.setState({ data: response.data }));
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
            this.setState({ selectedData: response });
            this.modalRef.current.openModal();
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
            if (response === "Success") {
                this.setOrderList();
                this.modalRef.current.closeModal();
                this.props.alert.success(<Trans>AddOrderSuccess</Trans>);
            } else {
                this.modalRef.current.closeModal();
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
            if (response === "Success") {
                this.setOrderList();
                this.modalRef.current.closeModal();
                this.props.alert.success(<Trans>EditOrderSuccess</Trans>);

            } else {
                this.modalRef.current.closeModal();
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
                    idName="IdOrder"
                />
            </div>
        );
    }
}

export default withAlert()(DoctorPage);