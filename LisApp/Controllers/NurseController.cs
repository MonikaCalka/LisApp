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

        [HttpGet]
        public ActionResult GetStudyList()
        { 
            string langId = Language.getLang(Request);
            List<StudyModel> studies = DB.StudiesDAO.ReadStudiesListForNurse(langId);
            return new CustomJsonResult { Data = new { data = studies } };
        }

        [HttpGet]
        public ActionResult GetStudy(long id)
        {
            StudyModel study = GetStudyById(id);
            return new CustomJsonResult { Data = new { data = study } };
        }

        private StudyModel GetStudyById(long id)
        {
            string langId = Language.getLang(Request);
            StudyModel study = DB.StudiesDAO.ReadStudyById(id, langId);
            if(study.IdStatus != 1 && study.IdStatus != 7)
            {
                return null;
            }

            if (study.IdStatus == 7) //pobrana próbka
            {
                study.Sample = DB.SamplesDAO.ReadSampleByStudyId((long)study.IdStudy);
            }
            return study;
        }

        [HttpPost]
        public ActionResult RegisterSample(StudyModel study)
        {
            if (study != null )
            {
                try
                {
                    // get User !!!
                    long employeeId = 1;
                    SampleModel sample = new SampleModel();
                    sample.IdEmployee = employeeId;
                    sample.IdStudy = (long)study.IdStudy;
                    
                    long idSample = (long)DB.SamplesDAO.InsertSample(sample);
                    sample.Code = study.IdOrder + "-" + study.IdStudy + "-" + idSample;
                    sample.IdSample = idSample;
                    DB.SamplesDAO.UpdateSample(sample);

                    DB.OrderDAO.ChangeOrderStatus(study.IdOrder, 3);
                    DB.StudiesDAO.ChangeStudyStatus((long)study.IdStudy, 7);

                    study = GetStudyById((long)study.IdStudy);
                    return new CustomJsonResult { Data = new { data = study } };
                }
                catch (Exception ex)
                {
                    return Json("Error");
                }
            }
            else
            {
                return Json("Error");
            }
        }
    }
}