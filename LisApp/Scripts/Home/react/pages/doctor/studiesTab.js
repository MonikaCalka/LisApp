import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import StudyModel from './studyModel';
import StudyElement from './studyElement';

class StudiesTab extends Component {
    onAddStudy = () => {
        const { onChange, value } = this.props;
        onChange([...value, new StudyModel()]);
    }

    onStudyChange = (study, index) => {
        const { onChange, value } = this.props;
        onChange(value.map((x, i) => i !== index ? x : study));
    }

    onDeleteStudy = (study, index) => {
        const { onChange, value } = this.props;
        onChange(value.filter((x, i) => i !== index));
    }

    render() {
        const { value, profileOptions, disable } = this.props;

        return (
            <div>
                <h4><Trans>OrderedStudies</Trans></h4>
                {value.map((s, i) => <StudyElement profileOptions={profileOptions}
                    key={i}
                    index={i}
                    study={s}
                    onChange={this.onStudyChange}
                    disable={disable}
                    onDelete={this.onDeleteStudy}/>)
                }
                <button type="button" onClick={this.onAddStudy}>Add</button>
            </div>
        )
    }
}

export default StudiesTab;