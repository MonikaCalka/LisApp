import React from 'react';
import { Trans } from 'react-i18next';
import { getJson } from '../../services/rests';
import { getStateFromPropsData } from '../../services/getStateFromPropsData';
import { getDic } from '../../services/rests';
import OrderStudiesTab from './tabs/orderStudiesTab';
import OrderDetailsTab from './tabs/orderDetailsTab';
import OrderPatientTab from './tabs/orderPatientTab'
import StudyModel from '../../models/studyModel';

const emptyState = {
    IdPatient: "",
    PatientName: "",
    Sex: "",
    Pesel: "",
    IdCardNumber: "",
    Insurance: "",
    IdPriority: "",
    EmployeeName: "",
    DateOfOrder: "",
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

class OrderForm extends React.Component {

    constructor(props) {
        super(props);

        if (this.props.mode !== 'add') {
            this.state = getStateFromPropsData(props.data.data, emptyState);
        } else {
            this.state = emptyState;
        }
    }

    componentDidMount() {
        getDic("ward", response => {
            this.setState({ wardOptions: response });
        });
        getDic("priority", response => {
            this.setState({ priorityOptions: response });
        });
        getJson("Doctor/GetPatientSelect", response => {
            this.setState({ patientOptions: response });
        });
        getJson("Doctor/GetProfileSelect", response => {
            this.setState({ profileOptions: response });
        });
        getJson("Doctor/GetConsultantSelect", response => {
            this.setState({ doctorOptions: response });
        });
    }

    onModelChange = (name, value) => {
        this.setState({
            [name]: value
        });
    }

    onPatientChange = selectedPatientData => {
        this.setState(selectedPatientData);
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
                    mode={mode} />;
                break;
        }

        return (
            <div className="modal-div">
                <h2><Trans>{title}</Trans></h2>
                {actualTab}
            </div>
        );
    }
}



export default OrderForm;