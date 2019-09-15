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
            "Studies": "Badania",
            "AddPatient": "Add patient",
            "EditPatient": "Edit patient",
            "Details": "Details",
            "Sex": "Sex",
            "IdCardNumber": "NFZ Card ID",
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
            "RequiredField": "Field is required",
            "Max30": "Maximum length: 50 characters",
            "Max15": "Maximum length: 15 characters",
            "Max11": "Maximum length: 11 characters",
            "Max9": "Maximum length: 9 characters",
            "IsNumber": "The value must be an integer",
            "IsEmail": "Invalid email format",
            "Min9": "Minimum length: 9 characters",
            "RequiredFieldNN": 'complete the field or enter NN',
            "IsPesel": 'Enter pesel or date of birth',
            "IsPeselNN": 'Enter pesel, date of birth or NN',
            "AddEmployee": "Add employee",
            "EditEmployee": "Edit employee",
            "EmploymentDetails": "Employment details",
            "Ward": "Ward",
            "Fire": "Fire",
            "AddEmployeeSuccess": "A new employee has been added.",
            "AddEmployeeError": "Employee adding failed.",
            "EditEmployeeSuccess": "Employee data has been changed.",
            "EditEmployeeError": "Editing the employee failed.",
            "RemoveEmployeeSuccess": "Dismissal was successful.",
            "RemoveEmployeeError": "The dismissal failed.",
            "AddOrder": "Add order",
            "EditOrder": "Edit order",
            "PatientName": "Patient name",
            "Institution": "Institution",
            "EmployeeNameOrdered": "Ordering doctor",
            "DataOfOrder": "Data of order",
            "OrderDetail": "Order detail",
            "Comment": "Comment",
            "OrderedStudies": "Ordered studies",
            "Consultants": "Consultants",
            "AddOrderSuccess": "A new order has been added.",
            "AddOrderError": "Order adding failed.",
            "EditOrderSuccess": "Order data has been changed.",
            "EditOrderError" : "Editing the order failed.",
            "Prev" : "Previous",
            "Next": "Next",
            "Order": "Order",
            "PatientData": "Patient data",
            "IsNumberNN": "Enter number or NN",
            "AddFirstTest": "Add at least 1 test in the first study",
            "DetailsAndResult": "Details and result",
            "DataOfStudy": "Data of study",
            "DateOfStudy": "Date of testing",
            "Profile": "Type of study",
            "DateOfCollection": "Date of sampling",
            "EmployeeNameTesting": "Testing lab",
            "Sample": "Próbka",
            "EmployeeNameCollected": "Nurse taking a sample",
            "RegisterSample": "Register sample",
            "MarkSample": "Mark sample with the generated code.",
            "RegisterSampleError": "Sample registration failed.",
            "PrintCode": "Print code",
            "Result": "Result",
            "StartStudy": "Start testing",
            "Start": "Start",
            "Tests": "Tests",
            "Absent": "Absent",
            "Standard": "Standard",
            "StartStudyInfo": "Insert the sample into the analyzer and perform the ordered tests.",
            "StartStudyError": "Start testing failed.",
            "AddResult": "Add results",
            "ResultDesc": "Description of results",
            "IsFloat": "The value must be a float",
            "LabResultName": "Lab technician entering results",
            "DateOfResult": "Date of receipt of results",
            "LabVerifyName": "Lab technician verifying results",
            "DateOfVerification": "Date of verification",
            "VerifyDesc": "Verification description",
            "Verify": "Verify",
            "AddResultSuccess": "Results has been added.",
            "AddResultError": "Results adding failed.",
            "VerifySuccess": "Results has been verified.",
            "VerifyError": "Results verifying failed.",
            "SearchInfo": "To search for several phrases enter the separator '/' e.g. Ala / Cat.",
            "Yes": "Yes",
            "No": "No",
            "PositiveVerify": "Positive verification?",
            "NeedNewSample": "Need to take the sample again?",
            "ReasonForRepeat": "Reason for retrying",
            "Repeat": "Repeat study",
            "Repeating": "Repeating",
            "RepeatSuccess": "The study was repeated. New study id: {{id}}.",
            "RepeatError": "Retry failed.",
            "PrevStudy": "Previous study",
            "NextStudy": "Next study"
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
            "RequiredField": "Pole jest wymagane",
            "Max50": "Maksymalna długość: 50 znaków",
            "Max15": "Maksymalna długość: 15 znaków",
            "Max11": "Maksymalna długość: 11 znaków",
            "Max9": "Maksymalna długość: 9 znaków",
            "IsNumber": "Wartość musi być liczbą całkowitą",
            "IsEmail": "Nieprawidłowy format emaila",
            "Min9": "Minimalna długośc: 9 znaków",
            "RequiredFieldNN": 'Wypełnij pole lub wpisz NN',
            "IsPesel": 'Podaj pesel lub datę urodzenia',
            "IsPeselNN": 'Podaj pesel, datę urodzenia lub NN',
            "AddEmployee": "Dodaj pracownika",
            "EditEmployee": "Edytuj pracownika",
            "EmploymentDetails": "Szczegóły zatrudnienia",
            "Ward": "Oddział",
            "Fire": "Zwolnij",
            "AddEmployeeSuccess": "Dodano nowego pracownika.",
            "AddEmployeeError": "Dodawania pracownika zakończone niepowodzeniem.",
            "EditEmployeeSuccess": "Dane pracownika zostały zmienione.",
            "EditEmployeeError": "Edycja pracownika zakończona niepowodzeniem.",
            "RemoveEmployeeSuccess": "Zwolnienie pracownika zakończone powodzeniem.",
            "RemoveEmployeeError": "Zwolnienie pracownika zakończone niepowodzeniem.",
            "AddOrder": "Dodaj zlecenie",
            "EditOrder": "Edytuj zlecenie",
            "PatientName": "Imię i nazwisko pacjenta",
            "Institution": "Klinika",
            "EmployeeNameOrdered": "Lekarz zlecający",
            "DataOfOrder": "Dane zlecenia",
            "OrderDetail": "Szczegóły zlecenia",
            "Comment": "Komentarz",
            "OrderedStudies": "Zlecone badania",
            "Consultants": "Konsultanci",
            "AddOrderSuccess": "Dodano nowe zlecenie.",
            "AddOrderError": "Dodawanie zlecenia zakończone niepowodzeniem.",
            "EditOrderSuccess": "Dane zlecenia zostały zmienione.",
            "EditOrderError" : "Edycja zlecenia zakończona niepowodzeniem.",
            "Prev" : "Wstecz",
            "Next": "Dalej",
            "Order": "Zlecenie",
            "PatientData": "Dane pacjenta",
            "IsNumberNN": "Podaj numer lub wpisz NN",
            "AddFirstTest": "Dodaj przynajmniej 1 test w pierwszym badaniu",
            "DetailsAndResult": "Szczegóły i wyniki",
            "DataOfStudy": "Dane badania",
            "DateOfStudy": "Data wykonania badania",
            "Profile": "Typ badania",
            "SampleCode": "Kod próbki",
            "DateOfCollection": "Data pobrania próbki",
            "EmployeeNameTesting": "Laborant wykonujący badanie",
            "Sample": "Próbka",
            "EmployeeNameCollected": "Pielęgniarz pobierający próbkę",
            "RegisterSample": "Rejestruj próbkę",
            "MarkSample": "Oznacz próbkę wygenerowanym kodem.",
            "RegisterSampleError": "Rejestracja próbki zakończona niepowodzeniem.",
            "PrintCode": "Drukuj kod",
            "Result": "Wyniki",
            "Verification": "Weryfikacja",
            "StartStudy": "Rozpocznij badanie",
            "Start": "Rozpocznij",
            "Tests": "Testy",
            "Absent": "Nieobecny",
            "Standard": "Norma",
            "StartStudyInfo": "Wprowadź próbkę do analizatora i wykonaj zlecone testy.",
            "StartStudyError": "Rozpoczęcie testu zakończone niepowodzeniem.",
            "AddResult": "Dodaj wyniki",
            "ResultDesc": "Opis wyników",
            "IsFloat": "Wartość musi być liczbą",
            "LabResultName": "Laborant wpisujący wyniki",
            "DateOfResult": "Data otrzymania wyników",
            "LabVerifyName": "Laborant weryfikujący wyniki",
            "DateOfVerification":"Data weryfikacji",
            "VerifyDesc": "Opis weryfikacji",
            "Verify": "Zweryfikuj",
            "AddResultSuccess": "Dodano wyniki.",
            "AddResultError": "Dodawanie wyników zakończone niepowodzeniem.",
            "VerifySuccess": "Zweryfikowano wyniki",
            "VerifyError": "Weryfikacja wyników nie powiodła się.",
            "SearchInfo": "Aby wyszukać kilka fraz wprowadź separator '/' np. Ala/Kot.",
            "Yes": "Tak",
            "No": "Nie",
            "PositiveVerify": "Weryfikacja pozytywna?",
            "NeedNewSample": "Konieczność ponownego pobrania próbki?",
            "ReasonForRepeat": "Powód ponowienia testu",
            "Repeat": "Ponów badanie",
            "Repeating": "Ponowienie",
            "RepeatSuccess": "Ponowiono badanie. Nowe id badania: {{id}}.",
            "RepeatError": "Ponowienie badania zakończone niepowodzeniem.",
            "PrevStudy": "Poprzednie badanie",
            "NextStudy": "Następne badanie"
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