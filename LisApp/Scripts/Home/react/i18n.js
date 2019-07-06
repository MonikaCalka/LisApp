﻿import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
    en: {
        translation: {
            "Welcome to React": "Welcome to React and react-i18next",
            "OrderId": "Order ID",
            "Patient": "Patient",
            "DateOfOrder": "Date of order",
            "Status": "Status",
            "Priority": "Priority",
            "Orders": "Orders",
            "Login": "Login",
            "FirstName": "First name",
            "LastName": "Last name",
            "Address": "Address",
            "Position": "Position",
            "Employees": "Employees",
            "Phone": "Phone",
            "Email": "Email",
            "Patients": "Patients",
            "PESEL": "PESEL",
            "IdPatient": "Patient ID",
            "StudyId": "Study ID",
            "Studies": "Badania"
        }
    },
    pl: {
        translation: {
            "Welcome to React": "Elo ziom w Reacie",
            "OrderId": "ID zlecenia",
            "Patient": "Pacjent",
            "DateOfOrder": "Data zlecenia",
            "Status": "Status",
            "Priority": "Priorytet",
            "Orders": "Zlecenia",
            "Login": "Login",
            "FirstName": "Imię",
            "LastName": "Nazwisko",
            "Address": "Adres",
            "Position": "Stanowisko",
            "Employees": "Pracownicy",
            "Phone": "Telefon",
            "Email": "Email",
            "Patients": "Pacjenci",
            "PESEL": "PESEL",
            "IdPatient": "ID pacjenta",
            "StudyId": "ID badania",
            "Studies": "Badania"
        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "pl",

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;