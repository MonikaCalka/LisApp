import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import CustomInput from '../../../components/customInput';
import CustomTextArea from '../../../components/customTextArea';
import { ValidatorForm } from 'react-form-validator-core';
import ModalButtons from '../../../components/modalButtons';
import { requiredField } from '../../../components/validatorRules';

class StudyDetailsTab extends Component {

    handleChange = (event) => {
        const target = event.target;
        this.props.onModelChange(target.name, target.value);
    } 

    onNext = () => {
        const { onTabChange, model } = this.props;
        onTabChange(model.actualTabIndex + 1);
    }

    render() {
        const { model, mode, onCancel } = this.props;
        const disable = mode === 'show' ? true : false;

        return (
            <div className="row">
                <ValidatorForm id="modalform" onSubmit={this.onNext} >
                    <div>
                        <div className="col-sm-6">
                            <h4><Trans>DataOfOrder</Trans></h4>
                            <CustomInput labeltext="OrderId" onChange={this.handleChange} value={model.IdOrder} name="IdOrder" disabled />
                            <CustomInput labeltext="Patient" onChange={this.Patient} value={model.Patient} name="Patient" disabled />
                            <CustomInput labeltext="EmployeeNameOrdered" onChange={this.Doctor} value={model.Doctor} name="Doctor" disabled />
                            <CustomInput labeltext="DateOfOrder" onChange={this.handleChange} value={model.DateOfOrder} name="DateOfOrder" disabled />
                            <CustomInput labeltext="Priority" onChange={this.Priority} value={model.Priority} name="Priority" disabled />
                            </div>
                        <div className="col-sm-6">
                            <h4><Trans>DataOfStudy</Trans></h4>
                            <CustomInput labeltext="StudyId" onChange={this.handleChange} value={model.IdStudy} name="IdStudy" disabled />
                            <CustomInput labeltext="Profile" onChange={this.Profile} value={model.Profile} name="Profile" disabled />
                            <CustomInput labeltext="Status" onChange={this.handleChange} value={model.Status} name="Status" disabled />
                            <CustomInput labeltext="EmployeeNameTesting" onChange={this.Lab} value={model.Lab} name="Lab" disabled />
                            <CustomInput labeltext="DateOfStudy" onChange={this.handleChange} value={model.DateOfStudy} name="DateOfStudy" disabled />
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <CustomTextArea rows="4" labeltext="Comment" onChange={this.handleChange} value={model.OrderComment} name="OrderComment" disabled={disable} />
                    </div>
                </ValidatorForm>
                <ModalButtons mode={mode} onCancel={onCancel} actualTabIndex={model.actualTabIndex} tabCount={3} onPrev={this.onPrev} />
            </div>
        );
    }
}

export default StudyDetailsTab;