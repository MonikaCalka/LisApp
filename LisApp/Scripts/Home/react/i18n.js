import i18n from "i18next";
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
            "Studies": "Badania",
            "AddPatient": "Add patient",
            "EditPatient": "Edit patient",
            "Details": "Details",
            "Sex": "Sex",
            "IdCardNumber": "NFZ Card ID",
            "Insurance": "Insurance",
            "ContactData": "Contact data",
            "ContactPerson": "Contact person",
            "Street": "Street",
            "HouseNumber": "House number",
            "City": "City",
            "PostalCode": "Postal code",
            "Country": "Country",
            "Save": "Save",
            "Cancel": "Cancel",
            "Back": "Back",
            "Female": "Female",
            "Male": "Male",
            "AddPatientSuccess": "A new patient has been added.",
            "AddPatientError": "Patient adding failed.",
            "EditPatientSuccess": "Patient data has been changed.",
            "EditPatientError": "Editing the patient failed.",
            "RowsPerPage": "Rows per page:",
            "RequiredField": "Field is required"
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
            "Studies": "Badania",
            "AddPatient": "Dodaj pacjenta",
            "EditPatient": "Edytuj pacjenta",
            "Details": "Szczegóły",
            "Sex": "Płeć",
            "IdCardNumber": "ID karty NFZ",
            "Insurance": "Ubezpieczenie",
            "ContactData": "Dane kontaktowe",
            "ContactPerson": "Osoba kontaktowa",
            "Street": "Ulica",
            "HouseNumber": "Numer domu",
            "City": "Miasto",
            "PostalCode": "Kod pocztowy",
            "Country": "Kraj",
            "Save": "Zapisz",
            "Cancel": "Anuluj",
            "Back": "Powrót",
            "Female": "Kobieta",
            "Male": "Mężczyzna",
            "AddPatientSuccess": "Dodano nowego pacjenta.",
            "AddPatientError": "Dodawania pacjenta zakończone niepowodzeniem.",
            "EditPatientSuccess": "Dane pacjenta zostały zmienione.",
            "EditPatientError": "Edycja pacjenta zakończona niepowodzeniem.",
            "RowsPerPage": "Wierszy na stronę:",
            "RequiredField": "Pole jest wymagane"
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