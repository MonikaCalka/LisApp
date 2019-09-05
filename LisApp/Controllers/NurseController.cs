using LisApp.Common;
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
            string langId = Language.getLang(Request);
            List<OrderModel> orderList = DB.OrderDAO.ReadOrdersListForNurse(langId);

            return new CustomJsonResult { Data = new { data = orderList } };
        }

        [HttpGet]
        public ActionResult GetOrder(long id)
        {
            string langId = Language.getLang(Request);
            OrderModel order = DB.OrderDAO.ReadSimpleOrderById(id, langId);

            order = setStudies(order);

            return new CustomJsonResult { Data = new { data = order } };
        }

        private OrderModel setStudies(OrderModel order)
        {
            List<StudyModel> studies = DB.StudiesDAO.ReadStudiesListByOrderId(order.IdOrder);
            if (studies != null)
            {
                foreach (StudyModel study in studies)
                {
                    study.IdTests = DB.TestsDAO.ReadOrderedTestByStudyId((long)study.IdStudy);
                }
                order.Studies = studies;
            }
            return order;
        }
    }
}