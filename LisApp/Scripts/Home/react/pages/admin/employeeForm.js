import React from 'react';
import { Trans } from 'react-i18next';
import { getStateFromPropsData } from '../../services/getStateFromPropsData';
import CustomInput from '../../components/customInput';
import CustomSelect from '../../components/customSelect';
import { ValidatorForm } from 'react-form-validator-core';
import { getDic } from '../../services/rests';
import { requiredField, requiredMax50, requiredPesel, requiredPhone, isEmail, requiredMax15, max50 } from '../../components/validatorRules';

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
    wardOptions: []
};

const options = [
    { value: "F", label: <Trans>Female</Trans> },
    { value: "M", label: <Trans>Male</Trans> }
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
            this.setState({ positionOptions: response });
        });
        getDic("ward", response => {
            this.setState({ wardOptions: response });
        });
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    onOptionChange = (selectName, selectedOption) => {
        this.setState({ [selectName]: selectedOption === null ? "" : selectedOption.value });
    };

    getData = () => {
        return this.state;
    }

    render() {
        const { title, mode, onAccept, onCancel, onFire } = this.props;

        var disable = mode === 'show' ? true : false;
        var cancelText = mode === 'show' ? <Trans>Back</Trans> : <Trans>Cancel</Trans>;

        return (
            <div className="modal-div">
                <h2><Trans>{title}</Trans></h2>
                <ValidatorForm id="modalform" onSubmit={onAccept} >
                    <div className="col-sm-4">
                        <h4><Trans>ContactData</Trans></h4>
                        <CustomInput labeltext="FirstName" onChange={this.handleChange} value={this.state.FirstName} name="FirstName" disabled={disable} {...requiredMax50} /><br />
                        <CustomInput labeltext="LastName" onChange={this.handleChange} value={this.state.Surname} name="Surname" disabled={disable} {...requiredMax50} /><br />
                        <CustomSelect labeltext="Sex" onChange={e => this.onOptionChange("Sex", e)} value={options.filter(option => option.value === this.state.Sex)} selectOptions={options} name="Sex" isDisabled={disable}  {...requiredField} /> <br />
                        <CustomInput labeltext="PESEL" onChange={this.handleChange} value={this.state.Pesel} name="Pesel" disabled={disable} {...requiredPesel} /><br />
                        <CustomInput labeltext="Phone" onChange={this.handleChange} value={this.state.Phone} name="Phone" disabled={disable} {...requiredPhone} /><br />
                        <CustomInput labeltext="Email" onChange={this.handleChange} value={this.state.Email} name="Email" disabled={disable} {...isEmail} /><br />
                    </div>

                    <div className="col-sm-4">
                        <h4><Trans>Address</Trans></h4>
                        <CustomInput labeltext="Street" onChange={this.handleChange} value={this.state.Street} name="Street" disabled={disable} {...requiredMax50} /><br />
                        <CustomInput labeltext="HouseNumber" onChange={this.handleChange} value={this.state.HouseNumber} name="HouseNumber" disabled={disable} {...requiredMax15} /><br />
                        <CustomInput labeltext="City" onChange={this.handleChange} value={this.state.City} name="City" disabled={disable} {...requiredMax50}/><br />
                        <CustomInput labeltext="PostalCode" onChange={this.handleChange} value={this.state.PostalCode} name="PostalCode" disabled={disable} {...requiredMax15} /><br />
                        <CustomInput labeltext="Country" onChange={this.handleChange} value={this.state.Country} name="Country" disabled={disable} {...requiredMax50} /><br />
                    </div>

                    <div className="col-sm-4">
                        <h4><Trans>EmploymentDetails</Trans></h4>
                        <CustomInput labeltext="Login" onChange={this.handleChange} value={this.state.Login} name="Login" disabled={disable} {...requiredMax50} /><br />
                        <CustomSelect labeltext="Position" onChange={e => this.onOptionChange("IdPosition", e)} value={this.state.positionOptions.filter(option => option.value === this.state.IdPosition)} selectOptions={this.state.positionOptions} name="IdPosition" isDisabled={disable} {...requiredField} /> <br />
                        <CustomInput labeltext="DateOfEmployment" onChange={this.handleChange} value={this.state.DateOfEmployment} name="DateOfEmployment" disabled /><br />
                        <CustomInput labeltext="LicenseNumber" onChange={this.handleChange} value={this.state.LicenseNumber} name="LicenseNumber" disabled={disable} {...max50} /><br />
                        <CustomSelect labeltext="Ward" onChange={e => this.onOptionChange("IdWard", e)} value={this.state.wardOptions.filter(option => option.value === this.state.IdWard)} selectOptions={this.state.wardOptions} name="IdWard" isDisabled={disable} isClearable  /> <br />
                    </div>
                </ValidatorForm>
                <div className="save-cancel-buttons">
                    {mode === 'edit' ? <button onClick={onFire}><Trans>Fire</Trans></button> : null}
                    {mode !== 'show' ? <button type="submit" form="modalform">{<Trans>Save</Trans>}</button> : null}
                    <button onClick={onCancel}>{cancelText}</button>
                </div>
            </div>
        );
    }
}

export default EmployeeForm;