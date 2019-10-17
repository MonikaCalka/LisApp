import React from 'react';
import { Trans } from 'react-i18next';
import { getStateFromPropsData } from '../../services/getStateFromPropsData';
import StudyDetailsTab from '../doctor/tabs/studyDetailsTab';
import TabNavigator from '../../components/tabNavigator';
import SampleModel from '../../models/sampleModel';
import TestModel from '../../models/testModel';
import ResultModel from '../../models/resultModel';
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
    ReasonForRepeat: "",
    NeedNewSample: null,
    Actual: null,
    PreviousId: null,
    NextId: null,
    DateOfEnd: null,
    RepeatEmployee: null,
    Sample: new SampleModel(),
    OrderedTest: [new TestModel()],
    Result: new ResultModel(),
    actualTabIndex: 0,
    tab: [{ index: 0, name: 'Order' },
        { index: 1, name: 'Tests' },
        { index: 2, name: 'Result' }]
};

const tabsForNotActual = [
    { index: 0, name: 'Order' },
    { index: 1, name: 'Tests' },
    { index: 2, name: 'Result' }
];

class PatientStudyForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = getStateFromPropsData(props.data, emptyState);
    }

    componentDidMount() {
        if (this.state.Actual === false) {
            this.setState({ tab: tabsForNotActual });
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
        const { title, mode, onAccept, onCancel, onChangeStudy } = this.props;
        const { actualTabIndex } = this.state;
        let tabCount = 3;
        let actualTab = null;
        switch (actualTabIndex) {
            case 0:
                actualTab = <StudyDetailsTab onTabChange={this.onTabChange}
                    model={this.state}
                    onCancel={onCancel}
                    mode={mode}
                    tabCount={tabCount}
                    onChangeStudy={onChangeStudy}
                    withoutPrevStudy={false}
                />;
                break;
            case 1:
                actualTab = <TestTab onTabChange={this.onTabChange}
                    model={this.state}
                    onCancel={onCancel}
                    mode={mode}
                    tabCount={tabCount}
                    onModelChange={this.onModelChange}
                />;
                break;
            case 2:
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
                <TabNavigator tabs={this.state.tab} selectedTab={this.state.actualTabIndex} />
                {actualTab}
            </div>
        );
    }
}
export default PatientStudyForm;