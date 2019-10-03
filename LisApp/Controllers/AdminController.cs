using LisApp.Common;
using LisApp.Enums;
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
            ActionResult wrongAuthorization = checkEmployeeAutorization((long)PositionTypeEnum.Admin);
            if (wrongAuthorization != null)
                return wrongAuthorization;

            List<UserModel> users = DB.UserDAO.ReadUsersList();
            return Json(users, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetEmployeeList()
        {
            ActionResult wrongAuthorization = checkEmployeeAutorization((long)PositionTypeEnum.Admin);
            if (wrongAuthorization != null)
                return wrongAuthorization;

            List<EmployeeModel> users = DB.EmployeesDAO.ReadEmployeesListForAdmin(Lang);
            return Json(users, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetEmployee(long id)
        {
            ActionResult wrongAuthorization = checkEmployeeAutorization((long)PositionTypeEnum.Admin);
            if (wrongAuthorization != null)
                return wrongAuthorization;

            EmployeeModel user = DB.EmployeesDAO.ReadEmployeeById(id, Lang);
            return new CustomJsonResult { Data = new { data = user } };
        }

        [HttpPost]
        public ActionResult AddNewEmployee(EmployeeModel employee)
        {
            ActionResult wrongAuthorization = checkEmployeeAutorization((long)PositionTypeEnum.Admin);
            if (wrongAuthorization != null)
                return wrongAuthorization;

            List<ValidationResult> results = new List<ValidationResult>();
            ValidationContext context = new ValidationContext(employee, null, null);
            if (employee != null && Validator.TryValidateObject(employee, context, results, true))
            {
                ActionResult wrongPesel = checkPesel(employee.Pesel, employee.Sex);
                if (wrongPesel != null)
                    return wrongPesel;
                try
                {
                    long id = (long)DB.EmployeesDAO.InsertEmployee(employee);

                    UserModel user = new UserModel(id, createLogin(employee.FirstName, employee.Surname), 
                        DB.DictionaryDAO.ReadDictionaryById(DictionaryTypesEnum.Positions, employee.IdPosition, "pl").label, null);

                    DB.UserDAO.InsertUser(user);

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
        public ActionResult EditEmployee(EmployeeModel employee)
        {
            ActionResult wrongAuthorization = checkEmployeeAutorization((long)PositionTypeEnum.Admin);
            if (wrongAuthorization != null)
                return wrongAuthorization;

            List<ValidationResult> results = new List<ValidationResult>();
            ValidationContext context = new ValidationContext(employee, null, null);
            if (employee != null && employee.IdEmployee != null && Validator.TryValidateObject(employee, context, results, true))
            {
                ActionResult wrongPesel = checkPesel(employee.Pesel, employee.Sex);
                if (wrongPesel != null)
                    return wrongPesel;
                try
                {
                    EmployeeModel employeeChanger = getEmployeeByUserId();
                    EmployeeModel oldData = DB.EmployeesDAO.ReadEmployeeById(employee.IdEmployee, Lang);
                    DB.EmployeesDAO.InsertHistoryDataOfEmployee(oldData, employeeChanger.FirstName + employeeChanger.Surname);
                    DB.EmployeesDAO.UpdateEmployee(employee);
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
        public ActionResult RemoveEmployee(EmployeeModel employee)
        {
            ActionResult wrongAuthorization = checkEmployeeAutorization((long)PositionTypeEnum.Admin);
            if (wrongAuthorization != null)
                return wrongAuthorization;

            List<ValidationResult> results = new List<ValidationResult>();
            ValidationContext context = new ValidationContext(employee, null, null);
            if (employee != null && employee.IdEmployee != null && Validator.TryValidateObject(employee, context, results, true))
            {
                employee.DateOfLaying = DateTime.Now;
                UserModel user = DB.UserDAO.ReadUserByEmployeeId((long)employee.IdEmployee);
                user.InUse = false;

                DB.EmployeesDAO.UpdateEmployee(employee);
                DB.UserDAO.UpdateUser(user);

                return new HttpStatusCodeResult(200);
            }
            return throwValidateError();
        }
    }
}
