import React from 'react';
import { Trans } from 'react-i18next';
import CustomModal from '../../components/customModal';
import CustomTable from '../../components/customTable';
import { getJson } from '../../services/rests';

class LabPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        getJson("Lab/GetStudyList", response => this.setState({ data: response }));
    }

    render() {

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

        var titleOfTable = <Trans>Studies</Trans>;

        return (
            <div>
                Trust me I'm Lab :3

                <CustomTable
                    titleOfTable={titleOfTable}
                    columns={columns}
                    data={this.state.data}
                />
            </div>
        );
    }
}

export default LabPage;