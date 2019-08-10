import React from 'react';
import { Trans } from 'react-i18next';
import { getJson } from '../../services/rests';
import { getStateFromPropsData } from '../../services/getStateFromPropsData';
import CustomInput from '../../components/customInput';
import CustomSelect from '../../components/customSelect';
import { ValidatorForm } from 'react-form-validator-core';

const emptyState = {
    FirstName: "",
    Surname: "",
    Sex: "",
    Pesel: "",
    Phone: "",
    IdCardNumber: "",
    Insurance: "",
    Street: "",
    HouseNumber: "",
    City: "",
    PostalCode: "",
    Country: "",
    ContactPersonFirstName: "",
    ContactPersonSurname: "",
    ContactPersonPesel: "",
    ContactPersonPhone: ""
};

const options = [
    { value: "F", label: <Trans>Female</Trans> },
    { value: "M", label: <Trans>Male</Trans> }
];

class AdminForm extends React.Component {

    constructor(props) {
        super(props);

        if (this.props.mode !== 'add') {
            this.state = getStateFromPropsData(props.data, emptyState);
        } else {
            this.state = emptyState;
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSelectChanged = selectedOption => {
        this.setState({ Sex: selectedOption.value });
        console.log(`Option selected:`, selectedOption.value);
    };

    getData() {
        return this.state;
    }

    render() {
        const { title, mode, onAccept, onCancel } = this.props;

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
                        <CustomSelect labeltext="Sex" onChange={this.handleSelectChanged} value={options.filter(option => option.value === this.state.Sex)} selectOptions={options} name="Sex" isDisabled={disable} validators={['required']} errorMessages={[<Trans>RequiredField</Trans>]} requiredMark /> <br />
                        <CustomInput labeltext="PESEL" onChange={this.handleChange} value={this.state.Pesel} name="Pesel" disabled={disable} validators={['required', 'maxStringLength:11']} errorMessages={[<Trans>RequiredField</Trans>, <Trans>Max11</Trans>]} requiredMark /><br />
                        <CustomInput labeltext="Phone" onChange={this.handleChange} value={this.state.Phone} name="Phone" disabled={disable} validators={['required', 'maxStringLength:9']} errorMessages={[<Trans>RequiredField</Trans>, <Trans>Max9</Trans>]} requiredMark /><br />
                        <CustomInput labeltext="IdCardNumber" onChange={this.handleChange} value={this.state.IdCardNumber} name="IdCardNumber" disabled={disable} validators={['maxStringLength:50']} errorMessages={[<Trans>Max50</Trans>]} /><br />
                        <CustomInput labeltext="Insurance" onChange={this.handleChange} value={this.state.Insurance} name="Insurance" disabled={disable} validators={['maxStringLength:50']} errorMessages={[<Trans>Max50</Trans>]} /><br />
                    </div>

                    <div className="col-sm-4">
                        <h4><Trans>Address</Trans></h4>
                        <CustomInput labeltext="Street" onChange={this.handleChange} value={this.state.Street} name="Street" disabled={disable} validators={['required', 'maxStringLength:50']} errorMessages={[<Trans>RequiredField</Trans>, <Trans>Max50</Trans>]} requiredMark /><br />
                        <CustomInput labeltext="HouseNumber" onChange={this.handleChange} value={this.state.HouseNumber} name="HouseNumber" disabled={disable} validators={['required', 'maxStringLength:50']} errorMessages={[<Trans>RequiredField</Trans>, <Trans>Max50</Trans>]} requiredMark /><br />
                        <CustomInput labeltext="City" onChange={this.handleChange} value={this.state.City} name="City" disabled={disable} validators={['required', 'maxStringLength:50']} errorMessages={[<Trans>RequiredField</Trans>, <Trans>Max50</Trans>]} requiredMark /><br />
                        <CustomInput labeltext="PostalCode" onChange={this.handleChange} value={this.state.PostalCode} name="PostalCode" disabled={disable} validators={['required', 'maxStringLength:50']} errorMessages={[<Trans>RequiredField</Trans>, <Trans>Max50</Trans>]} requiredMark /><br />
                        <CustomInput labeltext="Country" onChange={this.handleChange} value={this.state.Country} name="Country" disabled={disable} validators={['required', 'maxStringLength:50']} errorMessages={[<Trans>RequiredField</Trans>, <Trans>Max50</Trans>]} requiredMark /><br />
                    </div>

                    <div className="col-sm-4">
                        <h4><Trans>ContactPerson</Trans></h4>
                        <CustomInput labeltext="FirstName" onChange={this.handleChange} value={this.state.ContactPersonFirstName} name="ContactPersonFirstName" disabled={disable} validators={['maxStringLength:50']} errorMessages={[<Trans>Max50</Trans>]} /><br />
                        <CustomInput labeltext="LastName" onChange={this.handleChange} value={this.state.ContactPersonSurname} name="ContactPersonSurname" disabled={disable} validators={['maxStringLength:50']} errorMessages={[<Trans>Max50</Trans>]} /><br />
                        <CustomInput labeltext="Pesel" onChange={this.handleChange} value={this.state.ContactPersonPesel} name="ContactPersonPesel" disabled={disable} validators={['maxStringLength:11']} errorMessages={[<Trans>Max11</Trans>]} /><br />
                        <CustomInput labeltext="Phone" onChange={this.handleChange} value={this.state.ContactPersonPhone} name="ContactPersonPhone" disabled={disable} validators={['maxStringLength:9']} errorMessages={[<Trans>Max9</Trans>]} /><br />
                    </div>
                </ValidatorForm>
                <div className="save-cancel-buttons">
                    {mode !== 'show' ? <button type="submit" form="modalform">{<Trans>Save</Trans>}</button> : null}
                    <button onClick={onCancel}>{cancelText}</button>
                </div>
            </div>
        );
    }
}

export default AdminForm;