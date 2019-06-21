using LisApp.Models;
using System.Collections.Generic;

namespace LisApp.IDAO
{
    public interface IProfilesDAO
    {
        List<ProfileModel> ReadProfilesList(string lang);
        ProfileModel ReadProfileById(long? id, string lang);
    }
}
