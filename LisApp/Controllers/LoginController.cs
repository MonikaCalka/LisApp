using LisApp.Common;
using LisApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LisApp.Controllers
{
    public class LoginController : CustomController
    {
        [HttpPost]
        public ActionResult Login(UserModel user)
        {
            if (user != null)
            {
                try
                {
                    UserModel userModel = DB.UserDAO.ReadUser(user.Login, user.Password);

                    if (userModel != null)
                    {
                        string token = Convert.ToBase64String(Guid.NewGuid().ToByteArray());

                        SessionModel session = new SessionModel();
                        session.IdUser = (long) userModel.IdUser;
                        session.Token = token;
                        session.ExpirationDate = DateTime.Now.AddHours(6);
                        DB.SessionsDAO.InsertSession(session);

                        return Json(token);
                    }
                    else
                        return new HttpStatusCodeResult(404);
                }
                catch (Exception ex)
                {
                    return new HttpStatusCodeResult(400);
                }
            }
            else
                return new HttpStatusCodeResult(400);
        }
    }
}