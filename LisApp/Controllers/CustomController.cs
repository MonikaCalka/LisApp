using LisApp.Common;
using LisApp.Enums;
using LisApp.Models;
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
                        long user = DB.SessionsDAO.ReadSessionByToken(values[0]).IdUser;
                        return user;
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
    }
}