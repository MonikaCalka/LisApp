﻿import React from 'react';
import { Trans } from 'react-i18next';
import { getJson } from '../../services/rests';
import { getStateFromPropsData } from '../../services/getStateFromPropsData';
import { getDic } from '../../services/rests';
import OrderStudiesTab from './tabs/orderStudiesTab';
import OrderDetailsTab from './tabs/orderDetailsTab';
import OrderPatientTab from './tabs/orderPatientTab';
import StudyModel from '../../models/studyModel';
import TabNavigator from '../../components/tabNavigator';

const emptyState = {
    IdPatient: "",
    PatientName: "",
    Sex: "",
    Pesel: "",
    IdCardNumber: "",
    IdPriority: "",
    EmployeeName: "",
    Status: "",
    IdOrder: "",
    Comment: "",
    Studies: [new StudyModel()],
    wardOptions: [],
    patientOptions: [],
    priorityOptions: [],
    profileOptions: [],
    doctorOptions: [],
    IdConsultants: [],
    actualTabIndex: 0
};

const tabs = [
    { index: 0, name: 'Patient' },
    { index: 1, name: 'Order' },
    { index: 2, name: 'Studies' }
];

class OrderForm extends React.Component {

    constructor(props) {
        super(props);

        if (this.props.mode !== 'add') {
            this.state = getStateFromPropsData(props.data, emptyState);
        } else {
            this.state = emptyState;
        }
    }

    componentDidMount() {
        getJson("Doctor/GetPatientSelect", response => {
            if (response.status === 200) {
                response.json().then(responseJson => {
                    this.setState({ patientOptions: responseJson });
                });
            }
        });
        getDic("ward", response => {
            response.json().then(responseJson => {
                this.setState({ wardOptions: responseJson });
            });
        });
        getDic("priority", response => {
            response.json().then(responseJson => {
                this.setState({ priorityOptions: responseJson });
            });
        });
        getJson("Doctor/GetProfileSelect", response => {
            response.json().then(responseJson => {
                this.setState({ profileOptions: responseJson });
            });
        });
        getJson("Doctor/GetConsultantSelect", response => {
            if (response.status === 200) {
                response.json().then(responseJson => {
                    this.setState({ doctorOptions: responseJson });
                });
            }
        });
    }

    onModelChange = (name, value) => {
        this.setState({
            [name]: value
        });
    }

    onPatientChange = selectedPatientData => {
        this.setState(selectedPatientData);
        console.log(selectedPatientData);
    }

    getData = () => {
        let state = this.state;
        delete state.wardOptions;
        delete state.patientOptions;
        delete state.priorityOptions;
        delete state.profileOptions;
        delete state.doctorOptions;
        return state;
    }

    onTabChange = newTabIndex => {
        this.setState({ actualTabIndex: newTabIndex });
    }

    render() {
        const { title, mode, onAccept, onCancel } = this.props;
        const { actualTabIndex } = this.state;

        let actualTab = null;
        switch (actualTabIndex) {
            case 0:
                actualTab = <OrderPatientTab onTabChange={this.onTabChange}
                    onPatientChange={this.onPatientChange}
                    model={this.state}
                    onCancel={onCancel}
                    mode={mode} />;
                break;
            case 1:
                actualTab = <OrderDetailsTab onTabChange={this.onTabChange}
                    onModelChange={this.onModelChange}
                    model={this.state}
                    onCancel={onCancel}
                    mode={mode} />;
                break;
            case 2:
                actualTab = <OrderStudiesTab onTabChange={this.onTabChange}
                    onModelChange={this.onModelChange}
                    model={this.state}
                    onCancel={onCancel}
                    onAccept={onAccept}
                    mode={mode}
                    showSamples={false} />;
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



export default OrderForm;