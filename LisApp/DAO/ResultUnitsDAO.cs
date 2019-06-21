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

        private ResultUnitModel ReadResultUnitModel(CustomReader reader)
        {
            return new ResultUnitModel
            {
                IdResultUnit = reader.GetLong("IdResultUnit"),
                IdOrderedTest = reader.GetLong("IdOrderedTests"),
                IdResult = reader.GetLong("IdResult"),
                Value = reader.GetDouble("Value")
            };
        }
    }
}