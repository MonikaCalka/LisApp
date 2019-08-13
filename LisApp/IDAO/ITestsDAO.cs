using LisApp.Models;
using System.Collections.Generic;

namespace LisApp.IDAO
{
    public interface ITestsDAO
    {
        List<TestModel> ReadTestsList(long idProfile, string lang);
        TestModel ReadTestById(long id, string lang);

        List<TestModel> ReadOrderedTestsList(long idStudy, string lang);
        TestModel ReadOrderedTestById(long idOrderedTest, string lang);
    }
}