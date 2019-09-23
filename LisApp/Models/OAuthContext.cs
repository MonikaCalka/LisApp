using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LisApp.Models
{
    public class OAuthContext : IdentityDbContext<IdentityUser>
    {
        public OAuthContext()
            : base("OAuthContext", throwIfV1Schema: false)
        {
        }

        public static OAuthContext Create()
        {
            return new OAuthContext();
        }
    }
}