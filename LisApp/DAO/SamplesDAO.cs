using LisApp.IDAO;
using LisApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LisApp.DAO
{
    public class SamplesDAO : ISamplesDAO
    {
        public SampleModel ReadSampleById(long id)
        {
            string query = $@"
                select IdSample, IdEmployee, IdStudy, DateOfCollection, Code
                from Samples
                where IdSample = {id}
            ";

            return BaseDAO.SelectFirst(query, ReadSampleModel);
        }

        public SampleModel ReadSampleByStudyId(long id)
        {
            string query = $@"
                select IdSample, IdEmployee, IdStudy, DateOfCollection, Code
                from Samples
                where IdStudy = {id}
            ";

            return BaseDAO.SelectFirst(query, ReadSampleModel);
        }

        public List<SampleModel> ReadSamplesList()
        {
            string query = @"
                select IdSample, IdEmployee, IdStudy, DateOfCollection, Code
                from Samples
            ";

            return BaseDAO.Select(query, ReadSampleModel);
        }

        private SampleModel ReadSampleModel(CustomReader reader)
        {

            return new SampleModel
            {
                IdSample = reader.GetLong("IdSample"),
                IdEmployee = reader.GetLong("IdEmployee"),
                IdStudy = reader.GetLong("IdStudy"),
                DateOfCollecion = reader.GetDate("DateOfCollection"),
                Code = reader.GetString("Code")
            };
        }
    }
}