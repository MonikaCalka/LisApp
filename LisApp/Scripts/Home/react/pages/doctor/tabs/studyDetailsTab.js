import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import CustomInput from '../../../components/customInput';
import CustomSelect from '../../../components/customSelect';
import { ValidatorForm } from 'react-form-validator-core';
import ModalButtons from '../../../components/modalButtons';
import { requiredField } from '../../../components/validatorRules';

class OrderDetailsTab extends Component {

    onOptionChange = (selectName, selectedOption) => {
        this.props.onModelChange(selectName, selectedOption === null ? "" : selectedOption.value);
    };

    onMultiOptionChange = (selectName, selectedOption) => {
        var arr = !!selectedOption ? selectedOption.map(item => item.value) : [];
        this.props.onModelChange(selectName, arr);
    };

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
                           </div>

                    </div>
                </ValidatorForm>
                <ModalButtons mode={mode} onCancel={onCancel} actualTabIndex={model.actualTabIndex} tabCount={3} onPrev={this.onPrev} />
            </div>
        )
    }
}

export default OrderDetailsTab;