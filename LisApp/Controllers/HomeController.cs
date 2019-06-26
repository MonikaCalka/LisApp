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
            List<OrderModel> orderList = DB.OrderDAO.ReadOrdersList(1, "pl");
            JsonResult js = Json(orderList, JsonRequestBehavior.AllowGet);

            List<StudyModel> studyList = DB.StudiesDAO.ReadStudiesList("pl");
            JsonResult js2 = Json(studyList, JsonRequestBehavior.AllowGet);

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