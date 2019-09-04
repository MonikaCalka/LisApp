import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import StudyModel from '../../../models/studyModel';
import StudyElement from '../../../components/studyElement';
import ModalButtons from '../../../components/modalButtons';
import { ValidatorForm } from 'react-form-validator-core';

const propertyName = "Studies";

class OrderStudiesTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: ""
        };

    }

    onAddStudy = () => {
        const { onModelChange, model } = this.props;
        onModelChange(propertyName, [...model[propertyName], new StudyModel()]);
    }

    onStudyChange = (study, index) => {
        const { onModelChange, model } = this.props;
        this.setState({
            error: ""
        });
        onModelChange(propertyName, model[propertyName].map((x, i) => i !== index ? x : study));
    }

    onDeleteStudy = (index) => {
        const { onModelChange, model } = this.props;
        onModelChange(propertyName, model[propertyName].filter((x, i) => i !== index));
    }

    onPrev = () => {
        const { onTabChange, model } = this.props;
        onTabChange(model.actualTabIndex - 1);
    }

    onAcceptWithValidation = () => {
        const { model, onAccept } = this.props;

        if (model.Studies.length !== 0 && model.Studies[0].IdTests.length > 0) {
            onAccept();
        } else {
            this.setState({
                error: "AddFirstTest"
            });
        }
    }

    render() {
        const { mode, onCancel, model } = this.props;
        const disable = mode === 'show' ? true : false;

        return (
            <div>
                <ValidatorForm id="modalform" onSubmit={this.onAcceptWithValidation} >

                    <div>
                        <h4><Trans>OrderedStudies</Trans></h4>
                        {model[propertyName].map((s, i) => <StudyElement profileOptions={model.profileOptions}
                            key={i}
                            index={i}
                            study={s}
                            onChange={this.onStudyChange}
                            disable={disable}
                            onDelete={this.onDeleteStudy} />)
                        }
                        <button type="button" onClick={this.onAddStudy}>Add</button>
                        <div style={{ color: 'red' }}>
                            <Trans>{this.state.error}</Trans>
                        </div>
                    </div>
                </ValidatorForm>
                <ModalButtons mode={mode} onCancel={onCancel} actualTabIndex={model.actualTabIndex} tabCount={3} onPrev={this.onPrev} />
            </div>
        )
    }
}

export default OrderStudiesTab;