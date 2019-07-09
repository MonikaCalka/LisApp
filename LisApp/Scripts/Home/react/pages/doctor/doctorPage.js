import React from 'react';
import { Trans } from 'react-i18next';
import CustomModal from '../../components/customModal';
import DataTable from 'react-data-table-component';
import { getJson } from '../../services/rests';
import CustomTable from '../../components/customTable';

class DoctorPage extends React.Component {
    constructor(props) {
        super(props);
        this.modalRef = React.createRef();
        this.state = {
            data: [],
            actualRow: null
        };
    }

    componentDidMount() {
        getJson("Doctor/GetOrderList", response => this.setState({ data: response }));
    }

    rowClick = (row) => {
        console.log('Selected Rows: ', row);
        this.setState({ actualRow: row });
    };

    openModal = () => {
        this.modalRef.current.openModal();
    };

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
                Trust me I'm DOGTOR :3
                <Trans>Welcome to React</Trans>
                <button onClick={this.openModal}>Modal</button>
                <CustomModal onAccept={this.openModal} ref={this.modalRef}>Piszę ja</CustomModal>

                <CustomTable
                    title={titleOfTable}
                    columns={columns}
                    data={this.state.data}
                    onRowClicked={this.rowClick}
                />
            </div>
        );
    }
}

export default DoctorPage;