using LisApp.Models;
using System.Collections.Generic;

namespace LisApp.IDAO
{
    public interface IStudiesDAO
    {
        List<StudyModel> ReadStudiesListForDoctors(long idEmployee, string lang);
        List<StudyModel> ReadStudiesListForNurse(string lang);
        List<StudyModel> ReadStudiesListForLab(string lang);
        StudyModel ReadStudyById(long? id);
        List<StudyModel> ReadStudiesListByOrderId(long? id);
    }
}