import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import CustomInput from '../../../components/customInput';
import CustomSelect from '../../../components/customSelect';
import { ValidatorForm } from 'react-form-validator-core';
import ModalButtons from '../../../components/modalButtons';
import { getJson } from '../../../services/rests';

const options = [
    { value: "F", label: <Trans>Female</Trans> },
    { value: "M", label: <Trans>Male</Trans> }
];

class OrderPatientTab extends Component {

    componentDidMount() {
        const { model } = this.props;
        if (model.IdPatient !== "") {
            this.getPatientById(model.IdPatient);
        }
    }

    handleChange(event) {
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

    onNext = () => {
        const { onTabChange, model } = this.props;
        onTabChange(model.actualTabIndex + 1);
    }

    handleSelectPatientChanged = selectedOption => {
        const IdPatient = selectedOption.value;
        this.getPatientById(IdPatient);
    };

    getPatientById = (IdPatient) => {
        getJson("Registrar/GetPatient?id=" + IdPatient, response => {
            this.props.onPatientChange({
                PatientName: response.FirstName + " " + response.Surname,
                Sex: response.Sex,
                Pesel: response.Pesel,
                IdPatient
            });
        });
    }

    render() {
        const { model, mode, onCancel } = this.props;
        const disable = mode === 'show' ? true : false;

        return (
            <div className="row">
                <ValidatorForm id="modalform" onSubmit={this.onNext} >
                    <h4><Trans>Patient</Trans></h4>
                    <div className="col-sm-12">
                        <CustomSelect labeltext="IdPatient" onChange={this.handleSelectPatientChanged} value={model.patientOptions.filter(option => option.value === model.IdPatient)} selectOptions={model.patientOptions} name="IdPatient" isDisabled={disable} validators={['required']} errorMessages={[<Trans>RequiredField</Trans>]} requiredMark /> <br />
                        <CustomInput labeltext="PatientName" onChange={this.handleChange} value={model.PatientName} name="PatientName" disabled /><br />
                        <CustomSelect labeltext="Sex" onChange={e => this.onOptionChange("Sex", e)} value={options.filter(option => option.value === model.Sex)} selectOptions={options} name="Sex" isDisabled /> <br />
                        <CustomInput labeltext="PESEL" onChange={this.handleChange} value={model.Pesel} name="Pesel" disabled /><br />
                    </div>
                </ValidatorForm>
                <ModalButtons mode={mode} onCancel={onCancel} actualTabIndex={model.actualTabIndex} tabCount={3}  />
            </div>
        )
    }
}

export default OrderPatientTab;