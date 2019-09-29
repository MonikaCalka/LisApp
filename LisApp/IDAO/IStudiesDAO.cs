using LisApp.Models;
using System.Collections.Generic;

namespace LisApp.IDAO
{
    public interface IStudiesDAO
    {
        List<StudyModel> ReadStudiesListForDoctors(long idEmployee, string lang);
        List<StudyModel> ReadStudiesListForNurse(string lang);
        List<StudyModel> ReadStudiesListForLab(string lang);
        List<StudyModel> ReadStudiesListForPatient(long idPatient, string lang);

        StudyModel ReadStudyById(long? id, string lang);
        List<StudyModel> ReadStudiesListByOrderId(long? id);

        long? InsertStudy(StudyModel study);
        void DeleteStudiesByOrder(long idOrder);
        void ChangeStudyStatus(long IdStudy, long IdStatus);
        void UpdateStudy(StudyModel study);
        void SetReorederDataOfStudy(StudyModel study);

        List<StudyModel> ReadNotVerifiedStudiesListByOrderId(long id);
    }
}