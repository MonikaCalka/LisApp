using LisApp.Models;
using System.Collections.Generic;

namespace LisApp.IDAO
{
    public interface IEmployeesDAO
    {
        List<EmployeeModel> ReadEmployeesList();
        EmployeeModel ReadEmployeeById(long id);

        List<EmployeeModel> ReadConsultantsList(long idOrder);
    }
}
