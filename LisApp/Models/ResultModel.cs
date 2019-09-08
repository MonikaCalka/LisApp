using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LisApp.Models
{
    public class ResultModel
    {
        public long? IdResult { get; set; }

        public long IdEmployee { get; set; }

        public string EmployeeName { get; set; }

        public long IdStudy { get; set; }

        public DateTime DateOfResult { get; set; }

        public string Description { get; set; }

        public string ReasonForRepeat { get; set; }

        public bool Actual { get; set; }

        public List<ResultUnitModel> ResultUnitList { get; set; }

        public VerificationModel Verification { get; set; }

    }
}