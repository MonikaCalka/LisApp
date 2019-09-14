import React from 'react';
import { Trans } from 'react-i18next';

class YesNoButtons extends React.Component {

    render() {
        const { checkedValue, onChange, name, labelName, disabled} = this.props;
        return (
            <div>
                <label>
                    <Trans>{labelName}</Trans>
                </label><br/>
                <label>
                    <input
                        type="radio"
                        value={true}
                        checked={checkedValue === true || checkedValue === "true"}
                        onChange={onChange}
                        name={name}
                        disabled={disabled}
                    />
                    <Trans>Yes</Trans>
                </label>
                <label>
                    <input
                        type="radio"
                        value={false}
                        checked={checkedValue === false || checkedValue === "false"}
                        onChange={onChange}
                        name={name}
                        disabled={disabled}
                    />
                    <Trans>No</Trans>
                </label>

            </div>
        );
    }
}

export default YesNoButtons;