import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import { ValidatorForm } from 'react-form-validator-core';
import ModalButtons from '../../../components/modalButtons';
import SampleTabContent from '../../../components/sampleTabContent';

class SampleTab extends Component {

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
        const { model, mode, onCancel, onModelChange } = this.props;
        let registerButton = null;
        if (mode === 'edit' && model.IdStatus === 1) {
            registerButton = <button type="button" className="register-sample-button" onClick={this.onRegisterSample} ><Trans>RegisterSample</Trans></button>;    
        }
        let printButton = null;
        if (model.Sample.Code !== null && model.Sample.Code !== "") {
            printButton = <button type="button" className="register-sample-button" onClick={this.onPrint}><Trans>PrintCode</Trans></button>;
        }
        return (
            <div className="row">
                <ValidatorForm id="modalform" onSubmit={this.onNext} >
                    <SampleTabContent model={model} onModelChange={onModelChange} />
                    {registerButton}
                    {printButton}
                </ValidatorForm>
                <ModalButtons mode={mode} onCancel={onCancel} actualTabIndex={model.actualTabIndex} tabCount={2} onPrev={this.onPrev} />
            </div>
        );
    }
}

export default SampleTab;