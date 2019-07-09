import React from 'react';

class CustomButton extends React.Component {

    render() {
        const { onClick, text }= this.props;
        return (
            <button onClick={onClick} className="button">
                <img src="/Content/Images/menu.png" width="45" height="45" className="image-button" /><br />
                {text}
            </button>
        );
    }
}

export default CustomButton;