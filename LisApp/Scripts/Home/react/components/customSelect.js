import React from 'react';
import Select from 'react-select';
import { Trans } from 'react-i18next';

const CustomInput = props => (
    <div className="custom-select-div">
        <Trans>{props.labeltext}</Trans>
        <Select
            options={props.selectOptions}
            placeholder={""}
            className="custom-select"
            {...props} 
        />
    </div>
);

export default CustomInput;