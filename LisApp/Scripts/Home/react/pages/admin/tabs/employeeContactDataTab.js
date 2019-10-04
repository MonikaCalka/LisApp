﻿import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import CustomInput from '../../../components/customInput';
import CustomSelect from '../../../components/customSelect';
import { ValidatorForm } from 'react-form-validator-core';
import ModalButtons from '../../../components/modalButtons';
import { requiredField, requiredMax50, requiredPesel, requiredPhone, isEmail } from '../../../components/validatorRules';


const options = [
    { value: "F", label: <Trans>Female</Trans> },
    { value: "M", label: <Trans>Male</Trans> }
];

class EmployeeContactDataTab extends Component {

    handleChange = (event) => {
        const target = event.target;
        this.props.onModelChange(target.name, target.value);
    }

    onOptionChange = (selectName, selectedOption) => {
        this.props.onModelChange(selectName, selectedOption === null ? "" : selectedOption.value);
    };

    onNext = () => {
        const { onCheckPeselAndTabChange, model } = this.props;
        onCheckPeselAndTabChange(model.actualTabIndex + 1);
    }

    render() {
        const { model, mode, onCancel, onFire } = this.props;
        var disable = mode === 'show' ? true : false;

        return (
            <div className="row">
                <ValidatorForm id="modalform" onSubmit={this.onNext} >
                    <div>
                        <div className="col-sm-12">
                            <h4><Trans>ContactData</Trans></h4>
                            <CustomInput labeltext="FirstName" onChange={this.handleChange} value={model.FirstName} name="FirstName" disabled={disable} {...requiredMax50} />
                            <CustomInput labeltext="LastName" onChange={this.handleChange} value={model.Surname} name="Surname" disabled={disable} {...requiredMax50} />
                            <CustomSelect labeltext="Sex" onChange={e => this.onOptionChange("Sex", e)} value={options.filter(option => option.value === model.Sex)} selectOptions={options} name="Sex" isDisabled={disable}  {...requiredField} />
                            <CustomInput labeltext="PESEL" onChange={this.handleChange} value={model.Pesel} name="Pesel" disabled={disable} {...requiredPesel} />
                            <CustomInput labeltext="Phone" onChange={this.handleChange} value={model.Phone} name="Phone" disabled={disable} {...requiredPhone} />
                            <CustomInput labeltext="Email" onChange={this.handleChange} value={model.Email} name="Email" disabled={disable} {...isEmail} />
                        </div>
                    </div>
                </ValidatorForm>
                <ModalButtons mode={mode} onCancel={onCancel} actualTabIndex={model.actualTabIndex} tabCount={3} onPrev={this.onPrev} onNext={this.onNext} onFire={onFire} canFireEmployee={true} />
            </div>
        );
    }
}

export default EmployeeContactDataTab;