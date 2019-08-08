using LisApp.Common;
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
        [HttpGet]
        public JsonResult GetOrderList()
        {
            // get User !!!
            long userId = 1;
            //get Lang !!!!
            string langId = Language.getLang(Request);
            List<OrderModel> orderList = DB.OrderDAO.ReadOrdersList(userId, langId);

            return new CustomJsonResult { Data = new { data = orderList } };
        }
    }
}