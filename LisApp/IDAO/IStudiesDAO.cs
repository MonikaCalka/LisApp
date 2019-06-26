using LisApp.Models;
using System.Collections.Generic;

namespace LisApp.IDAO
{
    public interface IStudiesDAO
    {
        List<StudyModel> ReadStudiesList(string lang);
        List<StudyModel> ReadStudiesListForDoctors(long idEmployee, string lang);
        StudyModel ReadStudyById(long? id);
        List<StudyModel> ReadStudiesListByOrderId(long? id);
    }
}