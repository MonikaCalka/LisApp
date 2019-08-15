using LisApp.Common;
using LisApp.Models;
using System.Collections.Generic;
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

            string langId = Language.getLang(Request);
            List<OrderModel> orderList = DB.OrderDAO.ReadOrdersList(userId, langId);

            return new CustomJsonResult { Data = new { data = orderList } };
        }

        [HttpGet]
        public ActionResult GetOrder(long id)
        {
            string langId = Language.getLang(Request);
            OrderModel order = DB.OrderDAO.ReadOrderById(id, langId);
            return new CustomJsonResult { Data = new { data = order } };
        }

        [HttpGet]
        public ActionResult GetPatientSelect()
        {
            List<SelectOption> select = DB.PatientsDAO.ReadPatientsSelect();
            return Json(select, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetProfileSelect()
        {
            string langId = Language.getLang(Request);
            List<ProfileModel> select = DB.ProfilesDAO.ReadProfilesList(langId);
            foreach (ProfileModel profile in select) {
                List<TestModel> test = DB.TestsDAO.ReadTestsList(profile.value, langId);
                profile.tests = test;
            }
            return Json(select, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetConsultantSelect()
        {
            List<SelectOption> select = DB.EmployeesDAO.ReadConsultantsSelect();
            return Json(select, JsonRequestBehavior.AllowGet);
        }
    }
}