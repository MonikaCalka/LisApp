using LisApp.Common;
using LisApp.Enums;
using LisApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LisApp.Controllers
{
    public class DictionaryController : CustomController
    {
        [HttpGet]
        public ActionResult GetPositionDic()
        {
            List<DictionaryModel> positions = DB.DictionaryDAO.ReadDictionaryListByType(DictionaryTypesEnum.Positions, Lang);
            return Json(positions, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetWardDic()
        {
            List<DictionaryModel> positions = DB.DictionaryDAO.ReadDictionaryListByType(DictionaryTypesEnum.Ward, Lang);
            return Json(positions, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetPriorityDic()
        {
            List<DictionaryModel> positions = DB.DictionaryDAO.ReadDictionaryListByType(DictionaryTypesEnum.Priorities, Lang);
            return Json(positions, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetStatusDic()
        {
            List<DictionaryModel> positions = DB.DictionaryDAO.ReadDictionaryListByType(DictionaryTypesEnum.Status, Lang);
            return Json(positions, JsonRequestBehavior.AllowGet);
        }
    }
}