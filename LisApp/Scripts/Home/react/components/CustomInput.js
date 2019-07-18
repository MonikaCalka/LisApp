import React from 'react';
import { Trans } from 'react-i18next';

const CustomInput = props => (
    <label>
        <Trans>{props.labeltext}</Trans> 
        <input className="form-control" type="text" {...props} />
        </label>
    );

export default CustomInput;