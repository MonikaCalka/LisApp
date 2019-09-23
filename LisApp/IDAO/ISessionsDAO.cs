using LisApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LisApp.IDAO
{
    public interface ISessionsDAO
    {
        SessionModel ReadSessionByToken(string token);
        void InsertSession(SessionModel s);
        void SetNotUseSession(SessionModel s);
    }
}