using LisApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LisApp.Controllers
{
    public class HomeController : CustomController
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Doctor()
        {
            ViewBag.Message = "Your doctor page.";

            return View();
        }

        public JsonResult GetUser()
        {
            List<UserModel> users = DB.UserDAO.ReadUsersList();
            JsonResult js = Json(users, JsonRequestBehavior.AllowGet);
            return js;
        }
    }
}