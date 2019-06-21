using System.Collections.Generic;
using LisApp.Models;

namespace LisApp.IDAO
{
    public interface IVerificationsDAO
    {
        List<VerificationModel> ReadVerificationsList();
        VerificationModel ReadVerificationById(long id);
        VerificationModel ReadVerificationByResultId(long id);
    }
}
