using LisApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LisApp.Controllers
{
    public class NurseController : CustomController
    {
        [HttpGet]
        public JsonResult GetOrderList()
        {
            string langId = "pl";
            List<OrderModel> orderList = DB.OrderDAO.ReadOrdersListForNurse(langId);

            return Json(orderList, JsonRequestBehavior.AllowGet);
        }
    }
}