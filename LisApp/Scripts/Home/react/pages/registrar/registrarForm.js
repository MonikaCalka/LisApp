import React from 'react';
import { Trans } from 'react-i18next';
import { getJson } from '../../services/rests';
import CustomInput from '../../components/CustomInput';

class RegistrarForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    onChange = () => {
     
    };

    render() {
        const { title, mode, data } = this.props;
        var disable = mode === 'show' ? true : false;
        return (
            <div className="modal-div">
                <h2><Trans>{title}</Trans></h2>
                <div className="col-sm-6">
                    <h4><Trans>ContactData</Trans></h4>
                    <CustomInput labeltext="FirstName" onChange={this.onChange} value={data !== null ? data.FirstName : ""} name="FirstName" disabled={disable}/><br />
                    <CustomInput labeltext="LastName" onChange={this.onChange} value={data !== null ? data.Surname : ""} name="Surname" disabled={disable}/><br/>
                    <CustomInput labeltext="Sex" onChange={this.onChange} value={data !== null ? data.Sex : ""} name="Sex" disabled={disable} /><br/>
                    <CustomInput labeltext="PESEL" onChange={this.onChange} value={data !== null ? data.Pesel : ""} name="Pesel" disabled={disable} /><br />
                    <CustomInput labeltext="Phone" onChange={this.onChange} value={data !== null ? data.Phone : ""} name="Phone" disabled={disable}/><br />
                    <CustomInput labeltext="IdCardNumber" onChange={this.onChange} value={data !== null && data.IdCardNumber !== null ? data.IdCardNumber : ""} name="IdCardNumber" disabled={disable}/><br />
                    <CustomInput labeltext="Insurance" onChange={this.onChange} value={data !== null && data.Insurance !== null ? data.Insurance : ""} name="Insurance" disabled={disable}/><br />
                </div>

                <div className="col-sm-6">
                    <h4><Trans>Address</Trans></h4>
                    <CustomInput labeltext="Street" onChange={this.onChange} value={data !== null ? data.Street : ""} name="Street" disabled={disable}/><br />
                    <CustomInput labeltext="HouseNumber" onChange={this.onChange} value={data !== null ? data.HouseNumber : ""} name="HouseNumber" disabled={disable}/><br />
                    <CustomInput labeltext="City" onChange={this.onChange} value={data !== null ? data.City : ""} name="City" disabled={disable}/><br />
                    <CustomInput labeltext="PostalCode" onChange={this.onChange} value={data !== null ? data.PostalCode : ""} name="PostalCode" disabled={disable}/><br />
                    <CustomInput labeltext="Country" onChange={this.onChange} value={data !== null ? data.Country : ""} name="Country" disabled={disable}/><br />

                    <h4><Trans>ContactPerson</Trans></h4>
                    <CustomInput labeltext="FirstName" onChange={this.onChange} value={data !== null && data.ContactPersonFirstName !== null ? data.ContactPersonFirstName : ""} name="ContactPersonFirstName" disabled={disable}/><br />
                    <CustomInput labeltext="LastName" onChange={this.onChange} value={data !== null && data.ContactPersonSurname !== null ? data.ContactPersonSurname : ""} name="ContactPersonSurame" disabled={disable} /><br />
                    <CustomInput labeltext="Pesel" onChange={this.onChange} value={data !== null && data.ContactPersonPesel !== null ? data.ContactPersonPesel : ""} name="ContactPersonPesel" disabled={disable} /><br />
                    <CustomInput labeltext="Phone" onChange={this.onChange} value={data !== null && data.ContactPersonPhone !== null ? data.ContactPersonPhone : ""} name="ContactPersonPhone" disabled={disable}/><br />
                </div>
            </div>
        );
    }
}

export default RegistrarForm;