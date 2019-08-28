using LisApp.IDAO;
using LisApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LisApp.DAO
{
    public class TestsDAO : ITestsDAO
    {
        public TestModel ReadTestById(long id, string lang)
        {
            string query = $@"
                select t.IdTest, t.IdProfile, t.Code, t.NormMinM, t.NormMaxM, t.NormMinF, t.NormMaxF, tr.Name as Name
                from Tests t
                join TestTranslations tr on t.IdTest = tr.IdTest
                join Languages l on tr.IdLanguage = l.IdLanguage
                where t.IdTest = {id} and l.code = '{lang}'
            ";

            return BaseDAO.SelectFirst(query, ReadTestModel);
        }

        public List<TestModel> ReadTestsList(long idProfile, string lang)
        {
            string query = $@"
                select t.IdTest, t.IdProfile, t.Code, t.NormMinM, t.NormMaxM, t.NormMinF, t.NormMaxF, tr.Name as Name
                from Tests t
                join TestTranslations tr on t.IdTest = tr.IdTest
                join Languages l on tr.IdLanguage = l.IdLanguage
                where l.code = '{lang}' and t.IdProfile = {idProfile}
            ";

            return BaseDAO.Select(query, ReadTestModel);
        }

        public List<TestModel> ReadOrderedTestsList(long idStudy, string lang)
        {
            string query = $@"
                select t.IdTest, t.IdProfile, t.Code, t.NormMinM, t.NormMaxM, t.NormMinF, t.NormMaxF, tr.Name as Name
                from Tests t 
                join OrderedTests o on t.IdTest = o.IdTest
                join TestTranslations tr on t.IdTest = tr.IdTest
                join Languages l on tr.IdLanguage = l.IdLanguage
                where o.IdStudy = {idStudy} and l.code = '{lang}'
            ";

            return BaseDAO.Select(query, ReadTestModel);
        }

        public TestModel ReadOrderedTestById(long idOrderedTest, string lang)
        {
            string query = $@"
                select t.IdTest, t.IdProfile, t.Code, t.NormMinM, t.NormMaxM, t.NormMinF, t.NormMaxF, tr.Name as Name
                from Tests t 
                join OrderedTests o on t.IdTest = o.IdTest
                join TestTranslations tr on t.IdTest = tr.IdTest
                join Languages l on tr.IdLanguage = l.IdLanguage
                where o.IdOrderedTest= {idOrderedTest} and l.code = '{lang}'
            ";

            return BaseDAO.SelectFirst(query, ReadTestModel);
        }

        public List<long> ReadOrderedTestByStudyId(long idStudy)
        {
            string query = $@"
                select t.IdTest
                from Tests t 
                join OrderedTests o on t.IdTest = o.IdTest
                where o.IdStudy= {idStudy}
            ";

            return BaseDAO.Select(query, ReadOrderedTestId);
        }

        public long? InsertOrderedTest(long idStudy, long idTest)
        {
            string query = $@"
                insert into OrderedTests(IdStudy, IdTest) 
                    output INSERTED.IdOrderedTest
                    values({idStudy}, {idTest})  ;
            ";
            return BaseDAO.InsertOrUpdate(query, true);
        }

        public void DeleteOrderedTestByStudy(long idStudy)
        {
            string query = $@"
                delete OrderedTests where IdStudy = {idStudy}
            ";
            BaseDAO.InsertOrUpdate(query, false);
        }

        private TestModel ReadTestModel(CustomReader reader) {

            return new TestModel
            {
                value = reader.GetLong("IdTest"),
                IdProfile = reader.GetLong("IdProfile"),
                Code = reader.GetString("Code"),
                NormMinM = reader.GetDouble("NormMinM"),
                NormMaxM = reader.GetDouble("NormMaxM"),
                NormMinF = reader.GetDouble("NormMinF"),
                NormMaxF = reader.GetDouble("NormMaxF"),
                label = reader.GetString("Name")
            };
        }

        private long ReadOrderedTestId(CustomReader reader)
        {
            return reader.GetLong("IdTest");
        }
    }
}