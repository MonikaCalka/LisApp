using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LisApp.Models
{
    public class SampleModel
    {
        public long IdSample { get; set; }

        public long IdEmployee { get; set; }

        public EmployeeModel Employee { get; set; }

        public long IdStudy { get; set; }

        public DateTime DateOfCollecion { get; set; }

        public string Code { get; set; }
    }
}