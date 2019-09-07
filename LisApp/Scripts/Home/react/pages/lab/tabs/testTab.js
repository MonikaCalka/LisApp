import React, { Component } from 'react';
import { ValidatorForm } from 'react-form-validator-core';
import ModalButtons from '../../../components/modalButtons';
import { Trans } from 'react-i18next';
import CustomInput from '../../../components/customInput';
import TestElement from '../../../components/testElement';


class TestTab extends Component {

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

    render() {
        const { model, mode, onCancel, onModelChange, tabCount, onAccept } = this.props;

        return (
            <div className="row">
                <ValidatorForm id="modalform" onSubmit={mode === "start" ? onAccept : this.onNext} >
                    <div className="com-sm-12">
                        <h4><Trans>Tests</Trans></h4>
                        {model.OrderedTest.map((t, i) => <TestElement
                            key={i}
                            index={i}
                            test={t}
                            onChange={this.handleChange}
                            disable={true} />)
                        }
                    </div>
                </ValidatorForm>
                <ModalButtons mode={mode} onCancel={onCancel} actualTabIndex={model.actualTabIndex} tabCount={tabCount} onPrev={this.onPrev} onNext={this.onNext} />
            </div>
        );
    }
}

export default TestTab;