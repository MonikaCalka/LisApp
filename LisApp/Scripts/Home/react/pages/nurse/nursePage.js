import React from 'react';
import { Trans } from 'react-i18next';
import CustomModal from '../../components/customModal';
import CustomTable from '../../components/customTable';
import CustomButton from '../../components/customButton';
import { getJson, postJson } from '../../services/rests';
import { withAlert } from 'react-alert';
import i18n from '../../i18n';

const columns = [
    {
        name: <Trans>OrderId</Trans>,
        selector: 'IdOrder',
        sortable: true
    },
    {
        name: <Trans>Patient</Trans>,
        selector: 'PatientName',
        sortable: true,
        wrap: true
    },
    {
        name: <Trans>DateOfOrder</Trans>,
        selector: 'DateOfOrder',
        sortable: true,
        wrap: true
    },
    {
        name: <Trans>Status</Trans>,
        selector: 'Status',
        sortable: true,
        wrap: true
    },
    {
        name: <Trans>Priority</Trans>,
        selector: 'Priority',
        sortable: true,
        wrap: true
    }
];

const titleOfTable = <Trans>Orders</Trans>;

class NursePage extends React.Component {

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
        getJson("Nurse/GetOrderList", response => this.setState({ data: response.data }));
    }
    componentDidUpdate() {
        if (this.state.actualLang !== i18n.language) {
            getJson("Nurse/GetOrderList", response => this.setState({ data: response.data }));
            this.setLanguage();
        }
    }

    setLanguage() {
        this.setState({ actualLang: i18n.language });
    }

    rowClick = (row) => {
        this.setState({
            actualRow: row,
            disableMode: row === null
        });
    };

        // open Modal + onAccept method

    onAccept = () => {
        switch (this.state.mode) {
            case 'add':
                break;
            case 'edit':
                break;
            case 'show':
                return null;
        }
    };

    render() {
        return (
            <div>
                Trust me I'm Nurse :3

                <CustomModal ref={this.modalRef}>
                </CustomModal>
                <br />

                <CustomTable key={i18n.language}
                    titleOfTable={titleOfTable}
                    columns={columns}
                    data={this.state.data}
                    onRowClicked={this.rowClick}
                />
            </div>
        );
    }
}

export default withAlert()(NursePage);