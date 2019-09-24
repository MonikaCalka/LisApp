﻿import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import CustomInput from '../../../components/customInput';
import { ValidatorForm } from 'react-form-validator-core';
import ModalButtons from '../../../components/modalButtons';
import CustomSelect from '../../../components/customSelect';
import { max50, requiredMax50, requiredField } from '../../../components/validatorRules';

class EmployeeDetailTab extends Component {

    handleChange = (event) => {
        const target = event.target;
        this.props.onModelChange(target.name, target.value);
    }
    onOptionChange = (selectName, selectedOption) => {
        this.props.onModelChange(selectName, selectedOption === null ? "" : selectedOption.value);
    };

    onNext = () => {
        const { onTabChange, model } = this.props;
        onTabChange(model.actualTabIndex + 1);
    }

    onPrev = () => {
        const { onTabChange, model } = this.props;
        onTabChange(model.actualTabIndex - 1);
    }

    render() {
        const { model, mode, onCancel, onAccept, onFire } = this.props;
        var disable = mode === 'show' ? true : false;

        return (
            <div className="row">
                <ValidatorForm id="modalform" onSubmit={mode !== 'show' ? onAccept : this.onNext} >
                    <div>
                        <div className="col-sm-12">
                            <h4><Trans>EmploymentDetails</Trans></h4>
                            <CustomInput labeltext="Login" onChange={this.handleChange} value={model.Login} name="Login" disabled={disable} {...requiredMax50} />
                            <CustomSelect labeltext="Position" onChange={e => this.onOptionChange("IdPosition", e)} value={model.positionOptions.filter(option => option.value === model.IdPosition)} selectOptions={model.positionOptions} name="IdPosition" isDisabled={disable} {...requiredField} />
                            <CustomInput labeltext="DateOfEmployment" onChange={this.handleChange} value={model.DateOfEmployment} name="DateOfEmployment" disabled />
                            <CustomInput labeltext="LicenseNumber" onChange={this.handleChange} value={model.LicenseNumber} name="LicenseNumber" disabled={disable} {...max50} />
                            <CustomSelect labeltext="Ward" onChange={e => this.onOptionChange("IdWard", e)} value={model.wardOptions.filter(option => option.value === model.IdWard)} selectOptions={model.wardOptions} name="IdWard" isDisabled={disable} isClearable />
                        </div>
                    </div>
                </ValidatorForm>
                <ModalButtons mode={mode} onCancel={onCancel} actualTabIndex={model.actualTabIndex} tabCount={3} onPrev={this.onPrev} onNext={this.onNext} onFire={onFire} canFireEmployee={true} />
            </div>
        );
    }
}

export default EmployeeDetailTab;