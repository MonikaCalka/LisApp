﻿using LisApp.Common;
using LisApp.Enums;
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
                    EmployeeModel employee = DB.EmployeesDAO.ReadEmployeeByUserId(userModel.IdUser, "en");

                    if (userModel != null)
                    {
                        string t = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
                        string token = t.Replace("+", "xj3FFv").Replace("/", "3d66aS").Replace("=", "66Tsdo4").Replace(" ","88rDrf");

                        SessionModel session = new SessionModel();
                        session.IdUser = (long)userModel.IdUser;
                        session.Token = token;
                        session.ExpirationDate = DateTime.Now.AddHours(6);
                        DB.SessionsDAO.InsertSession(session);
                        session.Login = userModel.Login;
                        if (employee != null)
                            session.UserType = DB.DictionaryDAO.ReadDictionaryById(DictionaryTypesEnum.Positions, employee.IdPosition, "en").label;
                        else
                            session.UserType = "Patient";

                        return Json(session);
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

        [HttpPost]
        public ActionResult Logout()
        {
            if (IdUser != null)
                DB.SessionsDAO.SetNotUseSession((long)IdUser);

            return new HttpStatusCodeResult(200);
        }
    }
}