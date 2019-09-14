using System;
using System.Collections.Generic;
using LisApp.IDAO;
using LisApp.Models;

namespace LisApp.DAO
{
    public class ResultsDAO : IResultsDAO
    {
        public ResultModel ReadResultById(long id)
        {
            string query = $@"
                select IdResult, IdEmployee, IdStudy, DateOfResult, Description
                from Results
                where IdResult = {id}
            ";

            return BaseDAO.SelectFirst(query, ReadResultModel);
        }

        public List<ResultModel> ReadResultsList()
        {
            string query = @"
                select IdResult, IdEmployee, IdStudy, DateOfResult, Description
                from Results
            ";

            return BaseDAO.Select(query, ReadResultModel);
        }

        public ResultModel ReadResultByStudyId(long idStudy)
        {
            string query = $@"
                select IdResult, IdEmployee, IdStudy, DateOfResult, Description
                from Results
                where IdStudy = {idStudy}
            ";

            return BaseDAO.SelectFirst(query, ReadResultModel);
        }

        public long? InsertResult(ResultModel r)
        {
            string query = $@"
                insert into Results(IdEmployee, IdStudy, DateOfResult, Description) 
                    output INSERTED.IdResult
                    values({r.IdEmployee},{r.IdStudy},{BaseDAO.SetDate(DateTime.Now)},
                    {BaseDAO.SetString(r.Description)});
            ";
            return BaseDAO.InsertOrUpdate(query, true);
        }

        private ResultModel ReadResultModel(CustomReader reader)
        {
            return new ResultModel()
            {
                IdResult = reader.GetLong("IdResult"),
                IdEmployee = reader.GetLong("IdEmployee"),
                IdStudy = reader.GetLong("IdStudy"),
                DateOfResult = reader.GetDate("DateOfResult"),
                Description = reader.GetNullableString("Description")
            };
        }
    }
}
