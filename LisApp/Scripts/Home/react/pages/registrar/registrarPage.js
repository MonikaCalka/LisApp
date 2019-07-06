import React from 'react';
import { Trans } from 'react-i18next';
import CustomModal from '../../components/customModal';
import DataTable from 'react-data-table-component';
import { getJson } from '../../services/rests';

class RegistrarPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        getJson("Admin/GetPatientList", response => this.setState({ data: response }));
    }

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
                sortable: true
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
                Trust me I'm Registrar czy coś :3

                <DataTable
                    title={titleOfTable}
                    columns={columns}
                    data={this.state.data}
                />
            </div>
        );
    }
}

export default RegistrarPage;