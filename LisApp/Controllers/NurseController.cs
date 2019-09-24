using LisApp.Common;
using LisApp.Enums;
using LisApp.Models;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace LisApp.Controllers
{
    public class NurseController : CustomController
    {
        [HttpGet]
        public ActionResult GetOrderList()
        {
            ActionResult wrongAuthorization = checkEmployeeAutorization((long)PositionTypeEnum.Nurse);
            if (wrongAuthorization != null)
                return wrongAuthorization;

            List<OrderModel> orderList = DB.OrderDAO.ReadOrdersListForNurse(Lang);
            return new CustomJsonResult { Data = new { data = orderList } };
        }

        [HttpGet]
        public ActionResult GetOrder(long id)
        {
            ActionResult wrongAuthorization = checkEmployeeAutorization((long)PositionTypeEnum.Nurse);
            if (wrongAuthorization != null)
                return wrongAuthorization;

            OrderModel order = DB.OrderDAO.ReadSimpleOrderById(id, Lang);
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
            ActionResult wrongAuthorization = checkEmployeeAutorization((long)PositionTypeEnum.Nurse);
            if (wrongAuthorization != null)
                return wrongAuthorization;

            List<StudyModel> studies = DB.StudiesDAO.ReadStudiesListForNurse(Lang);
            return new CustomJsonResult { Data = new { data = studies } };
        }

        [HttpGet]
        public ActionResult GetStudy(long id)
        {
            ActionResult wrongAuthorization = checkEmployeeAutorization((long)PositionTypeEnum.Nurse);
            if (wrongAuthorization != null)
                return wrongAuthorization;

            StudyModel study = GetStudyById(id);
            return new CustomJsonResult { Data = new { data = study } };
        }

        private StudyModel GetStudyById(long id)
        {
            StudyModel study = DB.StudiesDAO.ReadStudyById(id, Lang);
            if (study.IdStatus != (long)StatusTypeEnum.Ordered && study.IdStatus != (long)StatusTypeEnum.TakenSample)
                return null;

            if (study.IdStatus == (long)StatusTypeEnum.TakenSample)
                study.Sample = DB.SamplesDAO.ReadSampleByStudyId((long)study.IdStudy);

            return study;
        }

        [HttpPost]
        public ActionResult RegisterSample(StudyModel study)
        {
            ActionResult wrongAuthorization = checkEmployeeAutorization((long)PositionTypeEnum.Nurse);
            if (wrongAuthorization != null)
                return wrongAuthorization;

            if (study != null)
            {
                try
                {
                    EmployeeModel employee = getEmployeeByUserId((long)IdUser);
                    SampleModel sample = new SampleModel();
                    sample.IdEmployee = (long)employee.IdEmployee;
                    sample.IdStudy = (long)study.IdStudy;
                    sample.DateOfCollection = DateTime.Now;

                    long idSample = (long)DB.SamplesDAO.InsertSample(sample);
                    sample.Code = study.IdOrder + "-" + study.IdStudy + "-" + idSample;
                    sample.IdSample = idSample;
                    DB.SamplesDAO.UpdateSample(sample);

                    DB.OrderDAO.ChangeOrderStatus(study.IdOrder, (long)StatusTypeEnum.InProgress);
                    DB.StudiesDAO.ChangeStudyStatus((long)study.IdStudy, (long)StatusTypeEnum.TakenSample);

                    study = GetStudyById((long)study.IdStudy);
                    return new CustomJsonResult { Data = new { data = study } };
                }
                catch (Exception)
                {
                    return throwBadRequest();
                }
            }
            return throwValidateError();
        }
    }
}