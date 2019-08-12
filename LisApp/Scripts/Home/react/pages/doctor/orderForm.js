import React from 'react';
import { Trans } from 'react-i18next';
import { getJson } from '../../services/rests';
import { getStateFromPropsData } from '../../services/getStateFromPropsData';
import CustomInput from '../../components/customInput';
import CustomSelect from '../../components/customSelect';
import { ValidatorForm } from 'react-form-validator-core';
import { getDic } from '../../services/rests';
import CustomTextArea from '../../components/customTextArea';

const emptyState = {
    IdPatient: "",
    PatientName: "",
    Sex: "",
    Pesel: "",
    IdCardNumber: "",
    Insurance: "",
    IdPriority: "",
    EmployeeName: "",
    DateOfOrder: "",
    Status: "",
    IdOrder: "",
    Comment: "",
    Studies: [],
    wardOptions: [],
    patientOptions: [],
    priorityOptions: []
};

const options = [
    { value: "F", label: <Trans>Female</Trans> },
    { value: "M", label: <Trans>Male</Trans> }
];

class OrderForm extends React.Component {

    constructor(props) {
        super(props);

        if (this.props.mode !== 'add') {
            this.state = getStateFromPropsData(props.data.data, emptyState);
        } else {
            this.state = emptyState;
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        getDic("ward", response => {
            this.setState({ wardOptions: response });
        });
        getDic("priority", response => {
            this.setState({ priorityOptions: response });
        });
        getJson("Doctor/GetPatientSelect", response => {
            this.setState({ patientOptions: response });
        });
        if (this.state.IdPatient !== "") {
            this.getPatientById(this.state.IdPatient);
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSelectSexChanged = selectedOption => {
        this.setState({ Sex: selectedOption.value });
    };
    handleSelectPatientChanged = selectedOption => {
        this.setState({ IdPatient: selectedOption.value });
        this.getPatientById(selectedOption.value);
    };

    getPatientById = id => {
        getJson("Registrar/GetPatient?id=" + id, response => {
            this.setState({
                PatientName: response.FirstName + " " + response.Surname,
                Sex: response.Sex,
                Pesel: response.Pesel
            });
        });
    }

    handleSelectWardChanged = selectedOption => {
        this.setState({ IdWard: selectedOption === null ? "" : selectedOption.value });
    };
    handleSelectPriorityChanged = selectedOption => {
        this.setState({ IdPriority: selectedOption === null ? "" : selectedOption.value });
    };

    getData() {
        return this.state;
    }

    render() {
        const { title, mode, onAccept, onCancel, onFire } = this.props;

        var disable = mode === 'show' ? true : false;
        var cancelText = mode === 'show' ? <Trans>Back</Trans> : <Trans>Cancel</Trans>;

        return (
            <div className="modal-div">
                <h2><Trans>{title}</Trans></h2>
                <ValidatorForm id="modalform" onSubmit={onAccept} >
                    <div className="col-sm-4">
                        <h4><Trans>Patient</Trans></h4>
                        <CustomSelect labeltext="IdPatient" onChange={this.handleSelectPatientChanged} value={this.state.patientOptions.filter(option => option.value === this.state.IdPatient)} selectOptions={this.state.patientOptions} name="IdPatient" isDisabled={disable} validators={['required']} errorMessages={[<Trans>RequiredField</Trans>]} requiredMark /> <br />
                        <CustomInput labeltext="PatientName" onChange={this.handleChange} value={this.state.PatientName} name="PatientName" disabled /><br />
                        <CustomSelect labeltext="Sex" onChange={this.handleSelectSexChanged} value={options.filter(option => option.value === this.state.Sex)} selectOptions={options} name="Sex" isDisabled /> <br />
                        <CustomInput labeltext="PESEL" onChange={this.handleChange} value={this.state.Pesel} name="Pesel" disabled /><br />
                        <CustomInput labeltext="Institution" onChange={this.handleChange} value={this.state.Institution} name="Institution" disabled={disable} /><br />
                        <CustomSelect labeltext="Ward" onChange={this.handleSelectWardChanged} value={this.state.wardOptions.filter(option => option.value === this.state.IdWard)} selectOptions={this.state.wardOptions} name="IdWard" isDisabled={disable} isClearable /> <br />
                    </div>

                    <div className="col-sm-4">
                        <h4><Trans>DataOfOrder</Trans></h4>
                        <CustomInput labeltext="DateOfOrder" onChange={this.handleChange} value={this.state.DateOfOrder} name="DateOfOrder" disabled /><br />
                        <CustomInput labeltext="EmployeeNameOrdered" onChange={this.handleChange} value={this.state.EmployeeName} name="EmployeeName" disabled /><br />
                        <CustomInput labeltext="OrderId" onChange={this.handleChange} value={this.state.IdOrder} name="IdOrder" disabled/><br />
                        <CustomInput labeltext="Status" onChange={this.handleChange} value={this.state.Status} name="Status" disabled /><br />
                    </div>

                    <div className="col-sm-4">
                        <h4><Trans>OrderDetail</Trans></h4>
                        <CustomTextArea rows="5" labeltext="Comment" onChange={this.handleChange} value={this.state.Comment} name="Comment" disabled={disable} /><br />
                        <CustomSelect labeltext="Priority" onChange={this.handleSelectPriorityChanged} value={this.state.priorityOptions.filter(option => option.value === this.state.IdPriority)} selectOptions={this.state.priorityOptions} name="IdPriority" isDisabled={disable} /> <br />
                        <CustomSelect />
                        <CustomSelect />
                    </div>
                </ValidatorForm>
                <div className="save-cancel-buttons">
                    {mode === 'edit' ? <button onClick={onFire}><Trans>Fire</Trans></button> : null}
                    {mode !== 'show' ? <button type="submit" form="modalform">{<Trans>Save</Trans>}</button> : null}
                    <button onClick={onCancel}>{cancelText}</button>
                </div>
            </div>
        );
    }
}

export default OrderForm;