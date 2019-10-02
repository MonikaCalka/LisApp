import React from 'react';
import { Trans } from 'react-i18next';
import { withRouter } from 'react-router-dom';

class Navbar extends React.Component {

    logOut = () => {

        localStorage.setItem("token", "");
        localStorage.setItem("login", "");
        localStorage.setItem("userType", "");
        this.props.history.push("/login");
    }

    render() {
        const { setEng, setPl, disabledEn, disabledPl } = this.props;
        let login = localStorage.getItem("login");
        let logoutBtn = login != null && login != "" ? <button onClick={this.logOut} className="btn-logout" /> : null;
        return (
            <div className="navbar-margin">
                <div className="navbar">
                    <label className="lis-title"> <Trans>{"LIS"}</Trans> </label>
                    <div className="navbar-right">
                        <label > {login} </label>
                        {logoutBtn}
                        <button onClick={setEng} disabled={disabledEn} className="btn-eng" />
                        <button onClick={setPl} disabled={disabledPl} className="btn-pl" />
                    </div>
                </div>
                <div className="logo"></div>
            </div>
        );
    }
}

export default withRouter(Navbar);