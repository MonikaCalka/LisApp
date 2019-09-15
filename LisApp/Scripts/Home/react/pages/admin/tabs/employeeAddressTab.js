﻿import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import CustomInput from '../../../components/customInput';
import { ValidatorForm } from 'react-form-validator-core';
import ModalButtons from '../../../components/modalButtons';
import { requiredMax50, requiredMax15 } from '../../../components/validatorRules';

class EmployeeAddressTab extends Component {

    handleChange = (event) => {
        const target = event.target;
        this.props.onModelChange(target.name, target.value);
    }

    onNext = () => {
        const { onTabChange, model } = this.props;
        onTabChange(model.actualTabIndex + 1);
    }

    onPrev = () => {
        const { onTabChange, model } = this.props;
        onTabChange(model.actualTabIndex - 1);
    }

    render() {
        const { model, mode, onCancel, onFire} = this.props;
        var disable = mode === 'show' ? true : false;

        return (
            <div className="row">
                <ValidatorForm id="modalform" onSubmit={this.onNext} >
                    <div>
                        <div className="col-sm-12">
                            <h4><Trans>Address</Trans></h4>
                            <CustomInput labeltext="Street" onChange={this.handleChange} value={model.Street} name="Street" disabled={disable} {...requiredMax50} />
                            <CustomInput labeltext="HouseNumber" onChange={this.handleChange} value={model.HouseNumber} name="HouseNumber" disabled={disable} {...requiredMax15} />
                            <CustomInput labeltext="City" onChange={this.handleChange} value={model.City} name="City" disabled={disable} {...requiredMax50} />
                            <CustomInput labeltext="PostalCode" onChange={this.handleChange} value={model.PostalCode} name="PostalCode" disabled={disable} {...requiredMax15} />
                            <CustomInput labeltext="Country" onChange={this.handleChange} value={model.Country} name="Country" disabled={disable} {...requiredMax50} />
                        </div>
                    </div>
                </ValidatorForm>
                <ModalButtons mode={mode} onCancel={onCancel} actualTabIndex={model.actualTabIndex} tabCount={3} onPrev={this.onPrev} onNext={this.onNext} onFire={onFire} canFireEmployee={true} />
            </div>
        );
    }
}

export default EmployeeAddressTab;