﻿import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import CustomInput from '../../../components/customInput';
import { ValidatorForm } from 'react-form-validator-core';
import ModalButtons from '../../../components/modalButtons';
import { requiredOrNNMax50, requiredOrNNMax15 } from '../../../components/validatorRules';

class PatientAddressTab extends Component {

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
        const { model, mode, onCancel } = this.props;
        var disable = mode === 'show' ? true : false;

        return (
            <div className="row">
                <ValidatorForm id="modalform" onSubmit={this.onNext} >
                    <div>
                        <div className="col-sm-12">
                            <h4><Trans>Address</Trans></h4>
                            <CustomInput labeltext="Street" onChange={this.handleChange} value={model.Street} name="Street" disabled={disable} {...requiredOrNNMax50} />
                            <CustomInput labeltext="HouseNumber" onChange={this.handleChange} value={model.HouseNumber} name="HouseNumber" disabled={disable} {...requiredOrNNMax15} />
                            <CustomInput labeltext="City" onChange={this.handleChange} value={model.City} name="City" disabled={disable} {...requiredOrNNMax50} />
                            <CustomInput labeltext="PostalCode" onChange={this.handleChange} value={model.PostalCode} name="PostalCode" disabled={disable} {...requiredOrNNMax15} />
                            <CustomInput labeltext="Country" onChange={this.handleChange} value={model.Country} name="Country" disabled={disable} {...requiredOrNNMax50} />
                        </div>
                    </div>
                </ValidatorForm>
                <ModalButtons mode={mode} onCancel={onCancel} actualTabIndex={model.actualTabIndex} tabCount={3} onPrev={this.onPrev} onNext={this.onNext} />
            </div>
        );
    }
}

export default PatientAddressTab;