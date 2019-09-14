using LisApp.IDAO;
using LisApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LisApp.DAO
{
    public class VerificationsDAO : IVerificationsDAO
    {
        public VerificationModel ReadVerificationByResultId(long id)
        {
            string query = $@"
                select v.IdVerification, v.IdResult, v.IdEmployee, v.DateOfVerification, v.Description, e.FirstName, e.Surname, v.Positive
                from Verifications v
                join Employees e on v.IdEmployee = e.IdEmployee
                where IdResult = {id}
            ";

            return BaseDAO.SelectFirst(query, ReadVerificationModel);
        }

        public void InsertVerify(VerificationModel v)
        {
            string query = $@"
                insert into Verifications(IdResult, IdEmployee, DateOfVerification, Description, Positive) 
                    values({v.IdResult},{v.IdEmployee},{BaseDAO.SetDate(DateTime.Now)},{BaseDAO.SetString(v.Description)}, {BaseDAO.SetBool(v.Positive)});
            ";
            BaseDAO.InsertOrUpdate(query, false);
        }
        private VerificationModel ReadVerificationModel(CustomReader reader)
        {
            return new VerificationModel()
            {
                IdVerification = reader.GetLong("IdVerification"),
                IdResult = reader.GetLong("IdResult"),
                IdEmployee = reader.GetLong("IdEmployee"),
                DateOfVerification = reader.GetDate("DateOfVerification"),
                Description = reader.GetString("Description"),
                EmployeeName = reader.GetString("FirstName") + " " + reader.GetString("Surname"),
                Positive = reader.GetBool("Positive")
            };
        }
    }
}