import React from 'react';

class CustomButton extends React.Component {

    render() {
        const { onClick, text, disable, image } = this.props;
        let imageSrc = "/Content/Images/" + image;
        return (
            <button onClick={onClick} className="button" disabled={disable}>
                <img src={imageSrc} width="45" height="45" className="image-button" /><br />
                {text}
            </button>
        );
    }
}

export default CustomButton;