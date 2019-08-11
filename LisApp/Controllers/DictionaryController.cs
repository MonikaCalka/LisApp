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
            string langId = Language.getLang(Request);
            List<DictionaryModel> positions = DB.DictionaryDAO.ReadDictionaryListByType(DictionaryTypesEnum.Positions, langId);
            return Json(positions, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetWardDic()
        {
            string langId = Language.getLang(Request);
            List<DictionaryModel> positions = DB.DictionaryDAO.ReadDictionaryListByType(DictionaryTypesEnum.Ward, langId);
            return Json(positions, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetPrioritydDic()
        {
            string langId = Language.getLang(Request);
            List<DictionaryModel> positions = DB.DictionaryDAO.ReadDictionaryListByType(DictionaryTypesEnum.Priorities, langId);
            return Json(positions, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetStatusDic()
        {
            string langId = Language.getLang(Request);
            List<DictionaryModel> positions = DB.DictionaryDAO.ReadDictionaryListByType(DictionaryTypesEnum.Status, langId);
            return Json(positions, JsonRequestBehavior.AllowGet);
        }
    }
}