using LisApp.Common;
using LisApp.Enums;
using LisApp.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Web.Mvc;

namespace LisApp.Controllers
{

    public class DoctorController : CustomController
    {
        [HttpGet]
        public ActionResult GetOrderList()
        {
            ActionResult wrongAuthorization = checkEmployeeAutorization((long)PositionTypeEnum.Doctor);
            if (wrongAuthorization != null)
                return wrongAuthorization;
            else
            {
                EmployeeModel employee = getEmployeeByUserId((long)IdUser);
                List<OrderModel> orderList = DB.OrderDAO.ReadOrdersList((long)employee.IdEmployee, Lang);
                return new CustomJsonResult { Data = new { data = orderList } };
            }
        }

        [HttpGet]
        public ActionResult GetOrder(long id)
        {
            ActionResult wrongAuthorization = checkEmployeeAutorization((long)PositionTypeEnum.Doctor);
            if (wrongAuthorization != null)
                return wrongAuthorization;
            else
            {
                OrderModel order = DB.OrderDAO.ReadOrderById(id, Lang);
                order = setConsultants(order, Lang);
                order = setStudies(order);

                return new CustomJsonResult { Data = new { data = order } };
            }
        }

        private OrderModel setConsultants(OrderModel order, string langId)
        {
            List<EmployeeModel> consultants = DB.EmployeesDAO.ReadConsultantsList((long)order.IdOrder, langId);
            if (consultants != null)
            {
                List<long> idConsultants = new List<long>();
                foreach (EmployeeModel emp in consultants)
                {
                    idConsultants.Add((long)emp.IdEmployee);
                }
                order.IdConsultants = idConsultants;
            }
            return order;
        }

        private OrderModel setStudies(OrderModel order)
        {
            List<StudyModel> studies = DB.StudiesDAO.ReadStudiesListByOrderId(order.IdOrder);
            if (studies != null)
            {
                foreach (StudyModel study in studies)
                {
                    study.IdTests = DB.TestsDAO.ReadOrderedTestByStudyId((long)study.IdStudy);
                }
                order.Studies = studies;
            }
            return order;
        }

        [HttpGet]
        public ActionResult GetPatientSelect()
        {
            ActionResult wrongAuthorization = checkEmployee();
            if (wrongAuthorization != null)
                return wrongAuthorization;
            else
            {
                List<PatientModel> select = DB.PatientsDAO.ReadPatientsSelect();
                return Json(select, JsonRequestBehavior.AllowGet);

            }
        }

