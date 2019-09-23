using LisApp.Common;
using LisApp.Models;
using System.Collections.Generic;

namespace LisApp.IDAO
{
    public interface IEmployeesDAO
    {
      //  List<EmployeeModel> ReadEmployeesList(string lang);
        EmployeeModel ReadEmployeeById(long? id, string lang);

        List<EmployeeModel> ReadConsultantsList(long idOrder, string lang);

        List<EmployeeModel> ReadEmployeesListForAdmin(string lang);

        long? InsertEmployee(EmployeeModel e);

        void UpdateEmployee(EmployeeModel e);

        void InsertHistoryDataOfEmployee(EmployeeModel e, string user);

        List<SelectOption> ReadConsultantsSelect();

        long? InsertConsultant(long idEmployee, long idOrder);
        void DeleteConsultantsByOrder(long idOrder);

        EmployeeModel ReadEmployeeByStudyId(long? idStudy, string lang);

        EmployeeModel ReadEmployeeByUserId(long? idUser, string lang);
    }
}
