using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LisApp.Models
{
    public class SampleModel
    {
        public long? IdSample { get; set; }

        public long IdEmployee { get; set; }

        public string EmployeeName { get; set; }

        public long IdStudy { get; set; }

        public DateTime DateOfCollection { get; set; }

        public string Code { get; set; }
    }
}