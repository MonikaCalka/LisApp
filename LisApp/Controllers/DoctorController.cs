using LisApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LisApp.Controllers
{
    public class DoctorController : CustomController
    {
        public JsonResult GetOrderList()
        {
            // get User !!!
            long userId = 1;
            //get Lang !!!!
            string langId = "pl";
            List<OrderModel> orderList = DB.OrderDAO.ReadOrdersList(userId, langId);

            JsonResult js = Json(orderList, JsonRequestBehavior.AllowGet);
            return js;
        }
    }
}