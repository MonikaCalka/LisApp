using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LisApp.Models
{
    public class UserModel
    {
        public long IdUser { get; set; }

        public long IdEmployee { get; set; }

        public EmployeeModel Employee { get; set; }

        public string Login { get; set; }

        public string Password { get; set; }

        public DateTime DateOfChange { get; set; }

        public bool InUse { get; set; }
    }
}