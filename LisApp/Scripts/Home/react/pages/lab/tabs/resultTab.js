import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import { ValidatorForm } from 'react-form-validator-core';
import ModalButtons from '../../../components/modalButtons';
import CustomInput from '../../../components/customInput';
import CustomTextArea from '../../../components/customTextArea';

class ResultTab extends Component {

    handleChange(event) {
        const target = event.target;
        this.props.onModelChange(target.name, target.value);
    }

    onPrev = () => {
        const { onTabChange, model } = this.props;
        onTabChange(model.actualTabIndex - 1);
    }

    onNext = () => {
        const { onTabChange, model } = this.props;
        onTabChange(model.actualTabIndex + 1);
    }

    render() {
        const { model, mode, onCancel, tabCount } = this.props;
        return (
            <div className="row">
                <ValidatorForm id="modalform" onSubmit={this.onNext} >
                    <div>
                        <div className="col-sm-12">
                            <h4><Trans>Result</Trans></h4>
                            <CustomInput labeltext="LabResultName" onChange={this.handleChange} value={model.Result.EmployeeName ? model.Result.EmployeeName : ""} name="EmployeeName" disabled />
                            <CustomInput labeltext="DateOfResult" onChange={this.handleChange} value={model.Result.DateOfResult ? model.Result.DateOfResult : ""} name="DateOfResult" disabled />
                            <CustomTextArea rows="4" labeltext="ResultDesc" onChange={this.handleResultChange} value={model.Result.Description !== null ? model.Result.Description : ""} name="Description" disabled />
                        </div>
                    </div>
                </ValidatorForm>
                <ModalButtons mode={mode} onCancel={onCancel} actualTabIndex={model.actualTabIndex} tabCount={tabCount} onPrev={this.onPrev} />
            </div>
        );
    }
}

export default ResultTab;