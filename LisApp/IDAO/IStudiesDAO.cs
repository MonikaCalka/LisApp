using LisApp.Models;
using System.Collections.Generic;

namespace LisApp.IDAO
{
    public interface IStudiesDAO
    {
        List<StudyModel> ReadStudiesList();
        StudyModel ReadStudyById(long? id);
        List<StudyModel> ReadStudiesListByOrderId(long? id);
    }
}