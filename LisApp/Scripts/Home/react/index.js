import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DoctorPage from './pages/doctor/doctorPage';
import DoctorStudiesPage from './pages/doctor/doctorStudiesPage';
import NursePage from './pages/nurse/nursePage';
import NurseStudiesPage from './pages/nurse/nurseStudiesPage';
import LabPage from './pages/lab/labPage';
import AdminPage from './pages/admin/adminPage';
import RegistrarPage from './pages/registrar/registrarPage';
import PatientPage from './pages/patient/patientPage';
import i18n from './i18n';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from './components/alertTemplate';
import Navbar from './components/navbar';
import LoginPage from './pages/login/loginPage';


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
        let indexComponent = null;
        if (localStorage.getItem("userType") === "" || localStorage.getItem("userType") == null) {
            indexComponent = LoginPage;
        }
        switch (localStorage.getItem("userType")) {
            case "Doctor":
                indexComponent = DoctorPage;
                break;
            case "Nurse":
                indexComponent = NursePage;
                break;
            case "Lab":
                indexComponent = LabPage;
                break;
            case "Admin":
                indexComponent = AdminPage;
                break;
            case "Registrar":
                indexComponent = RegistrarPage;
                break;
            case "Patient":
                indexComponent = PatientPage;
                break;
        }

        const language = localStorage.getItem('lisLanguage') || 'pl';

        return (
            <>
                <Router>
                <Navbar setEng={this.setEng} setPl={this.setPl} disabledEn={language === 'en'} disabledPl={language === 'pl'}/>
                    <AlertProvider template={AlertTemplate} {...options}>
                        <div>
                            {/*  <nav>
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
                                    <li>
                                        <Link to="/nursestudies/">NurseStudies</Link>
                                    </li>
                                    <li>
                                        <Link to="/patient/">Patient</Link>
                                    </li>
                                    <li>
                                        <Link to="/login/">Login</Link>
                                    </li>
                                </ul>
                            </nav> */}

                            <Route path="/" exact component={indexComponent} />
                            <Route path="/doctor/" component={DoctorPage} />
                            <Route path="/doctorstudies/" component={DoctorStudiesPage} />
                            <Route path="/nurse/" component={NursePage} />
                            <Route path="/nursestudies/" component={NurseStudiesPage} />
                            <Route path="/lab/" component={LabPage} />
                            <Route path="/admin/" component={AdminPage} />
                            <Route path="/registrar/" component={RegistrarPage} />
                            <Route path="/login/" component={LoginPage} />
                            <Route path="/patient/" component={PatientPage} />
                        </div>
                    </AlertProvider>
                </Router>
            </>
        );
    }
}

render(<App />, document.getElementById('app'));