using LisApp.Common;
using LisApp.Models;
using System.Collections.Generic;
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
            string langId = Language.getLang(Request);
            List<EmployeeModel> users = DB.EmployeesDAO.ReadEmployeesListForAdmin(langId);
            return Json(users, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetEmployee(long id)
        {
            string langId = Language.getLang(Request);
            EmployeeModel user = DB.EmployeesDAO.ReadEmployeeById(id, langId);
            return new CustomJsonResult { Data = new { data = user } };
        }
        
    }
}
