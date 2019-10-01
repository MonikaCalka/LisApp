import React from 'react';

const buttonStyle = {
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#707070'
};

const AlertTemplate = ({ style, options, message, close }) => (
    <div style={style} className={`alert-div alert-div-${options.type}`}>
        {options.type === 'info' && <img src="/Content/Images/alert_info.png" width="45" height="45" />}
        {options.type === 'success' && <img src="/Content/Images/alert_success.png" width="45" height="45" />}
        {options.type === 'error' && <img src="/Content/Images/alert_error.png" width="45" height="45" />}
        <span className={"alert-span"}>{message}</span>
        <button onClick={close} style={buttonStyle} align="right">
            X
        </button>
    </div>
);
export default AlertTemplate;