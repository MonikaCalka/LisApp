import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import StudyModel from '../../../models/studyModel';
import StudyElement from '../../../components/studyElement';
import ModalButtons from '../../../components/modalButtons';
import { ValidatorForm } from 'react-form-validator-core';
import { getUrl } from '../../../services/rests';
import i18n from '../../../i18n';

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

    onReport = (id) => {
        let win = window.open(getUrl + "Doctor/GetReport?id=" + id + "&lang=" + i18n.language + "&t="
            + localStorage.getItem("token").toString().replace('+', 'xMl3Jkaaswss').replace('/', 'Por21Ld105sE78').replace('=', 'Ml32XXASsd1dd')
            , "_blank");
        win.focus;
    }


    render() {
        const { mode, onCancel, model, showSample } = this.props;
        const disableInProgress = mode === 'show' || (mode !== 'add' && model.IdStatus !== 1) ? true : false;
        let addButton = null;
        if (!disableInProgress) {
            addButton = <button type="button" onClick={this.onAddStudy} className="modal-buton action-modal-button"><Trans>Add</Trans></button>;
        }
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
                            disable={disableInProgress}
                            onDelete={this.onDeleteStudy}
                            showSample={showSample} 
                            onReport={this.onReport} />
                        )}
                        {addButton}
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