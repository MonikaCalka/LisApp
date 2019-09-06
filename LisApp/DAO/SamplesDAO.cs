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
                select s.IdSample, s.IdEmployee, s.IdStudy, s.DateOfCollection, s.Code, e.FirstName, e.Surname
                from Samples s
                join Employees e on s.IdEmployee = e.IdEmployee
                where IdSample = {id}
            ";

            return BaseDAO.SelectFirst(query, ReadSampleModel);
        }

        public SampleModel ReadSampleByStudyId(long id)
        {
            string query = $@"
                select s.IdSample, s.IdEmployee, s.IdStudy, s.DateOfCollection, s.Code, e.FirstName, e.Surname
                from Samples s
                join Employees e on s.IdEmployee = e.IdEmployee
                where IdStudy = {id}
            ";

            return BaseDAO.SelectFirst(query, ReadSampleModel);
        }

        public List<SampleModel> ReadSamplesList()
        {
            string query = @"
                select s.IdSample, s.IdEmployee, s.IdStudy, s.DateOfCollection, s.Code, e.FirstName, e.Surname
                from Samples s
                join Employees e on s.IdEmployee = e.IdEmployee
            ";

            return BaseDAO.Select(query, ReadSampleModel);
        }

        public long? InsertSample(SampleModel s)
        {
            string query = $@"
                insert into Samples(IdStudy, IdEmployee, DateOfCollection) 
                    output INSERTED.IdSample
                    values({s.IdStudy}, {s.IdEmployee},{BaseDAO.SetDate(DateTime.Now)} )  ;
            ";
            return BaseDAO.InsertOrUpdate(query, true);
        }

        public void UpdateSample(SampleModel s)
        {
            string query = $@"
                update Samples set Code={BaseDAO.SetString(s.Code)}
                where IdSample={s.IdSample}
            ";
            BaseDAO.InsertOrUpdate(query, false);
        }

        private SampleModel ReadSampleModel(CustomReader reader)
        {

            return new SampleModel
            {
                IdSample = reader.GetLong("IdSample"),
                IdEmployee = reader.GetLong("IdEmployee"),
                EmployeeName = reader.GetString("FirstName") + " " + reader.GetString("Surname"),
                IdStudy = reader.GetLong("IdStudy"),
                DateOfCollection = reader.GetDate("DateOfCollection"),
                Code = reader.GetString("Code")
            };
        }
    }
}