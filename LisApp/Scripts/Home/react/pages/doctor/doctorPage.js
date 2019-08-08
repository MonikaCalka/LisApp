import React from 'react';
import { Trans } from 'react-i18next';
import CustomModal from '../../components/customModal';
import { getJson } from '../../services/rests';
import CustomTable from '../../components/customTable';
import i18n from '../../i18n';

class DoctorPage extends React.Component {
    constructor(props) {
        super(props);
        this.modalRef = React.createRef();
        this.state = {
            data: [],
            actualRow: null,
            actualLang: "pl"
        };
    }

    componentDidMount() {
        getJson("Doctor/GetOrderList", response => this.setState({ data: response.data }));
    }
    componentDidUpdate() {
        
        if (this.state.actualLang !== i18n.language) {
            getJson("Doctor/GetOrderList", response => this.setState({ data: response.data }));
            this.setLanguage();
        }
    }

    setLanguage() {
        this.setState({ actualLang: i18n.language });
    }

    rowClick = (row) => {
        console.log('Selected Rows: ', row);
        this.setState({ actualRow: row });
    };

    openModal = () => {
        this.modalRef.current.openModal();
    };

    render() {
        var columns = [
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
                    titleOfTable={titleOfTable}
                    columns={columns}
                    data={this.state.data}
                    onRowClicked={this.rowClick}
                />
            </div>
        );
    }
}

export default DoctorPage;