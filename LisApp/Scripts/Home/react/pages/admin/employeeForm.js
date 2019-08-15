import React from 'react';
import { Trans } from 'react-i18next';
import { getStateFromPropsData } from '../../services/getStateFromPropsData';
import CustomInput from '../../components/customInput';
import CustomSelect from '../../components/customSelect';
import { ValidatorForm } from 'react-form-validator-core';
import { getDic } from '../../services/rests';

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

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        getDic("position", response => {
            this.setState({ positionOptions: response });
        });
        getDic("ward", response => {
            this.setState({ wardOptions: response });
        });
    }

    handleChange(event) {
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

    getData() {
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
                        <CustomInput labeltext="FirstName" onChange={this.handleChange} value={this.state.FirstName} name="FirstName" disabled={disable} validators={['required', 'maxStringLength:50']} errorMessages={[<Trans>RequiredField</Trans>, <Trans>Max50</Trans>]} requiredMark /><br />
                        <CustomInput labeltext="LastName" onChange={this.handleChange} value={this.state.Surname} name="Surname" disabled={disable} validators={['required', 'maxStringLength:50']} errorMessages={[<Trans>RequiredField</Trans>, <Trans>Max50</Trans>]} requiredMark /><br />
                        <CustomSelect labeltext="Sex" onChange={e => this.onOptionChange("Sex", e)} value={options.filter(option => option.value === this.state.Sex)} selectOptions={options} name="Sex" isDisabled={disable} validators={['required']} errorMessages={[<Trans>RequiredField</Trans>]} requiredMark /> <br />
                        <CustomInput labeltext="PESEL" onChange={this.handleChange} value={this.state.Pesel} name="Pesel" disabled={disable} validators={['required', 'maxStringLength:11', 'isNumber']} errorMessages={[<Trans>RequiredField</Trans>, <Trans>Max11</Trans>, <Trans>IsNumber</Trans>]} requiredMark /><br />
                        <CustomInput labeltext="Phone" onChange={this.handleChange} value={this.state.Phone} name="Phone" disabled={disable} validators={['required', 'maxStringLength:9', 'isNumber']} errorMessages={[<Trans>RequiredField</Trans>, <Trans>Max9</Trans>, <Trans>IsNumber</Trans>]} requiredMark /><br />
                        <CustomInput labeltext="Email" onChange={this.handleChange} value={this.state.Email} name="Email" disabled={disable} validators={['maxStringLength:50','isEmail']} errorMessages={[<Trans>Max50</Trans>,<Trans>IsEmail</Trans>]} /><br />

                    </div>

                    <div className="col-sm-4">
                        <h4><Trans>Address</Trans></h4>
                        <CustomInput labeltext="Street" onChange={this.handleChange} value={this.state.Street} name="Street" disabled={disable} validators={['required', 'maxStringLength:50']} errorMessages={[<Trans>RequiredField</Trans>, <Trans>Max50</Trans>]} requiredMark /><br />
                        <CustomInput labeltext="HouseNumber" onChange={this.handleChange} value={this.state.HouseNumber} name="HouseNumber" disabled={disable} validators={['required', 'maxStringLength:15']} errorMessages={[<Trans>RequiredField</Trans>, <Trans>Max15</Trans>]} requiredMark /><br />
                        <CustomInput labeltext="City" onChange={this.handleChange} value={this.state.City} name="City" disabled={disable} validators={['required', 'maxStringLength:50']} errorMessages={[<Trans>RequiredField</Trans>, <Trans>Max50</Trans>]} requiredMark /><br />
                        <CustomInput labeltext="PostalCode" onChange={this.handleChange} value={this.state.PostalCode} name="PostalCode" disabled={disable} validators={['required', 'maxStringLength:15']} errorMessages={[<Trans>RequiredField</Trans>, <Trans>Max15</Trans>]} requiredMark /><br />
                        <CustomInput labeltext="Country" onChange={this.handleChange} value={this.state.Country} name="Country" disabled={disable} validators={['required', 'maxStringLength:50']} errorMessages={[<Trans>RequiredField</Trans>, <Trans>Max50</Trans>]} requiredMark /><br />
                    </div>

                    <div className="col-sm-4">
                        <h4><Trans>EmploymentDetails</Trans></h4>
                        <CustomInput labeltext="Login" onChange={this.handleChange} value={this.state.Login} name="Login" disabled={disable} validators={['required', 'maxStringLength:50']} errorMessages={[<Trans>RequiredField</Trans>, <Trans>Max50</Trans>]} requiredMark /><br />
                        <CustomSelect labeltext="Position" onChange={e => this.onOptionChange("IdPosition", e)} value={this.state.positionOptions.filter(option => option.value === this.state.IdPosition)} selectOptions={this.state.positionOptions} name="IdPosition" isDisabled={disable} validators={['required']} errorMessages={[<Trans>RequiredField</Trans>]} requiredMark /> <br />
                        <CustomInput labeltext="DateOfEmployment" onChange={this.handleChange} value={this.state.DateOfEmployment} name="DateOfEmployment" disabled /><br />
                        <CustomInput labeltext="LicenseNumber" onChange={this.handleChange} value={this.state.LicenseNumber} name="LicenseNumber" disabled={disable} validators={['maxStringLength:50']} errorMessages={[<Trans>Max50</Trans>]} /><br />
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