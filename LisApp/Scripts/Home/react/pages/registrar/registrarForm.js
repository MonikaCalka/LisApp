import React from 'react';
import { Trans } from 'react-i18next';
import { getStateFromPropsData } from '../../services/getStateFromPropsData';
import CustomInput from '../../components/customInput';
import CustomSelect from '../../components/customSelect';
import { ValidatorForm } from 'react-form-validator-core';
import { requiredField, max50, requiredOrNNMax50, requiredPeselOrNN, requiredPhoneOnNN, requiredOrNNMax15, isPesel, isPhone } from '../../components/validatorRules';

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
    ContactPersonPhone: ""
};

const options = [
    { value: "F", label: <Trans>Female</Trans> },
    { value: "M", label: <Trans>Male</Trans> }
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
        const { title, mode, onAccept, onCancel } = this.props;

        var disable = mode === 'show' ? true : false;
        var cancelText = mode === 'show' ? <Trans>Back</Trans> : <Trans>Cancel</Trans>;
        
        return (
            <div className="modal-div">
                <h2><Trans>{title}</Trans></h2>
                <ValidatorForm id="modalform" onSubmit={onAccept} > 
                    <div className="col-sm-4">
                        <h4><Trans>ContactData</Trans></h4>
                        <CustomInput labeltext="FirstName" onChange={this.handleChange} value={this.state.FirstName} name="FirstName" disabled={disable} {...requiredOrNNMax50}/>
                        <CustomInput labeltext="LastName" onChange={this.handleChange} value={this.state.Surname} name="Surname" disabled={disable} {...requiredOrNNMax50} />
                        <CustomSelect labeltext="Sex" onChange={e => this.onOptionChange("Sex", e)} value={options.filter(option => option.value === this.state.Sex)} selectOptions={options} name="Sex" isDisabled={disable} {...requiredField} />
                        <CustomInput labeltext="PESEL" onChange={this.handleChange} value={this.state.Pesel} name="Pesel" disabled={disable} {...requiredPeselOrNN}/>
                        <CustomInput labeltext="Phone" onChange={this.handleChange} value={this.state.Phone} name="Phone" disabled={disable} {...requiredPhoneOnNN} />
                        <CustomInput labeltext="IdCardNumber" onChange={this.handleChange} value={this.state.IdCardNumber} name="IdCardNumber" disabled={disable} {...max50} />
                    </div>

                    <div className="col-sm-4">
                        <h4><Trans>Address</Trans></h4>
                        <CustomInput labeltext="Street" onChange={this.handleChange} value={this.state.Street} name="Street" disabled={disable} {...requiredOrNNMax50}/>
                        <CustomInput labeltext="HouseNumber" onChange={this.handleChange} value={this.state.HouseNumber} name="HouseNumber" disabled={disable} {...requiredOrNNMax15}/>
                        <CustomInput labeltext="City" onChange={this.handleChange} value={this.state.City} name="City" disabled={disable} {...requiredOrNNMax50}/>
                        <CustomInput labeltext="PostalCode" onChange={this.handleChange} value={this.state.PostalCode} name="PostalCode" disabled={disable} {...requiredOrNNMax15}/>
                        <CustomInput labeltext="Country" onChange={this.handleChange} value={this.state.Country} name="Country" disabled={disable} {...requiredOrNNMax50}/>
                    </div>

                    <div className="col-sm-4">
                    <h4><Trans>ContactPerson</Trans></h4>
                        <CustomInput labeltext="FirstName" onChange={this.handleChange} value={this.state.ContactPersonFirstName} name="ContactPersonFirstName" disabled={disable} {...max50} />
                        <CustomInput labeltext="LastName" onChange={this.handleChange} value={this.state.ContactPersonSurname} name="ContactPersonSurname" disabled={disable} {...max50}/>
                        <CustomInput labeltext="Pesel" onChange={this.handleChange} value={this.state.ContactPersonPesel} name="ContactPersonPesel" disabled={disable} {...isPesel} />
                        <CustomInput labeltext="Phone" onChange={this.handleChange} value={this.state.ContactPersonPhone} name="ContactPersonPhone" disabled={disable} {...isPhone} />
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

export default RegistrarForm;