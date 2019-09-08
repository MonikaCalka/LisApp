using LisApp.Models;
using System.Collections.Generic;

namespace LisApp.IDAO
{
    public interface IResultUnitsDAO
    {
        List<ResultUnitModel> ReadResultUnitsList();
        ResultUnitModel ReadResultUnitModelById(long id);
        List<ResultUnitModel> ReadResultUnitModelByResultId(long id);

        void InsertResultUnit(ResultUnitModel r);
    }
}
