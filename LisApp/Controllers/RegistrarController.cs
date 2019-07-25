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
                return Json("Success");
            }
            else
            {
                return Json("Error");
            }
        }

        [HttpPost]
        public ActionResult EditPatient(PatientModel patient)
        {
            if (patient != null)
            {
                return Json("Success");
            }
            else
            {
                return Json("Error");
            }
        }

    }
}