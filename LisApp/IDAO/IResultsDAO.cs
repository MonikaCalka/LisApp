using LisApp.Models;
using System.Collections.Generic;


namespace LisApp.IDAO
{
    public interface IResultsDAO
    {
        List<ResultModel> ReadResultsList();
        ResultModel ReadResultById(long id);
    }
}
