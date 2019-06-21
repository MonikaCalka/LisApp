using System.Collections.Generic;
using LisApp.Enums;
using LisApp.IDAO;
using LisApp.Models;

namespace LisApp.DAO
{
    class EmployeesDAO : IEmployeesDAO
    {
        public EmployeeModel ReadEmployeeById(long id)
        {
            string query = $@"
                select IdEmployee, IdPosition, FirstName, Surname, Pesel, Sex, Street, HouseNumber, City, PostalCode, Country, 
                    Phone, Email, DateOfEmployment, DateOfLaying, LicenseNumber, IdWard
                from Employees
                where IdEmployee = {id}
            ";

            return BaseDAO.SelectFirst(query, ReadEmployeeModel);
        }

        public List<EmployeeModel> ReadEmployeesList()
        {
            string query = @"
                select IdEmployee, IdPosition, FirstName, Surname, Pesel, Sex, Street, HouseNumber, City, PostalCode, Country, 
                    Phone, Email, DateOfEmployment, DateOfLaying, LicenseNumber, IdWard
                from Employees
            ";

            return BaseDAO.Select(query, ReadEmployeeModel);
        }

        public List<EmployeeModel> ReadConsultantsList(long idOrder)
        {
            string query = $@"
                select e.IdEmployee, e.IdPosition, e.FirstName, e.Surname, e.Pesel, e.Sex, e.Street, e.HouseNumber, e.City, e.PostalCode, e.Country, 
                    e.Phone, e.Email, e.DateOfEmployment, e.DateOfLaying, e.LicenseNumber, e.IdWard
                from Employees e join Consultants c on e.IdEmployee = c.IdEmployee 
                where c.IdOrder = {idOrder}
            ";

            return BaseDAO.Select(query, ReadEmployeeModel);
        }


        private EmployeeModel ReadEmployeeModel(CustomReader reader)
        {
            IDictionaryDAO dict = new DictionaryDAO();

            return new EmployeeModel()
            {
                IdEmployee = reader.GetLong("IdEmployee"),
                IdPosition = reader.GetLong("IdPosition"),
                FirstName = reader.GetString("FirstName"),
                Surname = reader.GetString("Surname"),
                Pesel = reader.GetString("Pesel"),
                Sex = reader.GetString("Sex"),
                Street = reader.GetString("Street"),
                HouseNumber = reader.GetString("HouseNumber"),
                City = reader.GetString("City"),
                PostalCode = reader.GetString("PostalCode"),
                Country = reader.GetString("Country"),
                Phone = reader.GetString("Phone"),
                Email = reader.GetNullableString("Email"),
                DateOfEmployment = reader.GetDate("DateOfEmployment"),
                DateOfLaying = reader.GetNullableDate("DateOfLaying"),
                LicenseNumber = reader.GetNullableString("LicenseNumber"),
                Ward = dict.ReadDictionaryById(DictionaryTypesEnum.Ward, reader.GetNullableLong("IdWard"), "pl")
            };
        }
    }
}
