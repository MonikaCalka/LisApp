import React from 'react';
import { Trans } from 'react-i18next';
import { getStateFromPropsData } from '../../services/getStateFromPropsData';
import CustomInput from '../../components/customInput';
import CustomSelect from '../../components/customSelect';
import { ValidatorForm } from 'react-form-validator-core';
import { getDic } from '../../services/rests';
import { requiredField, requiredMax50, requiredPesel, requiredPhone, isEmail, requiredMax15, max50 } from '../../components/validatorRules';
import TabNavigator from '../../components/tabNavigator';
import EmployeeContactDataTab from './tabs/employeeContactDataTab';
import EmployeeAddressTab from './tabs/employeeAddressTab';
import EmployeeDetailTab from './tabs/employeeDetailsTab';

const emptyState = {
    FirstName: "",
    Surname: "",
    Sex: "",
    Pesel: "",
    Phone: "",
    Street: "",
    HouseNumber: "",
    City: "",
    PostalCode: "",
    Country: "",
    IdPosition: "",
    Email: "",
    DateOfEmployment: "",
    LicenseNumber: "",
    IdWard: "",
    Login: "",
    positionOptions: [],
    wardOptions: [],
    actualTabIndex: 0
};

const tabs = [
    { index: 0, name: 'ContactData' },
    { index: 1, name: 'Address' },
    { index: 2, name: 'EmploymentDetails' }
];

class EmployeeForm extends React.Component {

    constructor(props) {
        super(props);

        if (this.props.mode !== 'add') {
            this.state = getStateFromPropsData(props.data.data, emptyState);
        } else {
            this.state = emptyState;
        }
    }

    componentDidMount() {
        getDic("position", response => {
            response.json().then(responseJson => {
                this.setState({ positionOptions: responseJson });
            });
        });
        getDic("ward", response => {
            response.json().then(responseJson => {
                this.setState({ wardOptions: responseJson });
            });
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
        const { title, mode, onAccept, onCancel, onFire } = this.props;
        const { actualTabIndex } = this.state;
        let actualTab = null;

        switch (actualTabIndex) {
            case 0:
                actualTab = <EmployeeContactDataTab onTabChange={this.onTabChange}
                    model={this.state}
                    onCancel={onCancel}
                    mode={mode}
                    onModelChange={this.onModelChange}
                    onFire={onFire}/>;
                break;
            case 1:
                actualTab = <EmployeeAddressTab onTabChange={this.onTabChange}
                    model={this.state}
                    onCancel={onCancel}
                    mode={mode}
                    onModelChange={this.onModelChange}
                    onFire={onFire}/>;
                break;
            case 2:
                actualTab = <EmployeeDetailTab onTabChange={this.onTabChange}
                    model={this.state}
                    onCancel={onCancel}
                    mode={mode}
                    onAccept={onAccept}
                    onModelChange={this.onModelChange}
                    onFire={onFire} />;
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

export default EmployeeForm;