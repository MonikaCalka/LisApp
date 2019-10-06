﻿import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import CustomInput from '../../../components/customInput';
import CustomSelect from '../../../components/customSelect';
import { ValidatorForm } from 'react-form-validator-core';
import ModalButtons from '../../../components/modalButtons';
import { requiredField, max50, requiredOrNNMax50, requiredPeselOrNN, requiredPhoneOnNN, requiredMax4Number } from '../../../components/validatorRules';


const options = [
    { value: "F", label: <Trans>Female</Trans> },
    { value: "M", label: <Trans>Male</Trans> }
];

class PatientContactDataTab extends Component {

    handleChange = (event) => {
        const target = event.target;
        this.props.onModelChange(target.name, target.value);
    }

    onOptionChange = (selectName, selectedOption) => {
        this.props.onModelChange(selectName, selectedOption === null ? "" : selectedOption.value);
    };

    onNext = () => {
        const { model, onCheckPeselAndTabChange } = this.props;
        onCheckPeselAndTabChange(model.actualTabIndex + 1);
    }

    render() {
        const { model, mode, onCancel } = this.props;
        var disable = mode === 'show' ? true : false;
        var pin = null;
        if (mode === 'add')
            pin = <CustomInput labeltext="Pin" onChange={this.handleChange} value={model.Password} name="Password" disabled={disable} {...requiredMax4Number} type="password" />;
        return (
            <div className="row">
                <ValidatorForm id="modalform" onSubmit={this.onNext} >
                    <div>
                        <div className="col-sm-12">
                            <h4><Trans>ContactData</Trans></h4>
                            <CustomInput labeltext="FirstName" onChange={this.handleChange} value={model.FirstName} name="FirstName" disabled={disable} {...requiredOrNNMax50} />
                            <CustomInput labeltext="LastName" onChange={this.handleChange} value={model.Surname} name="Surname" disabled={disable} {...requiredOrNNMax50} />
                            <CustomSelect labeltext="Sex" onChange={e => this.onOptionChange("Sex", e)} value={options.filter(option => option.value === model.Sex)} selectOptions={options} name="Sex" isDisabled={disable} {...requiredField} />
                            <CustomInput labeltext="PESEL" onChange={this.handleChange} value={model.Pesel} name="Pesel" disabled={disable} {...requiredPeselOrNN} />
                            <CustomInput labeltext="Phone" onChange={this.handleChange} value={model.Phone} name="Phone" disabled={disable} {...requiredPhoneOnNN} />
                            <CustomInput labeltext="IdCardNumber" onChange={this.handleChange} value={model.IdCardNumber} name="IdCardNumber" disabled={disable} {...max50} />
                            {pin}
                        </div>
                    </div>
                </ValidatorForm>
                <ModalButtons mode={mode} onCancel={onCancel} actualTabIndex={model.actualTabIndex} tabCount={3} onPrev={this.onPrev} onNext={this.onNext} />
            </div>
        );
    }
}

export default PatientContactDataTab;