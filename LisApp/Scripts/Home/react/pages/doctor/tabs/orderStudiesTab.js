import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import StudyModel from '../../../models/studyModel';
import StudyElement from '../../../components/studyElement';
import ModalButtons from '../../../components/modalButtons';
import { ValidatorForm } from 'react-form-validator-core';

const propertyName = "Studies";

class OrderStudiesTab extends Component {
    onAddStudy = () => {
        const { onModelChange, model } = this.props;
        onModelChange(propertyName, [...model[propertyName], new StudyModel()]);
    }

    onStudyChange = (study, index) => {
        const { onModelChange, model } = this.props;
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

    render() {
        const { mode, onCancel, model, onAccept } = this.props;
        const disable = mode === 'show' ? true : false;

        return (
            <div>
                <ValidatorForm id="modalform" onSubmit={onAccept} >

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
                    </div>
                </ValidatorForm>
                <ModalButtons mode={mode} onCancel={onCancel} actualTabIndex={model.actualTabIndex} tabCount={3} onPrev={this.onPrev} />
            </div>
        )
    }
}

export default OrderStudiesTab;