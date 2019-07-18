import React from 'react';
import { Trans } from 'react-i18next';
import CustomModal from '../../components/customModal';
import CustomTable from '../../components/customTable';
import CustomButton from '../../components/customButton';
import { getJson } from '../../services/rests';
import RegistrarForm from './registrarForm';

class RegistrarPage extends React.Component {

    constructor(props) {
        super(props);
        this.addModalRef = React.createRef();
        this.editModalRef = React.createRef();
        this.showModalRef = React.createRef();
        this.state = {
            data: [],
            actualRow: null
        };
    }

    componentDidMount() {
        getJson("Registrar/GetPatientList", response => this.setState({ data: response }));
    }

    rowClick = (row) => {
        console.log('Selected Rows: ', row);
        this.setState({ actualRow: row });
    };

    openAdd = () => {
        this.addModalRef.current.openModal();
    };

    openEdit = () => {
        this.editModalRef.current.openModal();
    };

    openShow = () => {
        this.showModalRef.current.openModal();
    };

    addNewPatient = () => {
    };

    editPatient = () => {
    };

    showPatient = () => {
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
                <CustomButton onClick={this.openAdd} text={<Trans>AddPatient</Trans>} />
                <CustomModal onAccept={this.addNewPatient} ref={this.addModalRef}>
                    <RegistrarForm
                        title="AddPatient"
                        mode="add"
                        data={null}
                    />
                </CustomModal>

                <CustomButton onClick={this.openEdit} text={<Trans>EditPatient</Trans>} />
                <CustomModal onAccept={this.editPatient} ref={this.editModalRef}>
                    <RegistrarForm
                        title="EditPatient"
                        mode="edit"
                        data={this.state.actualRow}
                    />
                </CustomModal>

                <CustomButton onClick={this.openShow} text={<Trans>Details</Trans>} />
                <CustomModal onAccept={this.showPatient} ref={this.showModalRef}>
                    <RegistrarForm
                        title="Details"
                        mode="show"
                        data={this.state.actualRow}
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

export default RegistrarPage;