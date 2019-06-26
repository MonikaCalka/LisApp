using LisApp.Common;
using LisApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;

namespace LisApp.Controllers
{
    [Route("api/[controller]")]
    public class AdminController : ApiController
    {
        protected IDatabaseFacade DB;
        public AdminController()
        {
            DB = new DatabaseFacade();
        }

        [HttpGet]
        [Route("GetList")]
        public IHttpActionResult Get()
        {
            List<UserModel> users = DB.UserDAO.ReadUsersList();
            return Json(users);
        }
    }
}
