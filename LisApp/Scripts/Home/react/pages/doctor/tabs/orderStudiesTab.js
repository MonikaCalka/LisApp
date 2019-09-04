import React, { Component } from 'react';
import { Trans } from 'react-i18next';

class StudyDetailsTab extends Component {

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

    render() {
        const { model, disable } = this.props;

        return (
            <div>

            </div>
        )
    }
}

export default StudyDetailsTab;