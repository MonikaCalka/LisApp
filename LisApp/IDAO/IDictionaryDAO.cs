using LisApp.Enums;
using LisApp.Models;
using System.Collections.Generic;

namespace LisApp.IDAO
{
    public interface IDictionaryDAO
    {
        List<DictionaryModel> ReadDictionaryListByType(DictionaryTypesEnum type, string lang);
        DictionaryModel ReadDictionaryById(DictionaryTypesEnum type, long? id, string lang);
    }
}
