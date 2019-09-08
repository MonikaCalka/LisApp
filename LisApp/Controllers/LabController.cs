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
                    if(study.IdStatus != (long)StatusTypeEnum.InProgress)
                    {
                        study.Result = DB.ResultsDAO.ReadResultByStudyId((long)study.IdStudy);
                        EmployeeModel resultLab = DB.EmployeesDAO.ReadEmployeeById((long) study.Result.IdEmployee, langId);
                        study.Result.EmployeeName = resultLab.FirstName + " " + resultLab.Surname;
                        study.Result.Verification = new VerificationModel();
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

        [HttpPost]
        public ActionResult AddResult(StudyModel study)
        {
            if (study != null)
            {
                try
                {
                    // get User !!!
                    long employeeId = 1;
                    
                    study.Result.IdEmployee = employeeId;
                    study.Result.IdStudy = (long)study.IdStudy;

                    long idResult = (long)DB.ResultsDAO.InsertResult(study.Result);
                    foreach(TestModel test in study.OrderedTest)
                    {
                        ResultUnitModel resultUnit = new ResultUnitModel();
                        resultUnit.IdResult = idResult;
                        resultUnit.IdOrderedTest = (long)test.IdOrderedTest;
                        resultUnit.Value = (double)test.Result;

                        DB.ResultUnitsDAO.InsertResultUnit(resultUnit);
                    }

                    DB.StudiesDAO.ChangeStudyStatus((long)study.IdStudy, (long)StatusTypeEnum.ToVerify);

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
        public ActionResult AddVerify(StudyModel study)
        {
            if (study != null)
            {
                try
                {
                    // get User !!!
                    long employeeId = 1;

                    study.Result.Verification.IdEmployee = employeeId;
                    study.Result.Verification.IdResult = (long)study.Result.IdResult;

                    DB.VerificationsDAO.InsertVerify(study.Result.Verification);

                    DB.StudiesDAO.ChangeStudyStatus((long)study.IdStudy, (long)StatusTypeEnum.Verified);

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
