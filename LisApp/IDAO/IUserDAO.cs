using LisApp.Models;
using System.Collections.Generic;

namespace LisApp.IDAO
{
    public interface IUserDAO
    {
        List<UserModel> ReadUsersList();
        UserModel ReadUserById(long id);
    }
}
