﻿using LisApp.Models;
using System.Collections.Generic;

namespace LisApp.IDAO
{
    public interface IUserDAO
    {
        List<UserModel> ReadUsersList();
        UserModel ReadUserById(long id);

        UserModel ReadUserByEmployeeId(long employeeId);

        void InsertUser(UserModel u);

        void UpdateUser(UserModel u);

        UserModel ReadUser(string login, string password);

        UserModel checkLogin(string login);
    }
}
