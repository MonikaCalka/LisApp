import React from 'react';
import { Trans } from 'react-i18next';
import CustomModal from '../../components/customModal';
import CustomTable from '../../components/customTable';
import CustomButton from '../../components/customButton';
import { getJson, postJson } from '../../services/rests';
import i18n from '../../i18n';
import EmployeeForm from './employeeForm';
import { withAlert } from 'react-alert';

const columns = [
    {
        name: <Trans>Login</Trans>,
        selector: 'Login',
        sortable: true
    },
    {
        name: <Trans>FirstName</Trans>,
        selector: 'FirstName',
        sortable: true,
        wrap: true
    },
    {
        name: <Trans>LastName</Trans>,
        selector: 'Surname',
        sortable: true,
        wrap: true
    },
    {
        name: <Trans>Address</Trans>,
        selector: 'FullAddress',
        sortable: true,
        wrap: true
    },
    {
        name: <Trans>Position</Trans>,
        selector: 'Position',
        sortable: true,
        wrap: true
    },
    {
        name: <Trans>Phone</Trans>,
        selector: 'Phone',
        sortable: true,
        wrap: true
    },
    {
        name: <Trans>Email</Trans>,
        selector: 'Email',
        sortable: true,
        wrap: true
    }
];

const titleOfTable = <Trans>Employees</Trans>;

class AdminPage extends React.Component {

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
        getJson("Admin/GetEmployeeList", response => this.setState({ data: response }));
    }
    componentDidUpdate() {
        if (this.state.actualLang !== i18n.language) {
            getJson("Admin/GetEmployeeList", response => this.setState({ data: response }));
            this.setLanguage();
        }
    }

    rowClick = (row, index) => {
        this.setState({
            actualRow: row,
            disableMode: row === null
        });

    };

    setLanguage() {
        this.setState({ actualLang: i18n.language });
    }

    openAddModal = () => {
        this.setState({
            titleOfModal: "AddEmployee",
            mode: "add"
        });
        this.modalRef.current.openModal();
    };

    getEmployeeAndOpenModal = () => {
        getJson("Admin/GetEmployee?id=" + this.state.actualRow.IdEmployee, response => {
            this.setState({ selectedData: response });
            this.modalRef.current.openModal();
        });
    }

    openEditModal = () => {
        this.setState({
            titleOfModal: "EditEmployee",
            mode: "edit"
        });
        this.getEmployeeAndOpenModal();
    };

    openShowModal = () => {
        this.setState({
            titleOfModal: "Details",
            mode: "show"
        });
        this.getEmployeeAndOpenModal();
    };

    addNewEmployee = () => {
        postJson("Admin/AddNewEmployee", this.formRef.current.getData(), response => {
            if (response === "Success") {
                getJson("Admin/GetEmployeeList", response => this.setState({ data: response }));
                this.modalRef.current.closeModal();
                this.props.alert.success(<Trans>AddEmployeeSuccess</Trans>);
            } else {
                this.modalRef.current.closeModal();
                this.props.alert.error(<Trans>AddEmployeeError</Trans>);
            }
        });
    };

    closeModal = () => {
        this.modalRef.current.closeModal();
    }

    editEmployee = () => {
        postJson("Admin/EditEmployee", this.formRef.current.getData(), response => {
            if (response === "Success") {
                getJson("Admin/GetEmployeeList", response => this.setState({ data: response }));
                this.modalRef.current.closeModal();
                this.props.alert.success(<Trans>EditEmployeeSuccess</Trans>);

            } else {
                this.modalRef.current.closeModal();
                this.props.alert.error(<Trans>EditEmployeeError</Trans>);
            }
        });
    };

    onAccept = () => {
        switch (this.state.mode) {
            case 'add':
                this.addNewEmployee();
                break;
            case 'edit':
                this.editEmployee();
                break;
            case 'show':
                return null;
        }
    };

    onFire = () => {
        postJson("Admin/RemoveEmployee", this.formRef.current.getData(), response => {
            if (response === "Success") {
                getJson("Admin/GetEmployeeList", response => this.setState({ data: response }));
                this.modalRef.current.closeModal();
                this.props.alert.success(<Trans>RemoveEmployeeSuccess</Trans>);

            } else {
                this.modalRef.current.closeModal();
                this.props.alert.error(<Trans>RemoveEmployeeError</Trans>);
            }
        });
    }


    render() {
        return (
            <div>
                <CustomButton onClick={this.openAddModal} text={<Trans>AddEmployee</Trans>} />
                <CustomButton onClick={this.openEditModal} text={<Trans>EditEmployee</Trans>} disable={this.state.disableMode} />
                <CustomButton onClick={this.openShowModal} text={<Trans>Details</Trans>} disable={this.state.disableMode} />

                <CustomModal ref={this.modalRef}>
                    <EmployeeForm
                        title={this.state.titleOfModal}
                        mode={this.state.mode}
                        data={this.state.selectedData}
                        ref={this.formRef}
                        onAccept={this.onAccept}
                        onCancel={this.closeModal}
                        onFire={this.onFire}
                    />
                </CustomModal>
                <br />
                <CustomTable key={i18n.language}
                    titleOfTable={titleOfTable}
                    columns={columns}
                    data={this.state.data}
                    onRowClicked={this.rowClick}
                    idName="IdEmployee"
                />
            </div>

        );
    }
}

export default withAlert()(AdminPage);