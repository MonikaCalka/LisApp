using LisApp.Common;
using LisApp.Enums;
using LisApp.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Web.Mvc;

namespace LisApp.Controllers
{
    public class RegistrarController : CustomController
    {
        protected IDatabaseFacade DB;

        public RegistrarController()
        {
            DB = new DatabaseFacade();
        }

        [HttpGet]
        public ActionResult GetPatientList()
        {
            ActionResult wrongAuthorization = checkEmployeeAutorization((long)PositionTypeEnum.Registrar);
            if (wrongAuthorization != null)
                return wrongAuthorization;

            List<PatientModel> patients = DB.PatientsDAO.ReadPatientsList();
            return Json(patients, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetPatient(long id)
        {
            ActionResult wrongAuthorization = checkEmployeeAutorization((long)PositionTypeEnum.Registrar);
            if (wrongAuthorization != null)
                return wrongAuthorization;

            PatientModel patient = DB.PatientsDAO.ReadPatientById(id);
            return Json(patient, JsonRequestBehavior.AllowGet);
        }

        private ActionResult validPeselOrBirthday(string peselOrDate, string sex)
        {
            if (peselOrDate == "NN")
            {
                return null;
            }
            DateTime dateValue;
            if (DateTime.TryParse(peselOrDate, out dateValue))
            {
                if (DateTime.Now.Year - dateValue.Year < 135)
                    return null;
                else
                {
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    return Json(new { message = "Wrong pesel", description = "Incorrect date of birth." }, JsonRequestBehavior.AllowGet);
                }
            }
            else
            {
                ActionResult wrongPesel = checkPesel(peselOrDate, peselOrDate);
                if (wrongPesel != null)
                    return wrongPesel;
                return null;
            }
        }

        [HttpPost]
        public ActionResult AddNewPatient(PatientModel patient)
        {
            ActionResult wrongAuthorization = checkEmployeeAutorization((long)PositionTypeEnum.Registrar);
            if (wrongAuthorization != null)
                return wrongAuthorization;


            List<ValidationResult> results = new List<ValidationResult>();
            ValidationContext context = new ValidationContext(patient, null, null);

            if (patient != null && Validator.TryValidateObject(patient, context, results, true))
            {
                ActionResult wrongPesel = validPeselOrBirthday(patient.Pesel, patient.Sex);
                if (wrongPesel != null)
                    return wrongPesel;
                try
                {
                    long? patientId = DB.PatientsDAO.InsertPatient(patient);

                    UserModel user = new UserModel(null, createLogin(patient.FirstName, patient.Surname), patient.Password, patientId);
                    DB.UserDAO.InsertUser(user);
                    return new HttpStatusCodeResult(200);
                }
                catch (Exception)
                {
                    return throwBadRequest();
                }
            }
            return throwValidateError();
        }

        [HttpPost]
        public ActionResult EditPatient(PatientModel patient)
        {
            ActionResult wrongAuthorization = checkEmployeeAutorization((long)PositionTypeEnum.Registrar);
            if (wrongAuthorization != null)
                return wrongAuthorization;

            List<ValidationResult> results = new List<ValidationResult>();
            ValidationContext context = new ValidationContext(patient, null, null);


            if (patient != null && patient.IdPatient != null && Validator.TryValidateObject(patient, context, results, true))
            {
                ActionResult wrongPesel = validPeselOrBirthday(patient.Pesel, patient.Sex);
                if (wrongPesel != null)
                    return wrongPesel;
                PatientModel oldData = DB.PatientsDAO.ReadPatientById(patient.IdPatient);
                try
                {
                    EmployeeModel employeeChanger = getEmployeeByUserId();
                    DB.PatientsDAO.InsertHistoryDataOfPatient(oldData, employeeChanger.FirstName + employeeChanger.Surname);
                    DB.PatientsDAO.UpdatePatient(patient);
                    return new HttpStatusCodeResult(200);
                }
                catch (Exception)
                {
                    return throwBadRequest();
                }
            }
            return throwValidateError();
        }

        [HttpPost]
        public ActionResult CheckPesel(PatientModel patient)
        {
            ActionResult wrongPesel = validPeselOrBirthday(patient.Pesel, patient.Sex);
            if (wrongPesel != null)
                return wrongPesel;
            return new HttpStatusCodeResult(200);
        }
    }
}