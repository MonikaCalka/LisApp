﻿using LisApp.Models;
using System.Collections.Generic;

namespace LisApp.IDAO
{
    public interface ITestsDAO
    {
        List<TestModel> ReadTestsList(long idProfile, string lang);
        TestModel ReadTestById(long id, string lang);

        List<TestModel> ReadOrderedTestsList(long idStudy, string lang);
        TestModel ReadOrderedTestById(long idOrderedTest, string lang);

        long? InsertOrderedTest(long idStudy, long idTest);
        void DeleteOrderedTestByStudy(long idStudy);
        List<long> ReadOrderedTestByStudyId(long idStudy);
        List<TestModel> ReadFullOrderedTestByStudyId(long idStudy, string lang);
    }
}