import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DoctorPage from './pages/doctor/doctorPage';
import DoctorStudiesPage from './pages/doctor/doctorStudiesPage';
import NursePage from './pages/nurse/nursePage';
import LabPage from './pages/lab/labPage';
import AdminPage from './pages/admin/adminPage';
import RegistrarPage from './pages/registrar/registrarPage';
import i18n from './i18n';
import { getJson } from './services/rests';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from './components/alertTemplate';
import Navbar from './components/navbar';


const options = {
    position: 'bottom center',
    timeout: 5000,
    offset: '30px',
    transition: 'scale'
};

class App extends React.Component {

    constructor(props) {
        super(props);
        const language = localStorage.getItem('lisLanguage');
        i18n.changeLanguage(language || 'pl', (err, t) => {
            if (err) return console.log('something went wrong loading', err);
            t('key');
        });

        this.state = {
            data: []
        };
    }

    componentDidMount() {
        //getJson("Admin/GetUserList", response => this.setState({ data: response }));
    }

    setEng = () => {
        i18n.changeLanguage('en', (err, t) => {
            if (err) return console.log('something went wrong loading', err);
            t('key');
        });
        localStorage.setItem('lisLanguage', 'en');
        this.forceUpdate();
    }

    setPl = () => {
        i18n.changeLanguage('pl', (err, t) => {
            if (err) return console.log('something went wrong loading', err);
            t('key');
        });
        localStorage.setItem('lisLanguage', 'pl');
        this.forceUpdate();
    }

    render() {
        const indexComponent = DoctorPage;

        const language = localStorage.getItem('lisLanguage') || 'pl';

        return (
            <>
                <Navbar />
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
                                    <li>
                                        <Link to="/doctorstudies/">DoctorStudies</Link>
                                    </li>
                                </ul>
                            </nav>

                            <Route path="/" exact component={indexComponent} />
                            <Route path="/doctor/" component={DoctorPage} />
                            <Route path="/doctorstudies/" component={DoctorStudiesPage} />
                            <Route path="/nurse/" component={NursePage} />
                            <Route path="/lab/" component={LabPage} />
                            <Route path="/admin/" component={AdminPage} />
                            <Route path="/registrar/" component={RegistrarPage} />
                        </div>
                    </AlertProvider>
                </Router>
                <button onClick={this.setEng} disabled={language === 'en'}>en</button>
                <button onClick={this.setPl} disabled={language === 'pl'}>pl</button>
            </>
        );
    }
}

render(<App />, document.getElementById('app'));