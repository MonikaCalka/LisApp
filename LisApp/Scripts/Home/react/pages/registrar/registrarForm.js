import React from 'react';
import { Trans } from 'react-i18next';
import { getStateFromPropsData } from '../../services/getStateFromPropsData';
import CustomInput from '../../components/customInput';
import CustomSelect from '../../components/customSelect';
import { ValidatorForm } from 'react-form-validator-core';
import { requiredField, max50, requiredOrNNMax50, requiredPeselOrNN, requiredPhoneOnNN, requiredOrNNMax15, isPesel, isPhone } from '../../components/validatorRules';
import PatientContactDataTab from './tabs/patientContactDataTab';
import PatientAddressTab from './tabs/patientAddressTab';
import PatientContactPersonTab from './tabs/patientContactPersonTab';
import TabNavigator from '../../components/tabNavigator';

const emptyState  = {
    FirstName: "",
    Surname: "",
    Sex: "",
    Pesel: "",
    Phone: "",
    IdCardNumber: "",
    Street: "",
    HouseNumber: "",
    City: "",
    PostalCode: "",
    Country: "",
    ContactPersonFirstName: "",
    ContactPersonSurname: "",
    ContactPersonPesel: "",
    ContactPersonPhone: "",
    actualTabIndex: 0
};

const tabs = [
    { index: 0, name: 'ContactData' },
    { index: 1, name: 'Address' },
    { index: 2, name: 'ContactPerson' }
];

class RegistrarForm extends React.Component {

    constructor(props) {
        super(props);
        
        if (this.props.mode !== 'add') {
            this.state = getStateFromPropsData(props.data, emptyState);
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
        const { title, mode, onAccept, onCancel } = this.props;
        const { actualTabIndex } = this.state;
        let actualTab = null;

        switch (actualTabIndex) {
            case 0:
                actualTab = <PatientContactDataTab onTabChange={this.onTabChange}
                    model={this.state}
                    onCancel={onCancel}
                    mode={mode}
                    onModelChange={this.onModelChange}/>;
                break;
            case 1:
                actualTab = <PatientAddressTab onTabChange={this.onTabChange}
                    model={this.state}
                    onCancel={onCancel}
                    mode={mode}
                    onModelChange={this.onModelChange}/>;
                break;
            case 2:
                actualTab = <PatientContactPersonTab onTabChange={this.onTabChange}
                    model={this.state}
                    onCancel={onCancel}
                    mode={mode}
                    onAccept={onAccept}
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

export default RegistrarForm;