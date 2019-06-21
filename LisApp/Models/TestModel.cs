using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LisApp.Models
{
    public class TestModel
    {
        public long IdTest { get; set; }

        public long IdProfile { get; set; }

        public ProfileModel Profile { get; set; }

        public string Code { get; set; }

        public double NormMinM { get; set; }

        public double NormMaxM { get; set; }

        public double NormMinF { get; set; }

        public double NormMaxF { get; set; }

        public string Name { get; set; }
    }
}