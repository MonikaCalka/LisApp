import React from 'react';
import { Trans } from 'react-i18next';
import { ValidatorComponent } from 'react-form-validator-core';

class CustomInput extends ValidatorComponent {

    render() {
        const { errorMessages, validators, requiredError, validatorListener, requiredMark, labeltext, ...rest } = this.props;
        const requiredStar = requiredMark === true ? "*" : "";
        return (
            <div>
                <label className="width-100-proc">
                    {requiredStar}<Trans>{labeltext}</Trans>
                    <input className="form-control custom-form" type="text" {...rest} ref={(r) => { this.input = r; }}/>
                </label>
                {this.errorText()}
            </div>
        );
    }

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
}

export default CustomInput;