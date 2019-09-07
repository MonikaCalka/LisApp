import React, { Component } from 'react';
import CustomSelect from './customSelect';
import CustomInput from './customInput';
import { Trans } from 'react-i18next';
import i18n from "i18next";

class TestElement extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(event) {
        const target = event.target;
        this.props.onModelChange(target.name, target.value);
    }

    render() {
        const { test, disable, male } = this.props;
        let norm = "";
        if (male) {
            if (test.NormMinM === 0 && test.NormMaxM === 0) {
                norm = "0";
            } else {
                norm = test.NormMinM + " - " + test.NormMaxM;
            }
        } else {
            if (test.NormMinF === 0 && test.NormMaxF === 0) {
                norm = "0";
            } else {
                norm = test.NormMinF + " - " + test.NormMaxF;
            }
        }
        let mark = null;
        console.log(test);
        return (
            <div className="row">
                <div className="col-sm-4">
                    <CustomInput labeltext={test.Name} onChange={this.handleChange} value={test.Result ? test.Result : ""} name="Result" disabled />
                </div>
                <div className="col-sm-2 padding-top-30">
                    <label>{test.Unit}</label>
                </div>
                <div className="col-sm-4">
                    <CustomInput labeltext="Standard" onChange={this.handleChange} value={norm} name="Norm" disabled />
                </div>
                <div className="col-sm-2">
                    {mark}
                </div>
            </div>
        );
    }
}

export default TestElement;