import React from 'react';
import { Trans } from 'react-i18next';
import CustomModal from '../../components/customModal';
import CustomTable from '../../components/customTable';
import CustomButton from '../../components/customButton';
import { getJson } from '../../services/rests';

class RegistrarPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        getJson("Registrar/GetPatientList", response => this.setState({ data: response }));
    }

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
                <CustomButton onClick={this.addNewPatient} text={<Trans>AddPatient</Trans>} />
                <CustomButton onClick={this.editPatient} text={<Trans>EditPatient</Trans>} />
                <CustomButton onClick={this.showPatient} text={<Trans>Details</Trans>} />
                <br/>
                <CustomTable
                    title={titleOfTable}
                    columns={columns}
                    data={this.state.data}
                />
            </div>
        );
    }
}

export default RegistrarPage;