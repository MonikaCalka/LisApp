import React from 'react';
import { Trans } from 'react-i18next';
import { getStateFromPropsData } from '../../services/getStateFromPropsData';
import { getJson, postJson } from '../../services/rests';
import TabNavigator from '../../components/tabNavigator';
import SampleModel from '../../models/sampleModel';
import { withAlert } from 'react-alert';
import StudyDetailsTab from '../doctor/tabs/studyDetailsTab';
import SampleTab from '../nurse/tabs/sampleTab';
import TestTab from './tabs/testTab';
import TestModel from '../../models/testModel';


const emptyState = {
    DateOfOrder: "",
    DateOfStudy: "",
    Doctor: "",
    IdOrder: "",
    IdStudy: "",
    Patient: "",
    Priority: "",
    Profile: "",
    Status: "",
    Lab: "",
    OrderComment: "",
    Sample: new SampleModel(),
    OrderedTest: [new TestModel()],
    Result: "",
    actualTabIndex: 0,
    refreshTable: false
};

class LabForm extends React.Component {

    constructor(props) {
        super(props);

        if (this.props.mode !== 'add') {
            this.state = getStateFromPropsData(props.data.data, emptyState);
        } else {
            this.state = emptyState;
        }
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
        const { title, mode, onAccept, onCancel, tabs, tabCount } = this.props;
        const { actualTabIndex } = this.state;

        console.log(tabs);

        let actualTab = null;
        switch (actualTabIndex) {
            case 0:
                actualTab = <StudyDetailsTab onTabChange={this.onTabChange}
                    model={this.state}
                    onCancel={onCancel}
                    mode={mode}
                    tabCount={tabCount}/>;
                break;
            case 1:
                actualTab = <SampleTab onTabChange={this.onTabChange}
                    model={this.state}
                    onCancel={onCancel}
                    mode={mode}
                    nurseMode={false}
                    tabCount={tabCount}/>;
                break;
            case 2:
                actualTab = <TestTab onTabChange={this.onTabChange}
                    model={this.state}
                    onCancel={onCancel}
                    mode={mode}
                    tabCount={tabCount}
                    onAccept={onAccept}
                />;
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
export default withAlert()(LabForm);