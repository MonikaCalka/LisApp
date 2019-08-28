import React from 'react';
import { Trans } from 'react-i18next';
import { getJson } from '../../services/rests';
import { getStateFromPropsData } from '../../services/getStateFromPropsData';
import CustomInput from '../../components/customInput';
import CustomSelect from '../../components/customSelect';
import { ValidatorForm } from 'react-form-validator-core';
import { getDic } from '../../services/rests';
import CustomTextArea from '../../components/customTextArea';
import StudiesTab from './studiesTab';
import StudyModel from './studyModel';

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
    Studies: [new StudyModel()],
    wardOptions: [],
    patientOptions: [],
    priorityOptions: [],
    profileOptions: [],
    testOptions: [],
    IdProfile: "",
    IdTests: [],
    doctorOptions: [],
    IdConsultants: []
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
        getJson("Doctor/GetProfileSelect", response => {
            this.setState({ profileOptions: response });
        });
        getJson("Doctor/GetConsultantSelect", response => {
            this.setState({ doctorOptions: response });
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

    onOptionChange = (selectName, selectedOption) => {
        this.setState({ [selectName]: selectedOption === null ? "" : selectedOption.value });
    };

    onMultiOptionChange = (selectName, selectedOption) => {
        var arr = !!selectedOption ? selectedOption.map(item => item.value) : [];
        //SPRAWDZ SOBIE :D <3
        // if (selectedOption !== null) {
        //     selectedOption.forEach(function (item) {
        //         arr.push(item.value);
        //     });
        // }
        this.setState({ [selectName]: selectedOption === null ? [] : arr });
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
    handleSelectProfileChanged = selectedOption => {
        this.setState({ IdProfile: selectedOption === null ? "" : selectedOption.value });
        this.setState({ testOptions: selectedOption.tests });
    };
    handleSelectTestChanged = selectedOption => {
        var arr = [];
        if (selectedOption !== null) {
            selectedOption.forEach(function (item) {
                arr.push(item.value);
            });
        }
        this.setState({ IdTests: selectedOption === null ? [] : arr });
        console.log(selectedOption);
    }

    getData = () => {
        return this.state;
    }

    onStudiesChange = studies => {
        this.setState({ Studies: studies });
    }

    render() {
        const { title, mode, onAccept, onCancel } = this.props;

        var disable = mode === 'show' ? true : false;
        var cancelText = mode === 'show' ? <Trans>Back</Trans> : <Trans>Cancel</Trans>;

        return (
            <div className="modal-div">
                <h2><Trans>{title}</Trans></h2>
                <ValidatorForm id="modalform" onSubmit={onAccept} >
                    <div>
                        <div className="col-sm-8">
                            <div>
                                <div className="col-sm-6">
                                    <h4><Trans>Patient</Trans></h4>
                                    <CustomSelect labeltext="IdPatient" onChange={this.handleSelectPatientChanged} value={this.state.patientOptions.filter(option => option.value === this.state.IdPatient)} selectOptions={this.state.patientOptions} name="IdPatient" isDisabled={disable} validators={['required']} errorMessages={[<Trans>RequiredField</Trans>]} requiredMark /> <br />
                                    <CustomInput labeltext="PatientName" onChange={this.handleChange} value={this.state.PatientName} name="PatientName" disabled /><br />
                                    <CustomSelect labeltext="Sex" onChange={e => this.onOptionChange("Sex", e)} value={options.filter(option => option.value === this.state.Sex)} selectOptions={options} name="Sex" isDisabled /> <br />
                                    <CustomInput labeltext="PESEL" onChange={this.handleChange} value={this.state.Pesel} name="Pesel" disabled /><br />
                                </div>

                                <div className="col-sm-6">
                                    <h4><Trans>DataOfOrder</Trans></h4>
                                    <CustomInput labeltext="DateOfOrder" onChange={this.handleChange} value={this.state.DateOfOrder} name="DateOfOrder" disabled /><br />
                                    <CustomInput labeltext="EmployeeNameOrdered" onChange={this.handleChange} value={this.state.EmployeeName} name="EmployeeName" disabled /><br />
                                    <CustomSelect labeltext="Ward" onChange={e => this.onOptionChange("IdWard", e)} value={this.state.wardOptions.filter(option => option.value === this.state.IdWard)} selectOptions={this.state.wardOptions} name="IdWard" isDisabled={disable} isClearable /> <br />
                                    <CustomInput labeltext="Institution" onChange={this.handleChange} value={this.state.Institution} name="Institution" disabled={disable} /><br />
                                </div>
                            </div>
                            <div className="padding-15-lr">
                                <CustomSelect labeltext="Consultants" onChange={e => this.onMultiOptionChange("IdConsultants", e)} value={this.state.doctorOptions.filter(option => this.state.IdConsultants !== [] ? this.state.IdConsultants.includes(option.value) : false)} selectOptions={this.state.doctorOptions} name="IdConsultants" isDisabled={disable} isMulti /> <br />
                            </div>
                        </div>

                        <div className="col-sm-4">
                            <h4><Trans>OrderDetail</Trans></h4>
                            <CustomInput labeltext="OrderId" onChange={this.handleChange} value={this.state.IdOrder} name="IdOrder" disabled /><br />
                            <CustomInput labeltext="Status" onChange={this.handleChange} value={this.state.Status} name="Status" disabled /><br />
                            <CustomSelect labeltext="Priority" onChange={e => this.onOptionChange("IdPriority", e)} value={this.state.priorityOptions.filter(option => option.value === this.state.IdPriority)} selectOptions={this.state.priorityOptions} name="IdPriority" isDisabled={disable} validators={['required']} errorMessages={[<Trans>RequiredField</Trans>]} requiredMark /> <br />
                            <CustomTextArea rows="6" labeltext="Comment" onChange={this.handleChange} value={this.state.Comment} name="Comment" disabled={disable} /><br />
                        </div>
                    </div>
                    {/* <div>
                        <h4><Trans>OrderedStudies</Trans></h4>
                        <div className="col-sm-4">
                            <CustomSelect labeltext="Profile" onChange={this.handleSelectProfileChanged} value={this.state.profileOptions.filter(option => option.value === this.state.IdProfile)} selectOptions={this.state.profileOptions} name="IdProfile" isDisabled={disable} /> <br />
                        </div>
                        <div className="col-sm-8">
                            <CustomSelect labeltext="Tests" onChange={this.handleSelectTestChanged} value={this.state.testOptions.filter(option => this.state.IdTests !== [] ? this.state.IdTests.includes(option.value) : false)} selectOptions={this.state.testOptions} name="IdTests" isDisabled={disable} isMulti /> <br />
                        </div>
                    </div> */}
                    {this.state.profileOptions.length > 0 &&
                        <StudiesTab value={this.state.Studies}
                            onChange={this.onStudiesChange}
                            profileOptions={this.state.profileOptions}
                            disable={disable} />
                    }
                </ValidatorForm>
                <div className="save-cancel-buttons">
                    {mode !== 'show' ? <button type="submit" form="modalform">{<Trans>Save</Trans>}</button> : null}
                    <button onClick={onCancel}>{cancelText}</button>
                </div>
            </div>
        );
    }
}

export default OrderForm;