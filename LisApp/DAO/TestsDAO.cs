using LisApp.IDAO;
using LisApp.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;

namespace LisApp.DAO
{
    public class TestsDAO : ITestsDAO
    {
        public TestModel ReadTestById(long id, string lang)
        {
            string query = $@"
                select t.IdTest, t.IdProfile, t.Code, t.NormMinM, t.NormMaxM, t.NormMinF, t.NormMaxF, tr.Name as Name, t.Unit
                from Tests t
                join TestTranslations tr on t.IdTest = tr.IdTest
                join Languages l on tr.IdLanguage = l.IdLanguage
                where t.IdTest = {id} and l.code = '{lang}'
            ";

            return BaseDAO.SelectFirst(query, ReadSimpleTestModel);
        }

        public List<TestModel> ReadTestsList(long idProfile, string lang)
        {
            string query = $@"
                select t.IdTest, t.IdProfile, t.Code, t.NormMinM, t.NormMaxM, t.NormMinF, t.NormMaxF, tr.Name as Name, t.Unit
                from Tests t
                join TestTranslations tr on t.IdTest = tr.IdTest
                join Languages l on tr.IdLanguage = l.IdLanguage
                where l.code = '{lang}' and t.IdProfile = {idProfile}
                order by tr.Name
            ";

            return BaseDAO.Select(query, ReadSimpleTestModel);
        }

        public List<TestModel> ReadOrderedTestsList(long idStudy, string lang)
        {
            string query = $@"
                select t.IdTest, t.IdProfile, t.Code, t.NormMinM, t.NormMaxM, t.NormMinF, t.NormMaxF, tr.Name as Name, t.Unit
                from Tests t 
                join OrderedTests o on t.IdTest = o.IdTest
                join TestTranslations tr on t.IdTest = tr.IdTest
                join Languages l on tr.IdLanguage = l.IdLanguage
                where o.IdStudy = {idStudy} and l.code = '{lang}'
            ";

            return BaseDAO.Select(query, ReadSimpleTestModel);
        }

        public TestModel ReadOrderedTestById(long idOrderedTest, string lang)
        {
            string query = $@"
                select t.IdTest, t.IdProfile, t.Code, t.NormMinM, t.NormMaxM, t.NormMinF, t.NormMaxF, tr.Name as Name, t.Unit
                from Tests t 
                join OrderedTests o on t.IdTest = o.IdTest
                join TestTranslations tr on t.IdTest = tr.IdTest
                join Languages l on tr.IdLanguage = l.IdLanguage
                where o.IdOrderedTest= {idOrderedTest} and l.code = '{lang}'
            ";

            return BaseDAO.SelectFirst(query, ReadSimpleTestModel);
        }

        public List<TestModel> ReadFullOrderedTestByStudyId(long idStudy, string lang)
        {
            string query = $@"
                select t.IdTest, t.IdProfile, t.Code, t.NormMinM, t.NormMaxM, t.NormMinF, t.NormMaxF, tr.Name as Name, t.Unit, ru.Value as Result, o.IdOrderedTest
                from Tests t 
                join OrderedTests o on t.IdTest = o.IdTest
                join TestTranslations tr on t.IdTest = tr.IdTest
                join Languages l on tr.IdLanguage = l.IdLanguage
                left join ResultUnits ru on o.IdOrderedTest = ru.IdOrderedTests
                where o.IdStudy= {idStudy} and l.code = '{lang}'
            ";

            return BaseDAO.Select(query, ReadOrderedTestModel);
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

        private TestModel ReadSimpleTestModel(CustomReader reader) {

            return new TestModel
            {
                IdTest = reader.GetLong("IdTest"),
                value = reader.GetLong("IdTest"),
                IdProfile = reader.GetLong("IdProfile"),
                Code = reader.GetString("Code"),
                NormMinM = reader.GetDouble("NormMinM"),
                NormMaxM = reader.GetDouble("NormMaxM"),
                NormMinF = reader.GetDouble("NormMinF"),
                NormMaxF = reader.GetDouble("NormMaxF"),
                Name = reader.GetString("Name"),
                label = reader.GetString("Name"),
                Unit = reader.GetNullableString("Unit")
            };
        }

        private long ReadOrderedTestId(CustomReader reader)
        {
            return reader.GetLong("IdTest");
        }

        private TestModel ReadTestModel(CustomReader reader)
        {
            NumberFormatInfo provider = new NumberFormatInfo();
            provider.NumberDecimalSeparator = ".";
            return new TestModel
            {
                IdTest = reader.GetLong("IdTest"),
                IdProfile = reader.GetLong("IdProfile"),
                Code = reader.GetString("Code"),
                NormMinM = reader.GetDouble("NormMinM"),
                NormMaxM = reader.GetDouble("NormMaxM"),
                NormMinF = reader.GetDouble("NormMinF"),
                NormMaxF = reader.GetDouble("NormMaxF"),
                Name = reader.GetString("Name"),
                Unit = reader.GetNullableString("Unit"),
                Result = Convert.ToString(reader.GetNullableDouble("Result"), provider)
            };
        }

        private TestModel ReadOrderedTestModel(CustomReader reader)
        {
            NumberFormatInfo provider = new NumberFormatInfo();
            provider.NumberDecimalSeparator = ".";
            return new TestModel
            {
                IdTest = reader.GetLong("IdTest"),
                IdProfile = reader.GetLong("IdProfile"),
                Code = reader.GetString("Code"),
                NormMinM = reader.GetDouble("NormMinM"),
                NormMaxM = reader.GetDouble("NormMaxM"),
                NormMinF = reader.GetDouble("NormMinF"),
                NormMaxF = reader.GetDouble("NormMaxF"),
                Name = reader.GetString("Name"),
                Unit = reader.GetNullableString("Unit"),
                Result = Convert.ToString(reader.GetNullableDouble("Result"),provider),
                IdOrderedTest = reader.GetNullableLong("IdOrderedTest")
            };
        }
    }
}