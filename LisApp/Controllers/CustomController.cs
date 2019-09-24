using LisApp.Common;
using LisApp.Enums;
using LisApp.Models;
using System;
using System.Collections.Specialized;
using System.Net;
using System.Web.Mvc;

namespace LisApp.Controllers
{
    public class CustomController : Controller
    {
        protected IDatabaseFacade DB;
        protected long? IdUser
        {
            get
            {
                NameValueCollection headers = Request.Headers;
                string[] allKeys = headers.AllKeys;
                foreach (string key in allKeys)
                {
                    if (key.Equals("Token"))
                    {
                        string[] values = headers.GetValues(key);
                        SessionModel session = DB.SessionsDAO.ReadSessionByToken(values[0]);
                        if (session != null)
                            return session.IdUser;
                    }
                }
                return null;
            }
        }

        protected string Lang
        {
            get
            {
                NameValueCollection headers = Request.Headers;
                string[] allKeys = headers.AllKeys;
                foreach (string key in allKeys)
                {
                    if (key.Equals("Lang"))
                    {
                        string[] values = headers.GetValues(key);
                        return values[0];
                    }
                }
                return null;
            }
        }

        public CustomController()
        {
            DB = new DatabaseFacade();
        }

        public EmployeeModel getEmployeeByUserId(long idUser)
        {
            return DB.EmployeesDAO.ReadEmployeeByUserId(IdUser, Lang);
        }
        public PatientModel getPatientByUserId(long idUser)
        {
            return DB.PatientsDAO.ReadPatientByUserId(IdUser);
        }

        public ActionResult checkUser()
        {
            if (IdUser == null)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { message = "Authorization failed", description = "Nobody is logged in" }, JsonRequestBehavior.AllowGet);
            }
            else
                return null;
        }

        public ActionResult checkEmployee()
        {
            if (checkUser() == null)
            {
                EmployeeModel employee = getEmployeeByUserId((long)IdUser);
                if (employee == null || employee.IdEmployee == null)
                {
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    return Json(new { message = "Authorization failed", description = "Is not employee" }, JsonRequestBehavior.AllowGet);
                }
                return null;
            }
            else
                return checkUser();
        }

        public ActionResult checkEmployeeAutorization(long position)
        {
            if (checkUser() == null)
            {
                EmployeeModel employee = getEmployeeByUserId((long)IdUser);
                if (employee == null || employee.IdEmployee == null || employee.IdPosition != position)
                {
                    Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    return Json(new { message = "Authorization failed", description = "Not authorized - wrong position" }, JsonRequestBehavior.AllowGet);
                }
                return null;
            }
            else
                return checkUser();
        }

        public ActionResult throwBadRequest()
        {
            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { message = "Error", description = "Bad request" }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult throwValidateError()
        {
            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { message = "Validation Error", description = "Incorrect data or incomplete model." }, JsonRequestBehavior.AllowGet);
        }

        private bool correctPesel(string pesel, string sex)
        {
            char[] chars = pesel.ToCharArray();
            if (!(Char.GetNumericValue(chars[4]) >= 0 && Char.GetNumericValue(chars[4]) <= 3))
                return false;
            if ((Char.GetNumericValue(chars[9]) % 2 == 0 && sex == "M") || (Char.GetNumericValue(chars[9]) % 2 != 0 && sex == "F"))
                return false;
            int sum = 0;
            int[] weights = new int[10] { 1, 3, 7, 9, 1, 3, 7, 9, 1, 3 };
            for (int i = 0; i < chars.Length - 1; i++)
            {
                int charWithWeight = (int)Char.GetNumericValue(chars[i]) * weights[i];
                sum += charWithWeight % 10;
            }
            int endChar = 10 - (sum % 10);
            if (Char.GetNumericValue(chars[10]) != endChar)
                return false;
            return true;
        }

        public ActionResult checkPesel(string pesel, string sex)
        {
            bool validPesel = correctPesel(pesel, sex);
            if (!validPesel)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { message = "Wrong pesel", description = "Incorrect pesel." }, JsonRequestBehavior.AllowGet);
            }
            else
                return null;
        }
    }
}