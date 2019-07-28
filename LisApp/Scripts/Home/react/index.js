﻿import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DoctorPage from './pages/doctor/doctorPage';
import NursePage from './pages/nurse/nursePage';
import LabPage from './pages/lab/labPage';
import AdminPage from './pages/admin/adminPage';
import RegistrarPage from './pages/registrar/registrarPage';
import i18n from './i18n';
import { getJson } from './services/rests';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from './components/alertTemplate';

const options = {
    position: 'bottom center',
    timeout: 5000,
    offset: '30px',
    transition: 'scale'
};

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        getJson("Admin/GetUserList", response => this.setState({ data: response }));
    }

    onlChange = () => {
        i18n.changeLanguage('en', (err, t) => {
            if (err) return console.log('something went wrong loading', err);
            t('key'); // -> same as i18next.t
        });
        this.forceUpdate();
    }

    render() {

        var dataxxx = [
            "wiersz 1",
            "wiersz 2",
            "wiersz 3",
            "wiersz 4"
        ];



        const data2 = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }];

        const columns = [
            {
                name: 'Login',
                selector: 'Login',
                sortable: true
            },
            {
                name: 'Hasło',
                selector: 'Password',
                sortable: true,
                right: true
            }
        ];


        const indexComponent = DoctorPage;
        return (
            <>
                <Router>
                    <AlertProvider template={AlertTemplate} {...options}>
                    <div>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/doctor/">Doctor</Link>
                                </li>
                                <li>
                                    <Link to="/nurse/">Nurse</Link>
                                </li>
                                <li>
                                    <Link to="/lab/">Lab</Link>
                                </li>
                                <li>
                                    <Link to="/admin/">Admin</Link>
                                </li>
                                <li>
                                    <Link to="/registrar/">Registrar</Link>
                                </li>
                            </ul>
                        </nav>
                        
                        <Route path="/" exact component={indexComponent} />
                        <Route path="/doctor/" component={DoctorPage} />
                        <Route path="/nurse/" component={NursePage} />
                        <Route path="/lab/" component={LabPage} />
                        <Route path="/admin/" component={AdminPage} />
                        <Route path="/registrar/" component={RegistrarPage} />
                        </div>
                    </AlertProvider>
                </Router>
                <button onClick={this.onlChange}>en</button>
            </>
            );
    }
}

render(<App />, document.getElementById('app'));