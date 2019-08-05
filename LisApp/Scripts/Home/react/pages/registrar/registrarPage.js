import React from 'react';
import { Trans } from 'react-i18next';
import CustomModal from '../../components/customModal';
import CustomTable from '../../components/customTable';
import CustomButton from '../../components/customButton';
import { getJson, postJson } from '../../services/rests';
import RegistrarForm from './registrarForm';
import { withAlert } from 'react-alert'

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
            postResult: ""
        };
    }

    componentDidMount() {
        getJson("Registrar/GetPatientList", response => this.setState({ data: response }));
    }

    rowClick = (row, index) => {
        this.setState({
            actualRow: row,
            disableMode: row === null
        });

        console.log(row);
        console.log(index);
    };

    openAddModal = () => {
        this.setState({
            titleOfModal: "AddPatient",
            mode: "add"
        });
        this.modalRef.current.openModal();
    };

    openEditModal = () => {
        this.setState({
            titleOfModal: "EditPatient",
            mode: "edit"
        });
        this.modalRef.current.openModal();
    };

    openShowModal = () => {
        this.setState({
            titleOfModal: "Details",
            mode: "show"
        });
        this.modalRef.current.openModal();
    };

    addNewPatient = () => {
        console.log(this.formRef.current.getData());
        postJson("Registrar/AddNewPatient", this.formRef.current.getData(), response => {
            if (response === "Success") {
                getJson("Registrar/GetPatientList", response => this.setState({ data: response }));
                this.props.alert.success(<Trans>AddPatientSuccess</Trans>);
            } else {
                this.props.alert.error(<Trans>AddPatientError</Trans>);
            }
        });   
    };

    editPatient = () => {
        console.log(this.formRef.current.getData());
        postJson("Registrar/EditPatient", this.formRef.current.getData(), response => {
            if (response === "Success") {
                getJson("Registrar/GetPatientList", response => this.setState({ data: response }));
                this.props.alert.success(<Trans>EditPatientSuccess</Trans>);
            } else {
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
        const columns = [
            {
                name: <Trans>IdPatient</Trans>,
                selector: 'IdPatient',
                sortable: true
            },
            {
                name: <Trans>FirstName</Trans>,
                selector: 'FirstName',
                sortable: true
            },
            {
                name: <Trans>LastName</Trans>,
                selector: 'Surname',
                sortable: true
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
                sortable: true
            }
        ];

        var titleOfTable = <Trans>Patients</Trans>;

        return (
            <div>
                <CustomButton onClick={this.openAddModal} text={<Trans>AddPatient</Trans>} />
                <CustomButton onClick={this.openEditModal} text={<Trans>EditPatient</Trans>} disable={this.state.disableMode} />
                <CustomButton onClick={this.openShowModal} text={<Trans>Details</Trans>} disable={this.state.disableMode} />

                <CustomModal onAccept={this.onAccept} ref={this.modalRef} onCancelText={<Trans>Back</Trans>}>
                    <RegistrarForm
                        title={this.state.titleOfModal}
                        mode={this.state.mode}
                        data={this.state.actualRow}
                        ref={this.formRef}
                    />
                </CustomModal>
                <br />
                <CustomTable
                    titleOfTable={titleOfTable}
                    columns={columns}
                    data={this.state.data}
                    onRowClicked={this.rowClick}
                />
            </div>
        );
    }
}

export default withAlert()(RegistrarPage);