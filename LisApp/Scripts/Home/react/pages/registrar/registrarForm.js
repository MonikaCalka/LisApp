import React from 'react';
import { Trans } from 'react-i18next';
import { getJson } from '../../services/rests';
import { getStateFromPropsData } from '../../services/getStateFromPropsData';
import CustomInput from '../../components/customInput';
import CustomSelect from '../../components/customSelect';

const emptyState  = {
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

class RegistrarForm extends React.Component {

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
        this.setState({ Sex: selectedOption.value});
        console.log(`Option selected:`, selectedOption.value);
    };

    getData() {
        return this.state;
    }

    render() {
        const { title, mode } = this.props;

        var disable = mode === 'show' ? true : false;
        return (
            <div className="modal-div">
                <h2><Trans>{title}</Trans></h2>
                <div className="col-sm-6">
                    <h4><Trans>ContactData</Trans></h4>
                    <CustomInput labeltext="FirstName" onChange={this.handleChange} value={this.state.FirstName} name="FirstName" disabled={disable}/><br />
                    <CustomInput labeltext="LastName" onChange={this.handleChange} value={this.state.Surname} name="Surname" disabled={disable} /><br />
                    <CustomSelect labeltext="Sex" onChange={this.handleSelectChanged} value={options.filter(option => option.value === this.state.Sex)} selectOptions={options} name="Sex" disabled={disable}  /> <br />
                    <CustomInput labeltext="PESEL" onChange={this.handleChange} value={this.state.Pesel} name="Pesel" disabled={disable} /><br />
                    <CustomInput labeltext="Phone" onChange={this.handleChange} value={this.state.Phone} name="Phone" disabled={disable} /><br />
                    <CustomInput labeltext="IdCardNumber" onChange={this.handleChange} value={this.state.IdCardNumber} name="IdCardNumber" disabled={disable}/><br />
                    <CustomInput labeltext="Insurance" onChange={this.handleChange} value={this.state.Insurance} name="Insurance" disabled={disable}/><br />
                </div>

                <div className="col-sm-6">
                    <h4><Trans>Address</Trans></h4>
                    <CustomInput labeltext="Street" onChange={this.handleChange} value={this.state.Street} name="Street" disabled={disable} /><br />
                    <CustomInput labeltext="HouseNumber" onChange={this.handleChange} value={this.state.HouseNumber} name="HouseNumber" disabled={disable} /><br />
                    <CustomInput labeltext="City" onChange={this.handleChange} value={this.state.City} name="City" disabled={disable} /><br />
                    <CustomInput labeltext="PostalCode" onChange={this.handleChange} value={this.state.PostalCode} name="PostalCode" disabled={disable} /><br />
                    <CustomInput labeltext="Country" onChange={this.handleChange} value={this.state.Country} name="Country" disabled={disable} /><br />

                    <h4><Trans>ContactPerson</Trans></h4>
                    <CustomInput labeltext="FirstName" onChange={this.handleChange} value={this.state.ContactPersonFirstName} name="ContactPersonFirstName" disabled={disable}/><br />
                    <CustomInput labeltext="LastName" onChange={this.handleChange} value={this.state.ContactPersonSurname} name="ContactPersonSurname" disabled={disable} /><br />
                    <CustomInput labeltext="Pesel" onChange={this.handleChange} value={this.state.ContactPersonPesel} name="ContactPersonPesel" disabled={disable} /><br />
                    <CustomInput labeltext="Phone" onChange={this.handleChange} value={this.state.ContactPersonPhone} name="ContactPersonPhone" disabled={disable}/><br />
                </div>
            </div>
        );
    }
}

export default RegistrarForm;