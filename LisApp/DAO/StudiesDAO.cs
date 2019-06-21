using LisApp.IDAO;
using LisApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LisApp.DAO
{
    public class StudiesDAO : IStudiesDAO
    {
        public StudyModel ReadStudyById(long? id)
        {
            string query = $@"
                select IdStudy, IdProfile, IdEmployee, IdOrder, IdStatus, DateOfStudy
                from Studies
                where IdStudy = {id}
            ";

            return BaseDAO.SelectFirst(query, ReadStudyModel);
        }

        public List<StudyModel> ReadStudiesList()
        {
            string query = @"
                select IdStudy, IdProfile, IdEmployee, IdOrder, IdStatus, DateOfStudy
                from Studies
            ";

            return BaseDAO.Select(query, ReadStudyModel);
        }

        public List<StudyModel> ReadStudiesListByOrderId(long? id)
        {
            string query = $@"
                select IdStudy, IdProfile, IdEmployee, IdOrder, IdStatus, DateOfStudy
                from Studies
                where IdOrder = {id}
            ";

            return BaseDAO.Select(query, ReadStudyModel);
        }

        private StudyModel ReadStudyModel(CustomReader reader)
        {
            return new StudyModel()
            {
                IdStudy = reader.GetLong("IdStudy"),
                IdProfile = reader.GetLong("IdProfile"),
                IdEmployee = reader.GetLong("IdEmployee"),
                IdOrder = reader.GetLong("IdOrder"),
                IdStatus = reader.GetLong("IdStatus"),
                DateOfStudy = reader.GetDate("DateOfStudy")
            };
        }
    }
}