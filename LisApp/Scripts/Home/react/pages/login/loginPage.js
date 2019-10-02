import React from 'react';
import { Trans } from 'react-i18next';
import { getJson, postJson } from '../../services/rests';
import { withAlert } from 'react-alert';
import { ValidatorForm } from 'react-form-validator-core';
import CustomInput from '../../components/customInput';
import { withRouter } from 'react-router-dom';

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
                    localStorage.setItem("token", responseJson.Token);
                    localStorage.setItem("login", responseJson.Login);
                    localStorage.setItem("userType", responseJson.UserType);
                    this.props.alert.success(<Trans>LoginSuccess</Trans>);
                    switch (responseJson.UserType) {
                        case "Doctor":
                            this.props.history.push("/doctor");
                            break;
                        case "Nurse":
                            this.props.history.push("/nurse");
                            break;
                        case "Lab":
                            this.props.history.push("/lab");
                            break;
                        case "Admin":
                            this.props.history.push("/admin");
                            break;
                        case "Registrar":
                            this.props.history.push("/registrar");
                            break;
                        case "Patient":
                            this.props.history.push("/patient");
                            break;
                    }
                });
            } else {
                this.props.alert.error(<Trans>LoginError</Trans>);
            }
        });
    }

   

    render() {
        return (
            <div className="login-page">
                <ValidatorForm id="modalform" onSubmit={this.onLogin} >
                    <div className="col-sm-6 col-sm-offset-3 login-div">
                        <CustomInput labeltext="Login" onChange={this.handleChange} value={this.state.Login} name="Login" />
                        <CustomInput labeltext="Password" onChange={this.handleChange} value={this.state.Password} name="Password" type="password" />
                        <button type="submit">Login</button>
                    </div>
                </ValidatorForm>
                
            </div>
        );
    }
}

export default withRouter(withAlert()(LoginPage));