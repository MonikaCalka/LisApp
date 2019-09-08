using System.Collections.Generic;
using LisApp.Models;

namespace LisApp.IDAO
{
    public interface IVerificationsDAO
    {
        VerificationModel ReadVerificationByResultId(long id);
        void InsertVerify(VerificationModel v);
    }
}
