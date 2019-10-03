using LisApp.Common;
using LisApp.Enums;
using LisApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LisApp.Controllers
{
    public class PatientController: CustomController
    {
 
        [HttpGet]
        public ActionResult GetStudyList()
        {
            ActionResult wrongAuthorization = checkPatient();
            if (wrongAuthorization != null)
                return wrongAuthorization;

            PatientModel patient = getPatientByUserId();
            List<StudyModel> studies = DB.StudiesDAO.ReadStudiesListForPatient((long)patient.IdPatient, Lang);
            return new CustomJsonResult { Data = new { data = studies } };
        }

        [HttpGet]
        public ActionResult GetStudy(long id)
        {
            ActionResult wrongAuthorization = checkPatient();
            if (wrongAuthorization != null)
                return wrongAuthorization;

            PatientModel patient = getPatientByUserId();
            StudyModel study = getStudyModel(id, Lang);
            if (study == null)
                return throwBadRequest();
            if (patient.IdPatient != study.IdPatient)
                return throwValidateError();
            return new CustomJsonResult { Data = new { data = study } };
        }

        private StudyModel getStudyModel(long id, string lang)
        {
            StudyModel study = DB.StudiesDAO.ReadStudyById(id, lang);
            study.OrderedTest = DB.TestsDAO.ReadFullOrderedTestByStudyId((long)study.IdStudy, lang);

            if (study.IdStatus != (long)StatusTypeEnum.Ordered)
            {
                if (study.IdStatus != (long)StatusTypeEnum.TakenSample)
                {
                    EmployeeModel lab = DB.EmployeesDAO.ReadEmployeeByStudyId((long)study.IdStudy, lang);
                    if (lab != null)
                    {
                        study.IdLab = lab.IdEmployee;
                        study.Lab = lab.FirstName + " " + lab.Surname;
                    }
                    if (study.IdStatus != (long)StatusTypeEnum.InProgress)
                    {
                        try
                        {
                            study.Result = DB.ResultsDAO.ReadResultByStudyId((long)study.IdStudy);
                            EmployeeModel resultLab = DB.EmployeesDAO.ReadEmployeeById((long)study.Result.IdEmployee, lang);
                            study.Result.EmployeeName = resultLab.FirstName + " " + resultLab.Surname;
                        }
                        catch (Exception)
                        {
                            return null;
                        }
                    }
                }
            }
            return study;
        }


        [HttpGet]
        public ActionResult GetReport(long id, string lang, string t)
        {
            ActionResult wrongAuthorization = checkPatient();
            if (wrongAuthorization != null)
                return wrongAuthorization;

            PatientModel patient = getPatientByUserId();

            ReportGenerator rg = new ReportGenerator();

            StudyModel study = getStudyModel(id, lang);
            if (study == null)
                return throwBadRequest();
            if (patient.IdPatient != study.IdPatient)
                return throwValidateError();

            byte[] report = rg.createPdf(study, lang);
            return File(report, "application/pdf");

        }
    }
}