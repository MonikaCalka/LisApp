using LisApp.Common;
using LisApp.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
            List<PatientModel> patients = DB.PatientsDAO.ReadPatientsList();
            return Json(patients, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetPatient(long id)
        {
            PatientModel patient = DB.PatientsDAO.ReadPatientById(id);
            return Json(patient, JsonRequestBehavior.AllowGet);
        }

        private bool validPeselOrBirthday(string peselOrDate, string sex)
        {
            if(peselOrDate == "NN")
            {
                return true;
            }
            DateTime dateValue;
            if (DateTime.TryParse(peselOrDate, out dateValue))
            {
                if (DateTime.Now.Year - dateValue.Year < 135)
                    return true;
                else
                    return false;
            }
            else {
                char[] chars = peselOrDate.ToCharArray();
                if (!(Char.GetNumericValue(chars[4]) >= 0 && Char.GetNumericValue(chars[4]) <= 3))
                    return false;
                if ((Char.GetNumericValue(chars[9]) % 2 == 0 && sex == "M") || (Char.GetNumericValue(chars[9]) % 2 != 0 && sex == "F"))
                    return false;
                int sum = 0;
                int[] weights = new int[10] { 1, 3, 7, 9, 1, 3, 7, 9, 1, 3 };
                for (int i = 0; i < chars.Length-1; i++)
                {
                    int charWithWeight = (int)Char.GetNumericValue(chars[i]) * weights[i];
                    sum += charWithWeight % 10;
                }
                int endChar = 10 - (sum % 10);
                if (Char.GetNumericValue(chars[10]) != endChar)
                    return false;
            }
            return true;
        }

        [HttpPost]
        public ActionResult AddNewPatient(PatientModel patient)
        {
            List<ValidationResult> results = new List<ValidationResult>();
            ValidationContext context = new ValidationContext(patient, null, null);

            if(!validPeselOrBirthday(patient.Pesel, patient.Sex))
            {
            }

            if (patient != null && Validator.TryValidateObject(patient, context, results, true))
            {
                try
                {
                    DB.PatientsDAO.InsertPatient(patient);
                    return Json("Success");
                }
                catch (Exception ex)
                {
                    return Json("Error");
                }
            }
            else
            {
                return Json("Error");
            }
        }

        [HttpPost]
        public ActionResult EditPatient(PatientModel patient)
        {
            List<ValidationResult> results = new List<ValidationResult>();
            ValidationContext context = new ValidationContext(patient, null, null);

            if (!validPeselOrBirthday(patient.Pesel))
            { }

            if (patient != null && patient.IdPatient != null && Validator.TryValidateObject(patient, context, results, true))
            {
                PatientModel oldData = DB.PatientsDAO.ReadPatientById(patient.IdPatient);

                // TO DO: LOGGED USER
                try
                {
                    DB.PatientsDAO.InsertHistoryDataOfPatient(oldData, "user");
                    DB.PatientsDAO.UpdatePatient(patient);
                    return Json("Success");
                }
                catch (Exception ex) {
                    return Json("Error");
                }
            }
            else
            {
                return Json("Error");
            }
        }

    }
}