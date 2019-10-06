import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import { ValidatorForm } from 'react-form-validator-core';
import ModalButtons from '../../../components/modalButtons';
import CustomInput from '../../../components/customInput';

class SampleTab extends Component {

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

    onPrint = () => {
        const { model } = this.props;
        let mywindow = window.open('', 'PRINT', 'height=600,width=600');

        mywindow.document.write('<html><head><title></title></head><body>');
        mywindow.document.write('<div>Type of study: ' + model.Profile + ' </div > ');
        mywindow.document.write('<div>Study ID: ' + model.IdStudy + ' </div > ');
        mywindow.document.write('<div>Sample code: ' + model.Sample.Code + ' </div > ');
        mywindow.document.write('</body></html>');

        mywindow.document.close(); 
        mywindow.focus(); 

        mywindow.print();
        mywindow.close();
        return true;
    }

    onRegisterSample = () => {
        const { onRegisterSample } = this.props;
        onRegisterSample();
    }

    render() {
        const { model, mode, enableRegister, onCancel, onModelChange, nurseMode, tabCount } = this.props;
        let registerButton = null;
        let printButton = null;
        if (nurseMode) {
            if (enableRegister && model.IdStatus === 1) {
                registerButton = <button type="button" className="register-sample-button modal-buton action-modal-button" onClick={this.onRegisterSample} disabled={mode === 'show'} ><Trans>RegisterSample</Trans></button>;
            }
            if (model.Sample.Code !== null && model.Sample.Code !== "") {
                printButton = <button type="button" className="register-sample-button modal-buton cancel-modal-button" onClick={this.onPrint}><Trans>PrintCode</Trans></button>;
            }
        }
        return (
            <div className="row">
                <ValidatorForm id="modalform" onSubmit={this.onNext} >
                    <div>
                        <div className="col-sm-12">
                            <h4><Trans>Sample</Trans></h4>
                            <CustomInput labeltext="SampleCode" onChange={this.handleChange} value={model.Sample.Code ? model.Sample.Code : ""} name="SampleCode" disabled />
                            <CustomInput labeltext="EmployeeNameCollected" onChange={this.handleChange} value={model.Sample.EmployeeName ? model.Sample.EmployeeName : ""} name="EmployeeNameCollected" disabled />
                            <CustomInput labeltext="DateOfCollection" onChange={this.handleChange} value={model.Sample.DateOfCollection ? model.Sample.DateOfCollection : ""} name="DateOfCollection" disabled />
                        </div>
                    </div>
                    {registerButton}
                    {printButton}
                </ValidatorForm>
                <ModalButtons mode={mode} onCancel={onCancel} actualTabIndex={model.actualTabIndex} tabCount={tabCount} onPrev={this.onPrev} />
            </div>
        );
    }
}

export default SampleTab;