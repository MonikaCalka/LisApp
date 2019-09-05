import React from 'react';
import { Trans } from 'react-i18next';
import { getJson } from '../../services/rests';
import { getStateFromPropsData } from '../../services/getStateFromPropsData';
import { getDic } from '../../services/rests';
import NurseOrderDetailsTab from './tabs/nurseOrderDetailsTab';
import StudyModel from '../../models/studyModel';
import TabNavigator from '../../components/tabNavigator';
import OrderStudiesTab from '../doctor/tabs/orderStudiesTab';

const emptyState = {
    IdPatient: "",
    PatientName: "",
    Priority: "",
    EmployeeName: "",
    Status: "",
    IdOrder: "",
    Comment: "",
    Studies: [new StudyModel()],
    profileOptions: [],
    actualTabIndex: 0
};

const tabs = [
    { index: 0, name: 'Order' },
    { index: 1, name: 'Studies' }
];

class NurseOrderForm extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = getStateFromPropsData(props.data.data, emptyState);
    }

    componentDidMount() {
        getJson("Doctor/GetProfileSelect", response => {
            this.setState({ profileOptions: response });
        });
    }

    onModelChange = (name, value) => {
        this.setState({
            [name]: value
        });
    }

    getData = () => {
        return this.state;
    }

    onTabChange = newTabIndex => {
        this.setState({ actualTabIndex: newTabIndex });
    }

    render() {
        const { title, mode, onCancel } = this.props;
        const { actualTabIndex } = this.state;

        let actualTab = null;
        switch (actualTabIndex) {
            case 0:
                actualTab = <NurseOrderDetailsTab onTabChange={this.onTabChange}
                    onModelChange={this.onModelChange}
                    model={this.state}
                    onCancel={onCancel}
                    mode={mode} />;
                break;
            case 1:
                actualTab = <OrderStudiesTab onTabChange={this.onTabChange}
                    onModelChange={this.onModelChange}
                    model={this.state}
                    onCancel={onCancel}
                    mode={mode}
                    showSample={true} />;
                break;
        }

        return (
            <div className="modal-div">
                <h2><Trans>{title}</Trans></h2>
                <TabNavigator tabs={tabs} selectedTab={this.state.actualTabIndex} />
                {actualTab}
            </div>
        );
    }
}
export default NurseOrderForm;