using LisApp.Common;
using LisApp.Models;
using System.Collections.Generic;
using System.Web.Mvc;

namespace LisApp.Controllers
{
    public class LabController : CustomController
    {
        protected IDatabaseFacade DB;
        public LabController()
        {
            DB = new DatabaseFacade();
        }

        [HttpGet]
        public ActionResult GetStudyList()
        {
            string lang = "pl";
            List<StudyModel> studies = DB.StudiesDAO.ReadStudiesListForLab(lang);
            return Json(studies, JsonRequestBehavior.AllowGet);
        }
    }
}
