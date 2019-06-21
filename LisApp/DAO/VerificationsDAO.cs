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
        public VerificationModel ReadVerificationById(long id)
        {
            string query = $@"
                select IdVerification, IdResult, IdEmployee, DateOfVerification, Description
                from Verifications
                where IdVerification = {id}
            ";

            return BaseDAO.SelectFirst(query, ReadVerificationModel);
        }

        public VerificationModel ReadVerificationByResultId(long id)
        {
            string query = $@"
                select IdVerification, IdResult, IdEmployee, DateOfVerification, Description
                from Verifications
                where IdResult = {id}
            ";

            return BaseDAO.SelectFirst(query, ReadVerificationModel);
        }

        public List<VerificationModel> ReadVerificationsList()
        {
            string query = @"
                select IdVerification, IdResult, IdEmployee, DateOfVerification, Description
                from Verifications
            ";

            return BaseDAO.Select(query, ReadVerificationModel);
        }

        private VerificationModel ReadVerificationModel(CustomReader reader)
        {
            return new VerificationModel()
            {
                IdVerification = reader.GetLong("IdVerification"),
                IdResult = reader.GetLong("IdResult"),
                IdEmployee = reader.GetLong("IdEmployee"),
                DateOfVerification = reader.GetDate("DateOfVerification"),
                Description = reader.GetString("Description")
            };
        }
    }
}