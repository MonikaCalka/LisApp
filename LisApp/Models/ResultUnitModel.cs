using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LisApp.Models
{
    public class ResultUnitModel
    {
        public long? IdResultUnit { get; set; }

        public long IdOrderedTest { get; set; }

        public TestModel OrderedTest { get; set; }

        public long IdResult { get; set; }

        public double Value { get; set; }
    }
}