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

        public UserModel ReadUserByEmployeeId(long employeeId)
        {
            string query = $@"
                select IdUser, IdEmployee, Login, Password, DateOfChange, InUse
                from Users
                where IdEmployee = {employeeId}
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

        public void InsertUser(UserModel u)
        {
            string query = $@"
                insert into Users(IdEmployee, Login, Password, DateOfChange, InUse) 
                    values({u.IdEmployee},{BaseDAO.SetString(u.Login)},{BaseDAO.SetString(u.Password)},{BaseDAO.SetDate(DateTime.Now)},1);
            ";
            BaseDAO.InsertOrUpdate(query, false);
        }

        public void UpdateUser(UserModel u)
        {
            string query = $@"
                update Users set Password = {BaseDAO.SetString(u.Password)}, DateOfChange = {BaseDAO.SetDate(DateTime.Now)}, InUse = {BaseDAO.SetBool(u.InUse)}
                where IdUser = {u.IdUser}; 
            ";
            BaseDAO.InsertOrUpdate(query, false);
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