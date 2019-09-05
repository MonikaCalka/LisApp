import React, { Component } from 'react';
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

    render() {
        const { model, mode, onCancel, onModelChange } = this.props;
        
        return (
            <div className="row">
                <ValidatorForm id="modalform" onSubmit={this.onNext} >
                    <SampleTabContent model={model} onModelChange={onModelChange}/>
                </ValidatorForm>
                <ModalButtons mode={mode} onCancel={onCancel} actualTabIndex={model.actualTabIndex} tabCount={2} onPrev={this.onPrev} />
            </div>
        )
    }
}

export default SampleTab;