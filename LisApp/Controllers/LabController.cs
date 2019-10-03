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
            ActionResult wrongAuthorization = checkEmployeeAutorization((long)PositionTypeEnum.Lab);
            if (wrongAuthorization != null)
                return wrongAuthorization;

            List<StudyModel> studies = DB.StudiesDAO.ReadStudiesListForLab(Lang);
            return new CustomJsonResult { Data = new { data = studies } };
        }

        [HttpGet]
        public ActionResult GetOrderedTests(long studyId)
        {
            ActionResult wrongAuthorization = checkEmployeeAutorization((long)PositionTypeEnum.Lab);
            if (wrongAuthorization != null)
                return wrongAuthorization;

            List<TestModel> tests = DB.TestsDAO.ReadFullOrderedTestByStudyId(studyId, Lang);
            return new CustomJsonResult { Data = new { data = tests } };
        }

        [HttpGet]
        public ActionResult GetStudy(long id)
        {
            ActionResult wrongAuthorization = checkEmployeeAutorization((long)PositionTypeEnum.Lab);
            if (wrongAuthorization != null)
                return wrongAuthorization;

            StudyModel study = DB.StudiesDAO.ReadStudyById(id, Lang);
            if (study.IdStudy == (long)StatusTypeEnum.Ordered || study.IdStudy == (long)StatusTypeEnum.Ended)
            {
                return null;
            }

            if (study.IdStatus != (long)StatusTypeEnum.Ordered)
            {
                study.Sample = DB.SamplesDAO.ReadSampleByStudyId((long)study.IdStudy);

                study.OrderedTest = DB.TestsDAO.ReadFullOrderedTestByStudyId((long)study.IdStudy, Lang);

                if (study.IdStatus != (long)StatusTypeEnum.TakenSample)
                {
                    EmployeeModel lab = DB.EmployeesDAO.ReadEmployeeByStudyId((long)study.IdStudy, Lang);
                    if (lab != null)
                    {
                        study.IdLab = lab.IdEmployee;
                        study.Lab = lab.FirstName + " " + lab.Surname;
                    }
                    if (study.IdStatus != (long)StatusTypeEnum.InProgress)
                    {
                        study.Result = DB.ResultsDAO.ReadResultByStudyId((long)study.IdStudy);
                        EmployeeModel resultLab = DB.EmployeesDAO.ReadEmployeeById((long)study.Result.IdEmployee, Lang);
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
            ActionResult wrongAuthorization = checkEmployeeAutorization((long)PositionTypeEnum.Lab);
            if (wrongAuthorization != null)
                return wrongAuthorization;

            if (study != null)
            {
                try
                {
                    EmployeeModel employee = getEmployeeByUserId();
                    study.IdDoctor = (long)employee.IdEmployee;
                    study.IdStatus = (long)StatusTypeEnum.InProgress;
                    study.DateOfStudy = DateTime.Now;
                    DB.StudiesDAO.UpdateStudy(study);
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
        public ActionResult AddResult(StudyModel study)
        {
            ActionResult wrongAuthorization = checkEmployeeAutorization((long)PositionTypeEnum.Lab);
            if (wrongAuthorization != null)
                return wrongAuthorization;

            if (study != null)
            {
                try
                {
                    EmployeeModel employee = getEmployeeByUserId();
                    study.Result.IdEmployee = (long)employee.IdEmployee;
                    study.Result.IdStudy = (long)study.IdStudy;

                    long idResult = (long)DB.ResultsDAO.InsertResult(study.Result);
                    foreach (TestModel test in study.OrderedTest)
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
        public ActionResult AddVerify(StudyModel study)
        {
            ActionResult wrongAuthorization = checkEmployeeAutorization((long)PositionTypeEnum.Lab);
            if (wrongAuthorization != null)
                return wrongAuthorization;

            if (study != null)
            {
                try
                {
                    EmployeeModel employee = getEmployeeByUserId();
                    study.Result.Verification.IdEmployee = (long)employee.IdEmployee;
                    study.Result.Verification.IdResult = (long)study.Result.IdResult;
                    if (study.Result.Verification.Positive)
                    {
                        DB.VerificationsDAO.InsertVerify(study.Result.Verification);

                        DB.StudiesDAO.ChangeStudyStatus((long)study.IdStudy, (long)StatusTypeEnum.Verified);

                        List<StudyModel> otherStudies = DB.StudiesDAO.ReadNotVerifiedStudiesListByOrderId((long)study.IdOrder);
                        if (otherStudies.Count == 0)
                        {
                            DB.OrderDAO.ChangeOrderStatus((long)study.IdOrder, (long)StatusTypeEnum.Ended);
                        }

                        return Json("Success");
                    }
                    else
                    {
                        study.Result.Verification.Description = "-";
                        DB.VerificationsDAO.InsertVerify(study.Result.Verification);

                        study.IdRepeatEmployee = (long)employee.IdEmployee;
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
                        }
                        else
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
                catch (Exception)
                {
                    return throwBadRequest();
                }
            }
            return throwValidateError();
        }

        [HttpPost]
        public ActionResult RepeatStudy(StudyModel study)
        {
            ActionResult wrongAuthorization = checkEmployeeAutorization((long)PositionTypeEnum.Lab);
            if (wrongAuthorization != null)
                return wrongAuthorization;

            if (study != null)
            {
                try
                {
                    EmployeeModel employee = getEmployeeByUserId();
                    study.IdRepeatEmployee = (long)employee.IdEmployee;
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
                        study.Result.Verification.IdEmployee = (long)employee.IdEmployee;
                        study.Result.Verification.IdResult = (long)study.Result.IdResult;

                        study.Result.Verification.Description = "-";
                        DB.VerificationsDAO.InsertVerify(study.Result.Verification);
                    }

                    return Json(idStudy);
                }
                catch (Exception)
                {
                    return throwBadRequest();
                }
            }
            return throwValidateError();
        }
    }
}
