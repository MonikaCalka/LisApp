using LisApp.Common;
using System.Web.Mvc;

namespace LisApp.Controllers
{
    public class CustomController : Controller
    {
        //tu to co ma być w każdym controllerze
        protected IDatabaseFacade DB;

        public CustomController()
        {
            DB = new DatabaseFacade();
        }
    }
}