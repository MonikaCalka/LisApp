import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import CustomSelect from '../../components/customSelect';

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
        const { onDelete, index, study } = this.props;
        onDelete(study, index);
    }

    render() {
        const { profileOptions, study, disable } = this.props;
        const { testOptions } = this.state;
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
                        isMulti /> <br />
                </div>
                <div className="col-sm-1">
                    <button type="button" onClick={this.onDeleteStudy}>X</button>
                </div>
            </div>
        )
    }
}

export default StudyElement;