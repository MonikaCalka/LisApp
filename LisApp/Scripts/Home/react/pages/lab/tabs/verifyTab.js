import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import { ValidatorForm } from 'react-form-validator-core';
import ModalButtons from '../../../components/modalButtons';
import CustomInput from '../../../components/customInput';
import CustomTextArea from '../../../components/customTextArea';
import VerificationModel from '../../../models/verificationModel';
import YesNoButtons from '../../../components/yesNoButtons';
import { requiredField } from '../../../components/validatorRules';

class VerifyTab extends Component {

    state = {
        checkedValueOfVerify: null,
        checkedValueOfRepeat: null,
        verification: new VerificationModel()
    }

    componentDidMount() {
        if (this.props.mode === 'verify') {
            this.setDefaultValues();
        } else {
            this.checkRealValues();
        }
    }

    handleChange(event) {
        const target = event.target;
        this.props.onModelChange(target.name, target.value);
    }

    handleVerifyChange = (event) => {
        const target = event.target;
        let newVerification = this.state.verification;
        newVerification.Description = target.value;
        this.setState({ verification: newVerification });
        const editedResult = { ...this.props.model.Result, Verification: newVerification };
        this.props.onModelChange(target.name, editedResult);
    }
    handleRepeatChange = (event) => {
        this.props.onModelChange(event.target.name, event.target.value);
    }

    onPrev = () => {
        const { onTabChange, model } = this.props;
        onTabChange(model.actualTabIndex - 1);
    }

    onNext = () => {
        const { onTabChange, model } = this.props;
        onTabChange(model.actualTabIndex + 1);
    }

    onChangeVerifyRadioButtons = (event) => {
        const target = event.target;
        let newVerification = this.state.verification;
        newVerification.Positive = target.value;
        this.setState({
            verification: newVerification,
            checkedValueOfVerify: target.value
        });
        const editedResult = { ...this.props.model.Result, Verification: newVerification };
        this.props.onModelChange(target.name, editedResult);
    }

    onChangeRepeatRadioButtons = (event) => {
        const target = event.target;
        this.setState({
            checkedValueOfRepeat: target.value
        });
        this.props.onModelChange(target.name, target.value);
    }

    setDefaultValues() {
        this.setState({
            checkedValueOfVerify: true,
            checkedValueOfRepeat: true
        });

        let newVerification = this.state.verification;
        newVerification.Positive = true;
        this.setState({
            verification: newVerification
        });
        const editedResult = { ...this.props.model.Result, Verification: newVerification };
        this.props.onModelChange("Result", editedResult);
        this.props.onModelChange("NeedNewSample", true);
        console.log(this.props.model);
    }

    checkRealValues() {
        if (this.props.model.Result.Verification.Positive === true) {
            this.setState({
                checkedValueOfVerify: true
            });
        } else if (this.props.model.Result.Verification.Positive === false) {
            this.setState({
                checkedValueOfVerify: false
            });
        }
    }

    render() {
        const { model, mode, onCancel, tabCount, onAccept } = this.props;
        
        let required = mode !== 'show' ? requiredField : null;
        let disable = mode !== 'verify';
        let verificationDescription = null;
        if ((mode !== 'verify') || (this.state.checkedValueOfVerify !== false && this.state.checkedValueOfVerify !== "false")) {
            verificationDescription = <CustomTextArea rows="4" labeltext="VerifyDesc" onChange={this.handleVerifyChange} value={model.Result.Verification.Description ? model.Result.Verification.Description : ""} name="Result" disabled={disable} {...required} />;
        } else {
            verificationDescription = <div>
                <CustomTextArea rows="4" labeltext="ReasonForRepeat" onChange={this.handleRepeatChange} value={model.ReasonForRepeat ? model.ReasonForRepeat : ""} name="ReasonForRepeat" disabled={disable} {...required} />
                <YesNoButtons checkedValue={this.state.checkedValueOfRepeat} onChange={this.onChangeRepeatRadioButtons} name="NeedNewSample" labelName="NeedNewSample" disabled={disable} />
            </div>;
        }
        return (
            <div className="row">
                <ValidatorForm id="modalform" onSubmit={mode === "verify" ? onAccept : this.onNext} >
                    <div>
                        <div className="col-sm-12">
                            <h4><Trans>Verification</Trans></h4>
                            <CustomInput labeltext="LabVerifyName" onChange={this.handleChange} value={model.Result.Verification.EmployeeName ? model.Result.Verification.EmployeeName : ""} name="EmployeeName" disabled />
                            <CustomInput labeltext="DateOfVerification" onChange={this.handleChange} value={model.Result.Verification.DateOfVerification ? model.Result.Verification.DateOfVerification : ""} name="DateOfVerification" disabled />
                            <YesNoButtons checkedValue={this.state.checkedValueOfVerify} onChange={this.onChangeVerifyRadioButtons} labelName="PositiveVerify" value={model.Result.Verification.Positive ? model.Result.Verification.Positive : ""} name="Result" disabled={disable}/>
                            {verificationDescription}
                        </div>
                    </div>
                </ValidatorForm>
                <ModalButtons mode={mode} onCancel={onCancel} actualTabIndex={model.actualTabIndex} tabCount={tabCount} onPrev={this.onPrev} />
            </div>
        );
    }
}

export default VerifyTab;