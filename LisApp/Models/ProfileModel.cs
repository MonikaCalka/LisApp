using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LisApp.Models
{
    public class ProfileModel
    {
        public long value { get; set; } //IdProfile

        public string label { get; set; } //Name

        public string Code { get; set; }

        public bool Permament { get; set; }

        public List<TestModel> tests { get; set; }
        
    }
}