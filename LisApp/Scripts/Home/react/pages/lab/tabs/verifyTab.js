import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import { ValidatorForm } from 'react-form-validator-core';
import ModalButtons from '../../../components/modalButtons';
import CustomInput from '../../../components/customInput';
import CustomTextArea from '../../../components/customTextArea';
import VerificationModel from '../../../models/verificationModel';

class VerifyTab extends Component {

    handleChange(event) {
        const target = event.target;
        this.props.onModelChange(target.name, target.value);
    }

    handleVerifyChange = (event) => {
        const target = event.target;
        let verification = new VerificationModel();
        verification.Description = target.value;
        const editedResult = { ...this.props.model.Result, Verification: verification };
        this.props.onModelChange(target.name, editedResult);
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
        const { model, mode, onCancel, tabCount, onAccept } = this.props;

        let disable = mode !== 'verify' ? true : false;
        return (
            <div className="row">
                <ValidatorForm id="modalform" onSubmit={onAccept} >
                    <div>
                        <div className="col-sm-12">
                            <h4><Trans>Verification</Trans></h4>
                            <CustomInput labeltext="LabVerifyName" onChange={this.handleChange} value={model.Result.Verification.EmployeeName ? model.Result.Verification.EmployeeName : ""} name="EmployeeName" disabled />
                            <CustomInput labeltext="DateOfVerification" onChange={this.handleChange} value={model.Result.Verification.DateOfVerification ? model.Result.Verification.DateOfVerification : ""} name="DateOfVerification" disabled />
                            <CustomTextArea rows="4" labeltext="VerifyDesc" onChange={this.handleVerifyChange} value={model.Result.Verification.Description ? model.Result.Verification.Description : ""} name="Result" disabled={disable} />
                        </div>
                    </div>
                </ValidatorForm>
                <ModalButtons mode={mode} onCancel={onCancel} actualTabIndex={model.actualTabIndex} tabCount={tabCount} onPrev={this.onPrev} />
            </div>
        );
    }
}

export default VerifyTab;