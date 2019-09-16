using LisApp.Common;
using LisApp.Enums;
using LisApp.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
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
                    study.DateOfStudy = DateTime.Now;
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
                        NumberFormatInfo provider = new NumberFormatInfo();
                        provider.NumberDecimalSeparator = ".";
                        resultUnit.Value = Convert.ToDouble(test.Result, provider);

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
                    if (study.Result.Verification.Positive)
                    {
                        DB.VerificationsDAO.InsertVerify(study.Result.Verification);

                        DB.StudiesDAO.ChangeStudyStatus((long)study.IdStudy, (long)StatusTypeEnum.Verified);

                        List<StudyModel> otherStudies = DB.StudiesDAO.ReadNotVerifiedStudiesListByOrderId((long)study.IdOrder);
                        if(otherStudies.Count == 0)
                        {
                            DB.OrderDAO.ChangeOrderStatus((long)study.IdOrder, (long)StatusTypeEnum.Ended);
                        }

                        return Json("Success");
                    }
                    else 
                    {
                        study.Result.Verification.Description = "-";
                        DB.VerificationsDAO.InsertVerify(study.Result.Verification);

                        study.IdRepeatEmployee = employeeId;
                        DB.StudiesDAO.SetReorederDataOfStudy(study);
                        study.PreviousId = study.IdStudy;

                        long idStudy = (long)DB.StudiesDAO.InsertStudy(study);

                        foreach (TestModel test in study.OrderedTest)
                        {
                            DB.TestsDAO.InsertOrderedTest(idStudy, test.IdTest);
                        }

                        if ((bool)study.NeedNewSample)
                        {
                            DB.StudiesDAO.ChangeStudyStatus(idStudy, (long)StatusTypeEnum.Ordered);
                        } else
                        {
                            study.Sample.IdStudy = idStudy;

                            long idSample = (long)DB.SamplesDAO.InsertSample(study.Sample);
                            study.Sample.IdSample = idSample;
                            DB.SamplesDAO.UpdateSample(study.Sample);

                            DB.StudiesDAO.ChangeStudyStatus(idStudy, (long)StatusTypeEnum.TakenSample);
                        }
                        return Json(idStudy);
                    }
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
        public ActionResult RepeatStudy(StudyModel study)
        {
            if (study != null)
            {
                try
                {
                    // get User !!!
                    long employeeId = 1;
                    study.IdRepeatEmployee = employeeId;
                    long oldStatusId = study.IdStatus;
                    DB.StudiesDAO.SetReorederDataOfStudy(study);

                    long idStudy = (long)DB.StudiesDAO.InsertStudy(study);

                    foreach (TestModel test in study.OrderedTest)
                    {
                        DB.TestsDAO.InsertOrderedTest(idStudy, test.IdTest);
                    }
                    if ((bool)study.NeedNewSample)
                    {
                        DB.StudiesDAO.ChangeStudyStatus(idStudy, (long)StatusTypeEnum.Ordered);
                    }
                    else
                    {
                        study.Sample.IdStudy = idStudy;

                        long idSample = (long)DB.SamplesDAO.InsertSample(study.Sample);
                        study.Sample.IdSample = idSample;
                        DB.SamplesDAO.UpdateSample(study.Sample);

                        DB.StudiesDAO.ChangeStudyStatus(idStudy, (long)StatusTypeEnum.TakenSample);
                    }
                    if (oldStatusId.Equals((long)StatusTypeEnum.ToVerify))
                    {
                        study.Result.Verification.Positive = false;
                        study.Result.Verification.IdEmployee = employeeId;
                        study.Result.Verification.IdResult = (long)study.Result.IdResult;

                        study.Result.Verification.Description = "-";
                        DB.VerificationsDAO.InsertVerify(study.Result.Verification);
                    }

                    return Json(idStudy);
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
