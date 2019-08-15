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

            return new CustomJsonResult { Data = new { data = order } };
        }

        public OrderModel setConsultants(OrderModel order, string langId)
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
                            DB.EmployeesDAO.InsertEmployee(cons, idOrder);
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

                    DB.OrderDAO.UpdateOrder(order);

                    if (order.IdConsultants != null)
                    {
                        foreach (long cons in order.IdConsultants)
                        {
                            DB.EmployeesDAO.InsertEmployee(cons, (long)order.IdOrder);
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