﻿import React from 'react';
import { Trans } from 'react-i18next';
import { getStateFromPropsData } from '../../services/getStateFromPropsData';
import { getDic } from '../../services/rests';
import StudyDetailsTab from './tabs/studyDetailsTab';
import TabNavigator from '../../components/tabNavigator';
import SampleModel from '../../models/sampleModel';
import TestModel from '../../models/testModel';
import ResultModel from '../../models/resultModel';
import SampleTab from '../nurse/tabs/sampleTab';
import TestTab from '../lab/tabs/testTab';
import ResultTab from '../lab/tabs/resultTab';

const emptyState = {
    DateOfOrder: "",
    DateOfStudy: "",
    Doctor: "",
    IdOrder: "",
    Patient: "",
    Priority: "",
    Profile: "",
    Status: "",
    Lab: "",
    OrderComment: "",
    DateOfCollection: "",
    SampleCode: "",
    Sample: new SampleModel(),
    OrderedTest: [new TestModel()],
    Result: new ResultModel(),
    actualTabIndex: 0
};

const tabs = [
    { index: 0, name: 'Order' },
    { index: 1, name: 'Sample' },
    { index: 2, name: 'Tests' },
    { index: 3, name: 'Result' }
];

class StudyForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = getStateFromPropsData(props.data.data, emptyState);
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
        const { title, mode, onAccept, onCancel } = this.props;
        const { actualTabIndex } = this.state;
        let tabCount = 5;
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
                    tabCount={tabCount}
                    nurseMode={false}/>;
                break;
            case 2:
                actualTab = <TestTab onTabChange={this.onTabChange}
                    model={this.state}
                    onCancel={onCancel}
                    mode={mode}
                    tabCount={tabCount}
                    onModelChange={this.onModelChange}
                />;
                break;
            case 3:
                actualTab = <ResultTab onTabChange={this.onTabChange}
                    model={this.state}
                    onCancel={onCancel}
                    mode={mode}
                    tabCount={tabCount}
                    onModelChange={this.onModelChange}
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
export default StudyForm;