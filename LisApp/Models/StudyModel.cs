using LisApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LisApp.Models
{
    public class StudyModel
    {
        public long IdStudy { get; set; }

        public long IdProfile { get; set; }

        public ProfileModel Profile { get; set; }

        public long IdEmployee { get; set; }

        public EmployeeModel Employee { get; set; }

        public long IdOrder { get; set; }

        public long IdStatus { get; set; }

        public DictionaryModel Status { get; set; }

        public DateTime DateOfStudy { get; set; }

        public List<TestModel> OrderedTest { get; set; }

        public SampleModel Sample { get; set; }

        public ResultModel Result { get; set; }
    }
}