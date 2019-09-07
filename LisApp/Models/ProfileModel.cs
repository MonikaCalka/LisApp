using LisApp.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LisApp.Models
{
    public class ProfileModel : SelectOption
    {
        public long IdProfile { get; set; } 

        public string Name { get; set; } 

        public string Code { get; set; }

        public bool Permament { get; set; }

        public List<TestModel> tests { get; set; }
        
    }
}