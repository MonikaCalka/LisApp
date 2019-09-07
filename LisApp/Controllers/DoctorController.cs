using LisApp.Common;
using LisApp.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace LisApp.Controllers
{

    public class DoctorController : CustomController
    {
        [HttpGet]
        public JsonResult GetOrderList()
        {
            // get User !!!
            long userId = 1;

            string langId = Language.getLang(Request);
            List<OrderModel> orderList = DB.OrderDAO.ReadOrdersList(userId, langId);

            return new CustomJsonResult { Data = new { data = orderList } };
        }

        [HttpGet]
        public ActionResult GetOrder(long id)
        {
            string langId = Language.getLang(Request);
            OrderModel order = DB.OrderDAO.ReadOrderById(id, langId);
           
            order = setConsultants(order, langId);
            order = setStudies(order);

            return new CustomJsonResult { Data = new { data = order } };
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
            List<SelectOption> select = DB.PatientsDAO.ReadPatientsSelect();
            return Json(select, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetProfileSelect()
        {
            string langId = Language.getLang(Request);
            List<ProfileModel> select = DB.ProfilesDAO.ReadProfilesList(langId);
            foreach (ProfileModel profile in select) {
                List<TestModel> test = DB.TestsDAO.ReadTestsList(profile.value, langId);
                profile.tests = test;
            }
            return Json(select, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetConsultantSelect()
        {
            List<SelectOption> select = DB.EmployeesDAO.ReadConsultantsSelect();
            return Json(select, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetStudyList()
        {
            // get User !!!
            long userId = 1;

            string langId = Language.getLang(Request);
            List<StudyModel> studies = DB.StudiesDAO.ReadStudiesListForDoctors(userId, langId);
            return new CustomJsonResult { Data = new { data = studies } };
        }

        [HttpGet]
        public ActionResult GetStudy(long id)
        {
            string langId = Language.getLang(Request);
            StudyModel study = DB.StudiesDAO.ReadStudyById(id, langId);
            if(study.IdStatus != 1)
            {
                study.Sample = DB.SamplesDAO.ReadSampleByStudyId((long)study.IdStudy);
                if (study.IdStatus != 7)
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
        public ActionResult AddNewOrder(OrderModel order)
        {
            List<ValidationResult> results = new List<ValidationResult>();
            ValidationContext context = new ValidationContext(order, null, null);
            if (order != null && Validator.TryValidateObject(order, context, results, true))
            {
                try
                {
                    // get User !!!
                    long employeeId = 1;
                    order.IdEmployee = employeeId;

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
        public ActionResult EditOrder(OrderModel order)
        {
            List<ValidationResult> results = new List<ValidationResult>();
            ValidationContext context = new ValidationContext(order, null, null);
            if (order != null && Validator.TryValidateObject(order, context, results, true))
            {
                try
                {
                    // get User !!!
                    long employeeId = 1;
                    order.IdEmployee = employeeId;

                    DB.EmployeesDAO.DeleteConsultantsByOrder((long)order.IdOrder);

                    List<StudyModel> oldStudies = DB.StudiesDAO.ReadStudiesListByOrderId((long)order.IdOrder);

                    if (order.IdStatus == 1)
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

                    if (order.IdStatus == 1)
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