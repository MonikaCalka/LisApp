using LisApp.Common;
using LisApp.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace LisApp.Controllers
{
    public class AdminController : CustomController
    {
        protected IDatabaseFacade DB;
        public AdminController()
        {
            DB = new DatabaseFacade();
        }

        [HttpGet]
        public ActionResult GetUserList()
        {
            List<UserModel> users = DB.UserDAO.ReadUsersList();
            return Json(users, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetEmployeeList()
        {
            List<EmployeeModel> users = DB.EmployeesDAO.ReadEmployeesListForAdmin(Lang);
            return Json(users, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetEmployee(long id)
        {
            EmployeeModel user = DB.EmployeesDAO.ReadEmployeeById(id, Lang);
            return new CustomJsonResult { Data = new { data = user } };
        }

        [HttpPost]
        public ActionResult AddNewEmployee(EmployeeModel employee)
        {
            List<ValidationResult> results = new List<ValidationResult>();
            ValidationContext context = new ValidationContext(employee, null, null);
            if (employee != null && Validator.TryValidateObject(employee, context, results, true))
            {
                try
                {
                    long id = (long)DB.EmployeesDAO.InsertEmployee(employee);

                    UserModel user = new UserModel(id, employee.Login, employee.Login, null);

                    DB.UserDAO.InsertUser(user);

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
        public ActionResult EditEmployee(EmployeeModel employee)
        {
            List<ValidationResult> results = new List<ValidationResult>();
            ValidationContext context = new ValidationContext(employee, null, null);
            if (employee != null && employee.IdEmployee != null && Validator.TryValidateObject(employee, context, results, true))
            {
                // TO DO: LOGGED USER
                try
                {
                    EmployeeModel oldData = DB.EmployeesDAO.ReadEmployeeById(employee.IdEmployee, Lang);


                    DB.EmployeesDAO.InsertHistoryDataOfEmployee(oldData, "user");
                    DB.EmployeesDAO.UpdateEmployee(employee);
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
        public ActionResult RemoveEmployee(EmployeeModel employee)
        {
            List<ValidationResult> results = new List<ValidationResult>();
            ValidationContext context = new ValidationContext(employee, null, null);
            if (employee != null && employee.IdEmployee != null && Validator.TryValidateObject(employee, context, results, true))
            {
                // TO DO: LOGGED USER
         //       try
         //       {
                    employee.DateOfLaying = DateTime.Now;
                    UserModel user = DB.UserDAO.ReadUserByEmployeeId((long)employee.IdEmployee);
                    user.InUse = false;

                    DB.EmployeesDAO.UpdateEmployee(employee);
                    DB.UserDAO.UpdateUser(user);
                    
                    return Json("Success");
     //           }
      //          catch (Exception ex)
      //          {
     //               return Json("Error");
      //          }
            }
            else
            {
                return Json("Error");
            }
        }

    }
}
