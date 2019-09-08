import React, { Component } from 'react';
import { ValidatorForm } from 'react-form-validator-core';
import ModalButtons from '../../../components/modalButtons';
import { Trans } from 'react-i18next';
import CustomInput from '../../../components/customInput';
import TestElement from '../../../components/testElement';
import CustomTextArea from '../../../components/customTextArea';

const propertyName = "OrderedTest";

class TestTab extends Component {

    handleChange = (event) => {
        const target = event.target;
        this.props.onModelChange(target.name, target.value);
    }

    handleResultChange = (event) => {
        const target = event.target;
        const editedResult = { ...this.props.model.result, Description: target.value };
        this.props.onModelChange(target.name, editedResult);
    }

    onTestChange = (test, index) => {
        const { onModelChange, model } = this.props;
        onModelChange(propertyName, model[propertyName].map((x, i) => i !== index ? x : test));
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
        const { model, mode, onCancel, onModelChange, tabCount, onAccept } = this.props;
        let disable = mode === "addResult" ? false : true;
        let resultDesc = null;
        if (mode === 'addResult') {
            resultDesc = <CustomTextArea rows="4" labeltext="ResultDesc" onChange={this.handleResultChange} value={model.Result.Description !== null ? model.Result.Description : ""} name="Result" disabled={disable} />;
        }
        let male = model.PatientSex === "M" ? true : false;
        return (
            <div className="row">
                <ValidatorForm id="modalform" onSubmit={mode === "start" || mode === "addResult" ? onAccept : this.onNext} >
                    <div className="col-sm-12">
                        <h4><Trans>Tests</Trans></h4>
                        {model[propertyName].map((t, i) => <TestElement
                            key={i}
                            index={i}
                            test={t}
                            onChange={this.onTestChange}
                            disable={disable}
                            mode={mode}
                            male={male}
                        />)
                            }
                    </div>
                    <div className="col-sm-12">
                        {resultDesc}
                    </div>
                </ValidatorForm>
                <ModalButtons mode={mode} onCancel={onCancel} actualTabIndex={model.actualTabIndex} tabCount={tabCount} onPrev={this.onPrev} onNext={this.onNext} />
            </div>
        );
    }
}

export default TestTab;