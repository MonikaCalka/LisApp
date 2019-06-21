using LisApp.IDAO;
using LisApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LisApp.DAO
{
    public class UserDAO : IUserDAO
    {
        public UserModel ReadUserById(long id)
        {
            string query = $@"
                select IdUser, IdEmployee, Login, Password, DateOfChange, InUse
                from Users
                where IdUser = {id}
            ";

            return BaseDAO.SelectFirst(query, ReadUserModel);
        }

        public List<UserModel> ReadUsersList()
        {
            string query = @"
                select IdUser, IdEmployee, Login, Password, DateOfChange, InUse
                from Users
            ";

            return BaseDAO.Select(query, ReadUserModel);
        }

        private UserModel ReadUserModel(CustomReader reader)
        {
            return new UserModel()
            {
                IdUser = reader.GetLong("IdUser"),
                IdEmployee = reader.GetLong("IdEmployee"),
                Login = reader.GetString("Login"),
                Password = reader.GetString("Password"),
                DateOfChange = reader.GetDate("DateOfChange"),
                InUse = reader.GetBool("InUse")
            };
        }
    }
}