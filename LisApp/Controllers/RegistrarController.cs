using LisApp.Common;
using LisApp.Models;
using System;
using System.Collections.Generic;
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

        [HttpPost]
        public ActionResult AddNewPatient(PatientModel patient)
        {
            if (patient != null)
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
            if (patient != null && patient.IdPatient != null)
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