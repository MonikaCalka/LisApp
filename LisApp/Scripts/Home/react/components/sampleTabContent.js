import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import CustomInput from './customInput';

class SampleTabContent extends Component {

    handleChange(event) {
        const target = event.target;
        this.props.onModelChange(target.name, target.value);
    }

    render() {
        const { model } = this.props;
      
        return (
            <div>
                <div className="col-sm-12">
                    <h4><Trans>Sample</Trans></h4>
                    <CustomInput labeltext="SampleCode" onChange={this.handleChange} value={model.Sample.Code ? model.Sample.Code : ""} name="SampleCode" disabled />
                    <CustomInput labeltext="EmployeeNameCollected" onChange={this.handleChange} value={model.Sample.EmployeeName ? model.Sample.EmployeeName : ""} name="EmployeeNameCollected" disabled />
                    <CustomInput labeltext="DateOfCollection" onChange={this.handleChange} value={model.Sample.DateOfCollection ? model.Sample.DateOfCollection : ""} name="DateOfCollection" disabled />
                </div>
            </div>
        );
    }
}

export default SampleTabContent;