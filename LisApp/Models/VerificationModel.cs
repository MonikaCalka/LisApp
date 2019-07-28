using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LisApp.Models
{
    public class VerificationModel
    {
        public long? IdVerification { get; set; }

        public long IdResult { get; set; }

        public long IdEmployee { get; set; }

        public EmployeeModel Employee { get; set; }

        public DateTime DateOfVerification { get; set; }

        public string Description { get; set; }

    }
}