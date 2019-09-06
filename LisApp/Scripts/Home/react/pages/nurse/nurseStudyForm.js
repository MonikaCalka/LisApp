﻿import React from 'react';
import { Trans } from 'react-i18next';
import { getStateFromPropsData } from '../../services/getStateFromPropsData';
import { getJson, postJson } from '../../services/rests';
import StudyDetailsTab from '../doctor/tabs/studyDetailsTab';
import TabNavigator from '../../components/tabNavigator';
import SampleTab from './tabs/sampleTab';
import SampleModel from '../../models/sampleModel';
import { withAlert } from 'react-alert';

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
    Sample: new SampleModel(),
    actualTabIndex: 0,
    refreshTable: false
};

const tabs = [
    { index: 0, name: 'Order' },
    { index: 1, name: 'Sample' }
];

class NurseStudyForm extends React.Component {

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

    onRegisterSample = () => {
        postJson("Nurse/RegisterSample", this.state, response => {
            if (response === "Error") {
                this.props.alert.error(<Trans>RegisterSampleError</Trans>);
            }
            else {
                console.log(response);
                this.props.alert.info(<Trans>MarkSample</Trans>);
                this.setState(getStateFromPropsData(response.data, emptyState));
                this.setState({
                    actualTabIndex: 1,
                    refreshTable: true
                });
            }
        });
    };



    getData = () => {
        return this.state;
    }

    onTabChange = newTabIndex => {
        this.setState({ actualTabIndex: newTabIndex });
    }

    onCancel = () => {
        const { onCancel } = this.props;
        onCancel(this.state.refreshTable);
    }

    render() {
        const { title, mode, onAccept, onCancel } = this.props;
        const { actualTabIndex } = this.state;

        let actualTab = null;
        switch (actualTabIndex) {
            case 0:
                actualTab = <StudyDetailsTab onTabChange={this.onTabChange}
                    model={this.state}
                    onCancel={this.onCancel}
                    mode={mode} />;
                break;
            case 1:
                actualTab = <SampleTab onTabChange={this.onTabChange}
                    model={this.state}
                    onCancel={this.onCancel}
                    mode={mode}
                    onRegisterSample={this.onRegisterSample}/>
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
export default withAlert()(NurseStudyForm);