import React from 'react';
import { Trans } from 'react-i18next';
import CustomModal from '../../components/customModal';
import CustomTable from '../../components/customTable';
import { getJson } from '../../services/rests';

class AdminPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        getJson("Admin/GetEmployeeList", response => this.setState({ data: response }));
    }

    render() {

        const columns = [
            {
                name: <Trans>Login</Trans>,
                selector: 'Login',
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
                name: <Trans>Address</Trans>,
                selector: 'FullAddress',
                sortable: true,
                wrap: true
            },
            {
                name: <Trans>Position</Trans>,
                selector: 'Position',
                sortable: true
            },
            {
                name: <Trans>Phone</Trans>,
                selector: 'Phone',
                sortable: true
            },
            {
                name: <Trans>Email</Trans>,
                selector: 'Email',
                sortable: true
            }
        ];

        var titleOfTable = <Trans>Employees</Trans>;

        return (
            <div>
                Trust me I'm Admin :3

                <CustomTable
                    title={titleOfTable}
                    columns={columns}
                    data={this.state.data}
                />

            </div>

        );
    }
}

export default AdminPage;