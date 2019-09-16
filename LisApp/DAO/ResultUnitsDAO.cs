using LisApp.IDAO;
using LisApp.Models;
using System.Collections.Generic;

namespace LisApp.DAO
{
    public class ResultUnitsDAO : IResultUnitsDAO
    {
        public ResultUnitModel ReadResultUnitModelById(long id)
        {
            string query = $@"
                select IdResultUnit, IdOrderedTests, IdResult, Value
                from ResultUnits
                where IdResultUnit = {id}
            ";

            return BaseDAO.SelectFirst(query, ReadResultUnitModel);
        }

        public List<ResultUnitModel> ReadResultUnitModelByResultId(long id)
        {
            string query = $@"
                select IdResultUnit, IdOrderedTests, IdResult, Value
                from ResultUnits
                where IdResult = {id}
            ";

            return BaseDAO.Select(query, ReadResultUnitModel);
        }

        public List<ResultUnitModel> ReadResultUnitsList()
        {
            string query = @"
                select IdResultUnit, IdOrderedTests, IdResult, Value
                from ResultUnits
            ";

            return BaseDAO.Select(query, ReadResultUnitModel);
        }

        public void InsertResultUnit(ResultUnitModel r)
        {
            string query = $@"
                insert into ResultUnits(IdOrderedTests, IdResult, Value) 
                    values({r.IdOrderedTest},{r.IdResult},{BaseDAO.SetNullableDouble(r.Value)});
            ";
            BaseDAO.InsertOrUpdate(query, false);
        }

        private ResultUnitModel ReadResultUnitModel(CustomReader reader)
        {
            return new ResultUnitModel
            {
                IdResultUnit = reader.GetLong("IdResultUnit"),
                IdOrderedTest = reader.GetLong("IdOrderedTests"),
                IdResult = reader.GetLong("IdResult"),
                Value = reader.GetNullableDouble("Value")
            };
        }
    }
}