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
                select IdUser, IdEmployee, Login, Password, DateOfChange, InUse, IdPatient
                from Users
                where IdUser = {id}
            ";

            return BaseDAO.SelectFirst(query, ReadUserModel);
        }

        public UserModel ReadUserByEmployeeId(long employeeId)
        {
            string query = $@"
                select IdUser, IdEmployee, Login, Password, DateOfChange, InUse, IdPatient
                from Users
                where IdEmployee = {employeeId}
            ";

            return BaseDAO.SelectFirst(query, ReadUserModel);
        }

        public UserModel ReadUser(string login, string password)
        {
            string query = $@"
                select IdUser, IdEmployee, Login, Password, DateOfChange, InUse, IdPatient
                from Users
                where Login = {BaseDAO.SetString(login)} and Password = {BaseDAO.SetString(password)}
            ";

            return BaseDAO.SelectFirst(query, ReadUserModel);
        }

        public UserModel checkLogin(string login)
        {
            string query = $@"
                select IdUser, IdEmployee, Login, Password, DateOfChange, InUse, IdPatient
                from Users
                where Login = {BaseDAO.SetString(login)}
            ";

            return BaseDAO.SelectFirst(query, ReadUserModel);
        }

        public List<UserModel> ReadUsersList()
        {
            string query = @"
                select IdUser, IdEmployee, Login, Password, DateOfChange, InUse, IdPatient
                from Users
            ";

            return BaseDAO.Select(query, ReadUserModel);
        }

        public void InsertUser(UserModel u)
        {
            string query = $@"
                insert into Users(IdEmployee, Login, Password, DateOfChange, InUse, IdPatient) 
                    values({BaseDAO.SetNullableLong(u.IdEmployee)},{BaseDAO.SetString(u.Login)},{BaseDAO.SetString(u.Password)},{BaseDAO.SetDate(DateTime.Now)},1,{BaseDAO.SetNullableLong(u.IdPatient)});
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
                IdEmployee = reader.GetNullableLong("IdEmployee"),
                Login = reader.GetString("Login"),
                Password = reader.GetString("Password"),
                DateOfChange = reader.GetDate("DateOfChange"),
                InUse = reader.GetBool("InUse"),
                IdPatient = reader.GetNullableLong("IdPatient")
            };
        }
    }
}