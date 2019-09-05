﻿import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import CustomInput from '../../../components/customInput';
import CustomSelect from '../../../components/customSelect';
import { ValidatorForm } from 'react-form-validator-core';
import ModalButtons from '../../../components/modalButtons';
import CustomTextArea from '../../../components/customTextArea';
import { requiredField } from '../../../components/validatorRules';

class NurseOrderDetailsTab extends Component {

    handleChange = (event) => {
        const target = event.target;
        this.props.onModelChange(target.name, target.value);
    }

    onOptionChange = (selectName, selectedOption) => {
        this.props.onModelChange(selectName, selectedOption === null ? "" : selectedOption.value);
    };

    onMultiOptionChange = (selectName, selectedOption) => {
        var arr = !!selectedOption ? selectedOption.map(item => item.value) : [];
        this.props.onModelChange(selectName, arr);
    };

    onPrev = () => {
        const { onTabChange, model } = this.props;
        onTabChange(model.actualTabIndex - 1);
    }

    onNext = () => {
        const { onTabChange, model } = this.props;
        onTabChange(model.actualTabIndex + 1);
    }

    render() {
        const { model, mode, onCancel } = this.props;
        const disable = mode === 'show' ? true : false;
        const disableInProgress = mode === 'show' || (mode !== 'add' && model.IdStatus !== 1) ? true : false;
        const disableEnded = mode === 'show' || (mode !== 'add' && model.IdStatus === 6) ? true : false;

        return (
            <div className="row">
                <ValidatorForm id="modalform" onSubmit={this.onNext} >
                    <div>
                        <div className="col-sm-12">
                            <h4><Trans>DataOfOrder</Trans></h4>
                            <CustomInput labeltext="OrderId" onChange={this.handleChange} value={model.IdOrder} name="IdOrder" disabled />
                            <CustomInput labeltext="Patient" onChange={this.handleChange} value={model.PatientName} name="PatientName" disabled />
                            <CustomInput labeltext="EmployeeNameOrdered" onChange={this.handleChange} value={model.EmployeeName} name="EmployeeName" disabled />
                            <CustomInput labeltext="Priority" onChange={this.handleChange} value={model.Priority} name="Priority" disabled />
                            <CustomInput labeltext="Status" onChange={this.handleChange} value={model.Status} name="Status" disabled />
                            <CustomTextArea rows="4" labeltext="Comment" onChange={this.handleChange} value={model.Comment} name="Comment" disabled={disableEnded} />
                        </div>
                    </div>
                </ValidatorForm>
                <ModalButtons mode={mode} onCancel={onCancel} actualTabIndex={model.actualTabIndex} tabCount={3} onPrev={this.onPrev} />
            </div>
        );
    }
}

export default NurseOrderDetailsTab;