        [HttpGet]
        public ActionResult GetProfileSelect()
        {
            List<ProfileModel> select = DB.ProfilesDAO.ReadProfilesList(Lang);
            foreach (ProfileModel profile in select)
            {
                List<TestModel> test = DB.TestsDAO.ReadTestsList(profile.value, Lang);
                profile.tests = test;
            }
            return Json(select, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetConsultantSelect()
        {
            ActionResult wrongAuthorization = checkEmployee();
            if (wrongAuthorization != null)
                return wrongAuthorization;
            else
            {
                List<SelectOption> select = DB.EmployeesDAO.ReadConsultantsSelect();
                return Json(select, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public ActionResult GetStudyList()
        {
            ActionResult wrongAuthorization = checkEmployeeAutorization((long)PositionTypeEnum.Doctor);
            if (wrongAuthorization != null)
                return wrongAuthorization;
            else
            {
                EmployeeModel employee = getEmployeeByUserId((long)IdUser);
                List<StudyModel> studies = DB.StudiesDAO.ReadStudiesListForDoctors((long)employee.IdEmployee, Lang);
                return new CustomJsonResult { Data = new { data = studies } };
            }
        }

        [HttpGet]
        public ActionResult GetStudy(long id)
        {
            ActionResult wrongAuthorization = checkEmployeeAutorization((long)PositionTypeEnum.Doctor);
            if (wrongAuthorization != null)
                return wrongAuthorization;
            else
            {
                StudyModel study = DB.StudiesDAO.ReadStudyById(id, Lang);
                study.OrderedTest = DB.TestsDAO.ReadFullOrderedTestByStudyId((long)study.IdStudy, Lang);

                if (study.IdStatus != (long)StatusTypeEnum.Ordered)
                {
                    study.Sample = DB.SamplesDAO.ReadSampleByStudyId((long)study.IdStudy);
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
                            try
                            {
                                study.Result = DB.ResultsDAO.ReadResultByStudyId((long)study.IdStudy);
                                EmployeeModel resultLab = DB.EmployeesDAO.ReadEmployeeById((long)study.Result.IdEmployee, Lang);
                                study.Result.EmployeeName = resultLab.FirstName + " " + resultLab.Surname;
                                study.Result.Verification = new VerificationModel();
                                if (study.IdStatus != (long)StatusTypeEnum.ToVerify)
                                {
                                    try
                                    {
                                        study.Result.Verification = DB.VerificationsDAO.ReadVerificationByResultId((long)study.Result.IdResult);
                                    }
                                    catch (Exception ex)
                                    {
                                        return throwBadRequest();
                                    }
                                }
                            }
                            catch (Exception ex)
                            {
                                return throwBadRequest();
                            }
                        }
                    }
                }
                return new CustomJsonResult { Data = new { data = study } };
            }

        }

        [HttpPost]
        public ActionResult AddNewOrder(OrderModel order)
        {
            ActionResult wrongAuthorization = checkEmployeeAutorization((long)PositionTypeEnum.Doctor);
            if (wrongAuthorization != null)
                return wrongAuthorization;
            else
            {
                List<ValidationResult> results = new List<ValidationResult>();
                ValidationContext context = new ValidationContext(order, null, null);
                if (order != null && Validator.TryValidateObject(order, context, results, true))
                {
                    try
                    {
                        EmployeeModel employee = getEmployeeByUserId((long)IdUser);
                        order.IdEmployee = (long)employee.IdEmployee;

                        long idOrder = (long)DB.OrderDAO.InsertOrder(order);
                        if (order.IdConsultants != null)
                        {
                            foreach (long cons in order.IdConsultants)
                            {
                                DB.EmployeesDAO.InsertConsultant(cons, idOrder);
                            }
                        }

                        if (order.Studies != null)
                        {
                            foreach (StudyModel study in order.Studies)
                            {
                                if (study.IdProfile != null && study.IdTests != null && study.IdTests.Count > 0)
                                {
                                    study.IdOrder = idOrder;
                                    long idStudy = (long)DB.StudiesDAO.InsertStudy(study);

                                    foreach (long idTest in study.IdTests)
                                    {
                                        DB.TestsDAO.InsertOrderedTest(idStudy, idTest);
                                    }
                                }
                            }
                        }
                        return new HttpStatusCodeResult(200);
                    }
                    catch (Exception ex)
                    {
                        return throwBadRequest();
                    }
                }
                else
                    return throwValidateError();
            }
        }

        [HttpPost]
        public ActionResult EditOrder(OrderModel order)
        {
            ActionResult wrongAuthorization = checkEmployeeAutorization((long)PositionTypeEnum.Doctor);
            if (wrongAuthorization != null)
                return wrongAuthorization;
            else
            {
                List<ValidationResult> results = new List<ValidationResult>();
                ValidationContext context = new ValidationContext(order, null, null);
                if (order != null && Validator.TryValidateObject(order, context, results, true))
                {
                    try
                    {
                        EmployeeModel employee = getEmployeeByUserId((long)IdUser);
                        order.IdEmployee = (long)employee.IdEmployee;

                        DB.EmployeesDAO.DeleteConsultantsByOrder((long)order.IdOrder);

                        List<StudyModel> oldStudies = DB.StudiesDAO.ReadStudiesListByOrderId((long)order.IdOrder);

                        if (order.IdStatus == (long)StatusTypeEnum.Ordered)
                        {
                            foreach (StudyModel study in oldStudies)
                            {
                                DB.TestsDAO.DeleteOrderedTestByStudy((long)study.IdStudy);
                            }
                            DB.StudiesDAO.DeleteStudiesByOrder((long)order.IdOrder);
                            DB.OrderDAO.FullUpdateOrder(order);
                        }
                        else
                        {
                            DB.OrderDAO.UpdateOrder(order);
                        }

                        if (order.IdConsultants != null)
                        {
                            foreach (long cons in order.IdConsultants)
                            {
                                DB.EmployeesDAO.InsertConsultant(cons, (long)order.IdOrder);
                            }
                        }

                        if (order.IdStatus == (long)StatusTypeEnum.Ordered)
                        {
                            if (order.Studies != null)
                            {
                                foreach (StudyModel study in order.Studies)
                                {
                                    if (study.IdProfile != null && study.IdTests != null && study.IdTests.Count > 0)
                                    {
                                        study.IdOrder = (long)order.IdOrder;
                                        long idStudy = (long)DB.StudiesDAO.InsertStudy(study);

                                        foreach (long idTest in study.IdTests)
                                        {
                                            DB.TestsDAO.InsertOrderedTest(idStudy, idTest);
                                        }
                                    }
                                }
                            }
                        }
                        return new HttpStatusCodeResult(200);
                    }
                    catch (Exception ex)
                    {
                        return throwBadRequest();
                    }
                }
                else
                    return throwValidateError();
            }

        }
    }
}