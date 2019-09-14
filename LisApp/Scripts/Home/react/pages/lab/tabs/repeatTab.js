import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import { ValidatorForm } from 'react-form-validator-core';
import ModalButtons from '../../../components/modalButtons';
import CustomInput from '../../../components/customInput';
import CustomTextArea from '../../../components/customTextArea';
import VerificationModel from '../../../models/verificationModel';
import YesNoButtons from '../../../components/yesNoButtons';
import { requiredField } from '../../../components/validatorRules';

class RepeatTab extends Component {

    state = {
        checkedValueOfRepeat: null
    }

    componentDidMount() {
        if (this.props.mode === 'repeat') {
            this.setDefaultValues();
        } else {
            this.checkRealValues();
        }
    }

    handleChange = (event) => {
        const target = event.target;
        this.props.onModelChange(target.name, target.value);
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

    onChangeRepeatRadioButtons = (event) => {
        const target = event.target;
        this.setState({
            checkedValueOfRepeat: target.value
        });
        this.props.onModelChange(target.name, target.value);
    }

    setDefaultValues() {
        this.setState({
            checkedValueOfRepeat: true
        });
        this.props.onModelChange("NeedNewSample", true);
    }

    checkRealValues() {
        if (this.props.model.NeedNewSample === true) {
            this.setState({
                checkedValueOfRepeat: true
            });
        } else if (this.props.model.NeedNewSample === false) {
            this.setState({
                checkedValueOfRepeat: false
            });
        }
    }

    render() {
        const { model, mode, onCancel, tabCount, onAccept } = this.props;

        let disable = mode !== 'repeat';

        let needNewSample = mode === 'repeat' ? <YesNoButtons checkedValue={this.state.checkedValueOfRepeat} onChange={this.onChangeRepeatRadioButtons} name="NeedNewSample" labelName="NeedNewSample" disabled={disable} /> : null;

        return (
            <div className="row">
                <ValidatorForm id="modalform" onSubmit={mode === 'repeat' ? onAccept : this.onNext} >
                    <div>
                        <div className="col-sm-12">
                            <h4><Trans>Repeat</Trans></h4>
                            <CustomInput labeltext="LabRepeatName" onChange={this.handleChange} value={model.Result.Verification.EmployeeName ? model.Result.Verification.EmployeeName : ""} name="EmployeeName" disabled />
                            <CustomInput labeltext="DateOfEnd" onChange={this.handleChange} value={model.Result.DateOfEnd ? model.Result.DateOfEnd : ""} name="DateOfEnd" disabled />
                            <CustomTextArea rows="4" labeltext="ReasonForRepeat" onChange={this.handleRepeatChange} value={model.ReasonForRepeat ? model.ReasonForRepeat : ""} name="ReasonForRepeat" disabled={disable} {...requiredField} />
                            {needNewSample}
                        </div>
                    </div>
                </ValidatorForm>
                <ModalButtons mode={mode} onCancel={onCancel} actualTabIndex={model.actualTabIndex} tabCount={tabCount} onPrev={this.onPrev} />
            </div>
        );
    }
}

export default RepeatTab;