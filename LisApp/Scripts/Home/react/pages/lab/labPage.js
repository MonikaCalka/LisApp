import React from 'react';
import { Trans } from 'react-i18next';
import CustomModal from '../../components/customModal';
import CustomTable from '../../components/customTable';
import { getJson } from '../../services/rests';
import i18n from '../../i18n';

const columns = [
    {
        name: <Trans>OrderId</Trans>,
        selector: 'IdOrder',
        sortable: true
    },
    {
        name: <Trans>StudyId</Trans>,
        selector: 'IdStudy',
        sortable: true
    },
    {
        name: <Trans>DateOfOrder</Trans>,
        selector: 'DateOfOrder',
        sortable: true
    },
    {
        name: <Trans>Profile</Trans>,
        selector: 'Profile',
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

const titleOfTable = <Trans>Studies</Trans>;

class LabPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            actualLang: 'pl'
        };
    }

    componentDidMount() {
        getJson("Lab/GetStudyList", response => this.setState({ data: response.data }));
    }
    componentDidUpdate() {
        if (this.state.actualLang !== i18n.language) {
            getJson("Lab/GetStudyList", response => this.setState({ data: response.data }));
            this.setLanguage();
        }
    }

    setLanguage() {
        this.setState({ actualLang: i18n.language });
    }

    render() {
        return (
            <div>
                Trust me I'm Lab :3

                <CustomTable key={i18n.language}
                    titleOfTable={titleOfTable}
                    columns={columns}
                    data={this.state.data}
                />
            </div>
        );
    }
}

export default LabPage;