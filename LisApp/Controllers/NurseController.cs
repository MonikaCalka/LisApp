﻿using LisApp.Common;
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
            string langId = Language.getLang(Request);
            StudyModel study = DB.StudiesDAO.ReadStudyById(id, langId);
            if (study.IdStatus == 7) //pobrana próbka
            {
                study.Sample = DB.SamplesDAO.ReadSampleByStudyId((long) study.IdStudy);
            }
            return new CustomJsonResult { Data = new { data = study } };
        }
    }
}