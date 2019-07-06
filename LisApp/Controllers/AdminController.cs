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
            //get Lang !!!!
            string langId = "pl";
            List<EmployeeModel> users = DB.EmployeesDAO.ReadEmployeesListForAdmin(langId);
            return Json(users, JsonRequestBehavior.AllowGet);
        }
    }
}
