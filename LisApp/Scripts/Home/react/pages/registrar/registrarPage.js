import React from 'react';
import { Trans } from 'react-i18next';
import CustomModal from '../../components/customModal';
import CustomTable from '../../components/customTable';
import CustomButton from '../../components/customButton';
import { getJson, postJson } from '../../services/rests';
import RegistrarForm from './registrarForm';
import { withAlert } from 'react-alert';
import i18n from '../../i18n';

var columns = [
    {
        name: <Trans>IdPatient</Trans>,
        selector: 'IdPatient',
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
        name: <Trans>PESEL</Trans>,
        selector: 'Pesel',
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
        name: <Trans>Phone</Trans>,
        selector: 'Phone',
        sortable: true,
        wrap: true
    }
];

const titleOfTable = <Trans>Patients</Trans>;

class RegistrarPage extends React.Component {

    constructor(props) {
        super(props);
        this.modalRef = React.createRef();
        this.formRef = React.createRef();
        this.state = {
            data: [],
            actualRow: null,
            disableMode: true,
            titleOfModal: "",
            mode: "",
            postResult: "",
            selectedData: null
        };
    }

    componentDidMount() {
        getJson("Registrar/GetPatientList", response => this.setState({ data: response }));
    }

    setLanguage() {
        this.setState({ actualLang: i18n.language });
    }

    rowClick = (row, index) => {
        this.setState({
            actualRow: row,
            disableMode: row === null
        });
    };

    openAddModal = () => {
        this.setState({
            titleOfModal: "AddPatient",
            mode: "add"
        });
        this.modalRef.current.openModal();
    };

    getPatientAndOpenModal = () => {
        getJson("Registrar/GetPatient?id=" + this.state.actualRow.IdPatient, response => {
            this.setState({ selectedData: response });
            this.modalRef.current.openModal();
        });
    }

    openEditModal = () => {
        this.setState({
            titleOfModal: "EditPatient",
            mode: "edit"
        });
        this.getPatientAndOpenModal();
    };

    openShowModal = () => {
        this.setState({
            titleOfModal: "Details",
            mode: "show"
        });
        this.getPatientAndOpenModal();
    };
    
    addNewPatient = () => {
        postJson("Registrar/AddNewPatient", this.formRef.current.getData(), response => {
            if (response === "Success") {
                getJson("Registrar/GetPatientList", response => this.setState({ data: response }));
                this.modalRef.current.closeModal();
                this.props.alert.success(<Trans>AddPatientSuccess</Trans>);
            } else {
                this.modalRef.current.closeModal();
                this.props.alert.error(<Trans>AddPatientError</Trans>);
            }
        });   
    };

    closeModal = () => {
        this.modalRef.current.closeModal();
    }

    editPatient = () => {
        postJson("Registrar/EditPatient", this.formRef.current.getData(), response => {
            if (response === "Success") {
                getJson("Registrar/GetPatientList", response => this.setState({ data: response }));
                this.modalRef.current.closeModal();
                this.props.alert.success(<Trans>EditPatientSuccess</Trans>);

            } else {
                this.modalRef.current.closeModal();
                this.props.alert.error(<Trans>EditPatientError</Trans>);
            }
        }); 
    };

    onAccept = () => {
        switch (this.state.mode) {
            case 'add':
                this.addNewPatient();
                break;
            case 'edit':
                this.editPatient();
                break;
            case 'show':
                return null;
        }
    };

    render() {
        return (
            <div>
                <CustomButton onClick={this.openAddModal} text={<Trans>AddPatient</Trans>} />
                <CustomButton onClick={this.openEditModal} text={<Trans>EditPatient</Trans>} disable={this.state.disableMode} />
                <CustomButton onClick={this.openShowModal} text={<Trans>Details</Trans>} disable={this.state.disableMode} />

                <CustomModal ref={this.modalRef}>
                    <RegistrarForm
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
                    idName="IdPatient"
                />
            </div>
        );
    }
}

export default withAlert()(RegistrarPage);