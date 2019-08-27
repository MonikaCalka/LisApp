﻿import React from 'react';
import Select from 'react-select';
import { Trans } from 'react-i18next';
import { ValidatorComponent } from 'react-form-validator-core';

class CustomSelect extends ValidatorComponent {
    errorText() {
        const { isValid } = this.state;

        if (isValid) {
            return null;
        }

        return (
            <div style={{ color: 'red' }}>
                {this.getErrorMessage()}
            </div>
        );
    }

    render() {
        const { errorMessages, validators, requiredError, validatorListener, requiredMark, labeltext, selectOptions, ...rest } = this.props;
        const requiredStar = requiredMark === true ? "*" : "";
        return (

            <div className="div-input">
                <div className="custom-select-div">
                    {requiredStar}<Trans>{labeltext}</Trans>
                    <Select
                        options={selectOptions}
                        placeholder={""}
                        className="custom-select"
                        {...rest}
                        ref={(r) => { this.input = r; }}
                    />
                </div>
                {this.errorText()}
            </div>
        );
    }
}

export default CustomSelect;