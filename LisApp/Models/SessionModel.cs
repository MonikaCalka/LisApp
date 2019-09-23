using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LisApp.Models
{
    public class SessionModel
    {
        public long? IdSession { get; set; }

        public string Token { get; set; }

        public DateTime ExpirationDate { get; set; }

        public long IdUser { get; set; }

        public bool? InUse { get; set; }
    }
}