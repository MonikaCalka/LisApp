import React from 'react';
import { Trans } from 'react-i18next';
import CustomModal from '../../components/customModal';
import DataTable from 'react-data-table-component';
import { getJson } from '../../services/rests';

class NursePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        getJson("Nurse/GetOrderList", response => this.setState({ data: response }));
    }

    render() {

        const columns = [
            {
                name: <Trans>OrderId</Trans>,
                selector: 'IdOrder',
                sortable: true
            },
            {
                name: <Trans>Patient</Trans>,
                selector: 'PatientName',
                sortable: true
            },
            {
                name: <Trans>DateOfOrder</Trans>,
                selector: 'DateOfOrder',
                sortable: true
            },
            {
                name: <Trans>Status</Trans>,
                selector: 'Status',
                sortable: true
            },
            {
                name: <Trans>Priority</Trans>,
                selector: 'Priority',
                sortable: true
            }
        ];

        var titleOfTable = <Trans>Orders</Trans>;

        return (
            <div>
                Trust me I'm Nurse :3

                <DataTable
                    title={titleOfTable}
                    columns={columns}
                    data={this.state.data}
                />
            </div>
        );
    }
}

export default NursePage;