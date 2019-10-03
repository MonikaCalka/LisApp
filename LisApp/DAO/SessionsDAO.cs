using LisApp.IDAO;
using LisApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LisApp.DAO
{
    public class SessionsDAO : ISessionsDAO
    {
        public SessionModel ReadSessionByToken(string token)
        {
            string query = $@"
                select IdSession, Token, ExpirationDate, IdUser, InUse
                from Sessions
                where Token = {BaseDAO.SetString(token)} and ExpirationDate > {BaseDAO.SetDate(DateTime.Now)} and InUse = 1
            ";

            return BaseDAO.SelectFirst(query, ReadSessionModel);
        }

        public void InsertSession(SessionModel s)
        {
            string query = $@"
                insert into Sessions(Token, ExpirationDate, IdUser, InUse) 
                    values({BaseDAO.SetString(s.Token)},{BaseDAO.SetDate(s.ExpirationDate)},{s.IdUser}, 1);
            ";
            BaseDAO.InsertOrUpdate(query, false);
        }

        public void SetNotUseSession(long idUser)
        {
            string query = $@"
                update Sessions set InUse = 0 
                where IdUser = {idUser}
            ";
            BaseDAO.InsertOrUpdate(query, false);
        }

        private SessionModel ReadSessionModel(CustomReader reader)
        {
            return new SessionModel()
            {
                IdSession = reader.GetLong("IdSession"),
                Token = reader.GetString("Token"),
                ExpirationDate = reader.GetDate("ExpirationDate"),
                IdUser = reader.GetLong("IdUser"),
                InUse = reader.GetNullableBool("InUse")
            };
        }
    }
}