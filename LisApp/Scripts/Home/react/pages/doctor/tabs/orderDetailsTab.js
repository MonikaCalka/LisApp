import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import CustomInput from '../../../components/customInput';
import CustomSelect from '../../../components/customSelect';
import { ValidatorForm } from 'react-form-validator-core';
import ModalButtons from '../../../components/modalButtons';
import CustomTextArea from '../../../components/customTextArea';

class OrderDetailsTab extends Component {

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

        return (
            <div className="row">
                <ValidatorForm id="modalform" onSubmit={this.onNext} >
                    <div>
                        <div className="col-sm-6">
                            <h4><Trans>DataOfOrder</Trans></h4>
                            <CustomInput labeltext="DateOfOrder" onChange={this.handleChange} value={model.DateOfOrder} name="DateOfOrder" disabled />
                            <CustomInput labeltext="EmployeeNameOrdered" onChange={this.handleChange} value={model.EmployeeName} name="EmployeeName" disabled />
                            <CustomSelect labeltext="Ward" onChange={e => this.onOptionChange("IdWard", e)} value={model.wardOptions.filter(option => option.value === model.IdWard)} selectOptions={model.wardOptions} name="IdWard" isDisabled={disable} isClearable />
                            <CustomInput labeltext="Institution" onChange={this.handleChange} value={model.Institution} name="Institution" disabled={disable} />
                            <CustomSelect labeltext="Consultants" onChange={e => this.onMultiOptionChange("IdConsultants", e)} value={model.doctorOptions.filter(option => model.IdConsultants !== [] ? model.IdConsultants.includes(option.value) : false)} selectOptions={model.doctorOptions} name="IdConsultants" isDisabled={disable} isMulti closeMenuOnSelect={false} className="basic-multi-select"/>
                        </div>

                        <div className="col-sm-6">
                            <h4><Trans>OrderDetail</Trans></h4>
                            <CustomInput labeltext="OrderId" onChange={this.handleChange} value={model.IdOrder} name="IdOrder" disabled />
                            <CustomInput labeltext="Status" onChange={this.handleChange} value={model.Status} name="Status" disabled />
                            <CustomSelect labeltext="Priority" onChange={e => this.onOptionChange("IdPriority", e)} value={model.priorityOptions.filter(option => option.value === model.IdPriority)} selectOptions={model.priorityOptions} name="IdPriority" isDisabled={disable} validators={['required']} errorMessages={[<Trans>RequiredField</Trans>]} requiredMark />
                            <CustomTextArea rows="6" labeltext="Comment" onChange={this.handleChange} value={model.Comment} name="Comment" disabled={disable} />
                        </div>
                    </div>
                </ValidatorForm>
                <ModalButtons mode={mode} onCancel={onCancel} actualTabIndex={model.actualTabIndex} tabCount={3} onPrev={this.onPrev} />
            </div>
        )
    }
}

export default OrderDetailsTab;