using LisApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LisApp.Models
{
    public class StudyModel
    {
        public long? IdStudy { get; set; }

        public long IdProfile { get; set; }

        public string Profile { get; set; }

        public long IdEmployee { get; set; }

        public string EmployeeName { get; set; }

        public EmployeeModel Employee { get; set; }

        public long IdOrder { get; set; }

        public long IdStatus { get; set; }

        public string Status { get; set; }

        public long? IdPriority { get; set; }

        public string Priority { get; set; }

        public DateTime DateOfStudy { get; set; }

        public List<TestModel> OrderedTest { get; set; }

        public List<long> IdTests { get; set; }

        public SampleModel Sample { get; set; }

        public ResultModel Result { get; set; }

        public string Patient { get; set; }

        public long? IdPatient { get; set; }

        public DateTime DateOfOrder { get; set; }

    }
}