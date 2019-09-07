using LisApp.Common;
using LisApp.Enums;
using LisApp.Models;
using System;
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
            string langId = Language.getLang(Request);
            List<StudyModel> studies = DB.StudiesDAO.ReadStudiesListForLab(langId);
            return new CustomJsonResult { Data = new { data = studies } };
        }

        [HttpGet]
        public ActionResult GetOrderedTests(long studyId)
        {
            string langId = Language.getLang(Request);

            List<TestModel> tests = DB.TestsDAO.ReadFullOrderedTestByStudyId(studyId, langId);

            return new CustomJsonResult { Data = new { data = tests } };
        }

        [HttpGet]
        public ActionResult GetStudy(long id)
        {
            string langId = Language.getLang(Request);
            StudyModel study = DB.StudiesDAO.ReadStudyById(id, langId);
            if(study.IdStudy == (long)StatusTypeEnum.Ordered || study.IdStudy == (long)StatusTypeEnum.Ended)
            {
                return null;
            }

            if (study.IdStatus != (long)StatusTypeEnum.Ordered)
            {
                study.Sample = DB.SamplesDAO.ReadSampleByStudyId((long)study.IdStudy);

                study.OrderedTest = DB.TestsDAO.ReadFullOrderedTestByStudyId((long)study.IdStudy, langId);

                if (study.IdStatus != (long)StatusTypeEnum.TakenSample)
                {
                    EmployeeModel lab = DB.EmployeesDAO.ReadEmployeeByStudyId((long)study.IdStudy, langId);
                    if (lab != null)
                    {
                        study.IdLab = lab.IdEmployee;
                        study.Lab = lab.FirstName + " " + lab.Surname;
                    }
                }
            }
            return new CustomJsonResult { Data = new { data = study } };
        }


        [HttpPost]
        public ActionResult StartStudy(StudyModel study)
        {
            if (study != null)
            {
                try
                {
                    // get User !!!
                    long employeeId = 1;
                    study.IdDoctor = employeeId;
                    study.IdStatus = (long)StatusTypeEnum.InProgress;
                    DB.StudiesDAO.UpdateStudy(study);
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

    }
}
