import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import CustomSelect from '../../components/customSelect';

class StudyElement extends Component {
    constructor(props) {
        super(props);

        const { profileOptions, study } = props;
        const selectedProfile = profileOptions.find(x => x.value === study.IdProfile);
        this.state = {
            testOptions: selectedProfile || []
        }
    }


    handleSelectProfileChanged = selectedOption => {
        this.setState({ testOptions: selectedOption.tests });
        const { study, onChange, index } = this.props;
        const editedStudy = { ...study, IdProfile: selectedOption === null ? "" : selectedOption.value };
        onChange(editedStudy, index);
    }

    handleSelectTestChanged = selectedOptions => {
        var arr = !!selectedOptions ? selectedOptions.map(x => x.value) : [];
        const { study, onChange, index } = this.props;
        const editedStudy = { ...study, IdTests: arr };
        onChange(editedStudy, index);

        console.log(selectedOption);
    }

    render() {
        const { profileOptions, study, disable } = this.props;
        const { testOptions } = this.state;
        return (
            <div>
                <div className="col-sm-4">
                    <CustomSelect labeltext="Profile"
                        onChange={this.handleSelectProfileChanged}
                        value={profileOptions.filter(option => option.value === study.IdProfile)}
                        selectOptions={profileOptions}
                        name="IdProfile"
                        isDisabled={disable} />
                    <br />
                </div>
                <div className="col-sm-8">
                    <CustomSelect labeltext="Tests"
                        onChange={this.handleSelectTestChanged}
                        value={testOptions.filter(option => study.IdTests !== [] ? study.IdTests.includes(option.value) : false)}
                        selectOptions={testOptions}
                        name="IdTests"
                        isDisabled={disable}
                        isMulti /> <br />
                </div>
            </div>
        )
    }
}

export default StudyElement;