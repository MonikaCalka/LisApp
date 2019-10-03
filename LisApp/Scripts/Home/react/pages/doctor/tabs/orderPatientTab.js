import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import CustomInput from '../../../components/customInput';
import CustomSelect from '../../../components/customSelect';
import { ValidatorForm } from 'react-form-validator-core';
import ModalButtons from '../../../components/modalButtons';
import { getJson } from '../../../services/rests';
import { requiredField } from '../../../components/validatorRules';

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

    onOptionChange = (selectName, selectedOption) => {
        this.props.onModelChange(selectName, selectedOption === null ? "" : selectedOption.value);
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
        getJson("Doctor/GetPatient?id=" + IdPatient, response => {
            if (response.status === 200) {
                response.json().then(responseJson => {
                    this.props.onPatientChange({
                        PatientName: responseJson.FirstName + " " + responseJson.Surname,
                        Sex: responseJson.Sex,
                        Pesel: responseJson.Pesel,
                        IdCardNumber: responseJson.IdCardNumber ? responseJson.IdCardNumber : "",
                        IdPatient
                    });
                });
            }
        });
    }

    render() {
        const { model, mode, onCancel } = this.props;
        const disableInProgress = mode === 'show' || (mode !== 'add' && model.IdStatus !== 1) ? true : false;

        return (
            <div className="row">
                <ValidatorForm id="modalform" onSubmit={this.onNext} >
                    <h4><Trans>PatientData</Trans></h4>
                    <div className="col-sm-12">
                        <CustomSelect labeltext="IdPatient" onChange={this.handleSelectPatientChanged} value={model.patientOptions.filter(option => option.value === model.IdPatient)} selectOptions={model.patientOptions} name="IdPatient" isDisabled={disableInProgress} {...requiredField} />
                        <CustomInput labeltext="PatientName" onChange={this.handleChange} value={model.PatientName} name="PatientName" disabled />
                        <CustomSelect labeltext="Sex" onChange={e => this.onOptionChange("Sex", e)} value={options.filter(option => option.value === model.Sex)} selectOptions={options} name="Sex" isDisabled />
                        <CustomInput labeltext="PESEL" onChange={this.handleChange} value={model.Pesel} name="Pesel" disabled />
                        <CustomInput labeltext="IdCardNumber" onChange={this.handleChange} value={model.IdCardNumber} name="IdCardNumber" disabled />
                    </div>
                </ValidatorForm>
                <ModalButtons mode={mode} onCancel={onCancel} actualTabIndex={model.actualTabIndex} tabCount={3} />
            </div>
        )
    }
}

export default OrderPatientTab;