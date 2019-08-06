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
            string langId = "pl";
            List<OrderModel> orderList = DB.OrderDAO.ReadOrdersList(userId, langId);

            System.Web.Script.Serialization.JavaScriptSerializer js = new System.Web.Script.Serialization.JavaScriptSerializer();
            var data = js.Serialize(orderList).Replace("\"\\/Date(", "").Replace(")\\/\"", "");

            return js.DeserializeObject(data);
        }
    }
}