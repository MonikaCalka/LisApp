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

    }
}