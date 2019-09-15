﻿import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import CustomInput from '../../../components/customInput';
import { ValidatorForm } from 'react-form-validator-core';
import ModalButtons from '../../../components/modalButtons';
import { max50,  isPesel, isPhone } from '../../../components/validatorRules';

class PatientContactPersonTab extends Component {

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
        const { model, mode, onCancel, onAccept } = this.props;
        var disable = mode === 'show' ? true : false;

        return (
            <div className="row">
                <ValidatorForm id="modalform" onSubmit={mode !== 'show' ? onAccept : this.onNext} >
                    <div>
                        <div className="col-sm-12">
                            <h4><Trans>ContactPerson</Trans></h4>
                            <CustomInput labeltext="FirstName" onChange={this.handleChange} value={model.ContactPersonFirstName} name="ContactPersonFirstName" disabled={disable} {...max50} />
                            <CustomInput labeltext="LastName" onChange={this.handleChange} value={model.ContactPersonSurname} name="ContactPersonSurname" disabled={disable} {...max50} />
                            <CustomInput labeltext="Pesel" onChange={this.handleChange} value={model.ContactPersonPesel} name="ContactPersonPesel" disabled={disable} {...isPesel} />
                            <CustomInput labeltext="Phone" onChange={this.handleChange} value={model.ContactPersonPhone} name="ContactPersonPhone" disabled={disable} {...isPhone} />
                        </div>
                    </div>
                </ValidatorForm>
                <ModalButtons mode={mode} onCancel={onCancel} actualTabIndex={model.actualTabIndex} tabCount={3} onPrev={this.onPrev} onNext={this.onNext} />
            </div>
        );
    }
}

export default PatientContactPersonTab;