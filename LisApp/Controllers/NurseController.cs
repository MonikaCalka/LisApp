using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LisApp.Controllers
{
    public class NurseController : CustomController
    {



        // GET: Nurse
        public ActionResult Index()
        {
            return View();
        }
    }
}