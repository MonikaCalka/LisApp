using LisApp.Models;
using System.Collections.Generic;

namespace LisApp.IDAO
{
    public interface IEmployeesDAO
    {
        List<EmployeeModel> ReadEmployeesList(string lang);
        EmployeeModel ReadEmployeeById(long id, string lang);

        List<EmployeeModel> ReadConsultantsList(long idOrder, string lang);

        List<EmployeeModel> ReadEmployeesListForAdmin(string lang);
    }
}
