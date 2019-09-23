import React from 'react';
import { Trans } from 'react-i18next';
import { getJson, postJson } from '../../services/rests';
import { withAlert } from 'react-alert';
import { ValidatorForm } from 'react-form-validator-core';
import CustomInput from '../../components/customInput';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Login: "",
            Password: "",
            actualLang: 'pl'
        };
    }

    handleChange = (event) => {
        const target = event.target;
        this.setState({ [target.name]: target.value });
    }

    onLogin = () => {
        postJson("Login/Login", this.state, response => {
            if (response.status === 200) {
                response.json().then(responseJson => {
                    localStorage.setItem("token", responseJson);
                    this.props.alert.success(<Trans i18nKey="RepeatSuccess" values={{ id: responseJson }} />);
                });
            } else {
                this.props.alert.error(<Trans>VerifyError</Trans>);
            }
        });
    }

   

    render() {
        return (
            <div>
                <ValidatorForm id="modalform" onSubmit={this.onLogin} >
                    <div>
                        <CustomInput labeltext="Login" onChange={this.handleChange} value={this.state.Login} name="Login" />
                        <CustomInput labeltext="Password" onChange={this.handleChange} value={this.state.Password} name="Password" />
                        <button type="submit">Login</button>
                    </div>
                </ValidatorForm>
                
            </div>
        );
    }
}

export default withAlert()(LoginPage);