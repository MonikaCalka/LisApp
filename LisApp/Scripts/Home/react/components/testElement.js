import React, { Component } from 'react';
import CustomSelect from './customSelect';
import CustomInput from './customInput';
import { Trans } from 'react-i18next';
import i18n from "i18next";
import { requiredFloat } from './validatorRules';

class TestElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mark: this.checkValue(props.test.Result)
        };
    }

    handleResultChanged = (event) => {
        const { test, onChange, index } = this.props;
        const target = event.target;
        const editedTest = { ...test, Result: target.value };

        this.setState({
            mark: this.checkValue(target.value)
        });
        onChange(editedTest, index);
    }

    checkValue = (resultValue) => {
        if (resultValue !== null) {
            const { male, test } = this.props;
            if (male) {
                if (resultValue < test.NormMinM)
                    return <img src="/Content/Images/down.jpg" width="45" height="45" />;
                else if (resultValue > test.NormMaxM)
                    return <img src="/Content/Images/up.jpg" width="45" height="45" />;
                else
                    return null;
            } else {
                if (resultValue < test.NormMinF)
                    return <img src="/Content/Images/down.jpg" width="45" height="45" />;
                else if (resultValue > test.NormMaxF)
                    return <img src="/Content/Images/up.jpg" width="45" height="45" />;
                else
                    return null;
            }
        } else {
            return null;
        }

    }

    render() {
        const { test, disable, male, mode } = this.props;
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
        let required = mode === 'addResult' ? requiredFloat : null;
        
        console.log(test);
        return (
            <div className="row">
                <div className="col-sm-5">
                    <CustomInput labeltext={test.Name} onChange={this.handleResultChanged} value={test.Result ? test.Result : ""} name="Result" disabled={disable} {... required} />
                </div>
                <div className="col-sm-1 padding-top-30">
                    <label><Trans>{test.Unit}</Trans></label>
                </div>
                <div className="col-sm-5">
                    <CustomInput labeltext="Standard" value={norm} name="Norm" disabled />
                </div>
                <div className="col-sm-1">
                    {this.state.mark}
                </div>
            </div>
        );
    }
}

export default TestElement;