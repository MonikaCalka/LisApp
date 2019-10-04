import React, { Component } from 'react';
import CustomSelect from './customSelect';
import CustomInput from './customInput';

class StudyElement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            testOptions: this.getTestOptions(props)
        };
    }

    componentDidUpdate(prevProps) {
        const { study } = this.props;
        const prevStudy = prevProps.study;
        if (study.IdProfile !== prevStudy.IdProfile) {
            this.setState({ testOptions: this.getTestOptions(this.props) });
        }
    }

    getTestOptions(props) {
        const { profileOptions, study } = props;
        const selectedProfile = profileOptions.find(x => x.value === study.IdProfile);

        let tests = [];
        if (selectedProfile !== undefined && selectedProfile !== null) {
            tests = selectedProfile.tests;
        }
        return tests;
    }

    handleSelectProfileChanged = selectedOption => {
        const { study, onChange, index } = this.props;
        const editedStudy = { ...study, IdProfile: selectedOption === null ? "" : selectedOption.value, IdTests: [] };
        onChange(editedStudy, index);
    }

    handleSelectTestChanged = selectedOptions => {
        var arr = !!selectedOptions ? selectedOptions.map(x => x.value) : [];
        const { study, onChange, index } = this.props;
        const editedStudy = { ...study, IdTests: arr };
        onChange(editedStudy, index);
    }

    onDeleteStudy = () => {
        const { onDelete, index } = this.props;
        onDelete(index);
    }

    onReport = () => {
        const { onReport, study } = this.props;
        onReport(study.IdStudy);
    }

    render() {
        const { profileOptions, study, disable, showSample } = this.props;
        const { testOptions } = this.state;
        let buttons = null;
        if (!disable) {
            buttons = <button type="button" onClick={this.onDeleteStudy} className="study-action-button x-button"></button>;
        } else if (study !== null && study.IdStatus === 5 && !showSample) {
            buttons = <button type="button" onClick={this.onReport} className="study-action-button report-button" ></button >;
        }
        let sample = null;
        if (showSample) {
            sample = <CustomInput labeltext="Sample" value={study.SampleCode ? study.SampleCode : ""} name="Sample" disabled />;
        }
    

        return (
            <div className="row">
                <div className="col-sm-4">
                    <CustomSelect labeltext="Profile"
                        onChange={this.handleSelectProfileChanged}
                        value={profileOptions.filter(option => option.value === study.IdProfile)}
                        selectOptions={profileOptions}
                        name="IdProfile"
                        isDisabled={disable} />
                    <br />
                </div>
                <div className="col-sm-7">
                    <CustomSelect labeltext="Tests"
                        onChange={this.handleSelectTestChanged}
                        value={testOptions.filter(option => study.IdTests !== [] ? study.IdTests.includes(option.value) : false)}
                        selectOptions={testOptions}
                        name="IdTests"
                        isDisabled={disable}
                        className="basic-multi-select"
                        isMulti
                        closeMenuOnSelect={false} />
                    {sample}
                </div>
                <div className="col-sm-1">
                    {buttons}
                </div>
            </div>
        );
    }
}

export default StudyElement;