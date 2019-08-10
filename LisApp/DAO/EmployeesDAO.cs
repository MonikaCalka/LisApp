using System.Collections.Generic;
using LisApp.Enums;
using LisApp.IDAO;
using LisApp.Models;

namespace LisApp.DAO
{
    class EmployeesDAO : IEmployeesDAO
    {
        public EmployeeModel ReadEmployeeById(long id, string lang)
        {
            string query = $@"
                select e.IdEmployee, e.IdPosition, pt.Name as Position, e.FirstName, e.Surname, e.Pesel, e.Sex, e.Street, e.HouseNumber, e.City, e.PostalCode, e.Country, 
                    e.Phone, e.Email, e.DateOfEmployment, e.DateOfLaying, e.LicenseNumber, e.IdWard, wt.Name as Ward, u.Login
                from Employees e
                join Users u
                on e.IdEmployee = u.IdEmployee
                join Wards w on e.IdWard = w.IdWard
                join WardTranslations wt on w.IdWard = wt.Idward
                join Positions p on e.IdPosition = p.IdPosition
                join PositionTranslations pt on p.IdPosition = pt.IdPosition
                where e.IdEmployee = {id} 
                    and wt.IdLanguage = (select l1.IdLanguage from Languages l1 where l1.Code = '{lang}')
                    and pt.IdLanguage = (select l2.IdLanguage from Languages l2 where l2.Code = '{lang}')
            ";

            return BaseDAO.SelectFirst(query, ReadEmployeeModel);
        }

        public List<EmployeeModel> ReadEmployeesList(string lang)
        {
            string query = $@"
                select e.IdEmployee, e.IdPosition, e.FirstName, e.Surname, e.Pesel, e.Sex, e.Street, e.HouseNumber, e.City, e.PostalCode, e.Country, 
                    e.Phone, e.Email, e.DateOfEmployment, e.DateOfLaying, e.LicenseNumber, e.IdWard, wt.Name as Ward
                from Employees
                join Wards w on e.IdWard = w.IdWard
                join WardTranslations wt on w.IdWard = wt.Idward
                where wt.IdLanguage = (select l1.IdLanguage from Languages l1 where l1.Code = '{lang}')
            ";

            return BaseDAO.Select(query, ReadEmployeeModel);
        }

        public List<EmployeeModel> ReadEmployeesListForAdmin(string lang)
        {
            string query = $@"
                select e.IdEmployee, e.IdPosition, pt.Name as Position, e.FirstName, e.Surname, e.Pesel, e.Sex, e.Street, e.HouseNumber, e.City, e.PostalCode, e.Country, 
                    e.Phone, e.Email, e.DateOfEmployment, e.DateOfLaying, e.LicenseNumber, e.IdWard, wt.Name as Ward, u.Login
                from Employees e 
                join Users u
                on e.IdEmployee = u.IdEmployee
                join Wards w on e.IdWard = w.IdWard
                join WardTranslations wt on w.IdWard = wt.Idward
                join Positions p on e.IdPosition = p.IdPosition
                join PositionTranslations pt on p.IdPosition = pt.IdPosition
                where wt.IdLanguage = (select l1.IdLanguage from Languages l1 where l1.Code = '{lang}')
                    and pt.IdLanguage = (select l2.IdLanguage from Languages l2 where l2.Code = '{lang}')
            ";

            return BaseDAO.Select(query, ReadEmployeeModelForAdmin);
        }

        public List<EmployeeModel> ReadConsultantsList(long idOrder, string lang)
        {
            string query = $@"
                select e.IdEmployee, e.IdPosition, e.FirstName, e.Surname, e.Phone, e.Email, e.IdWard, wt.Name as Ward
                from Employees e join Consultants c on e.IdEmployee = c.IdEmployee 
                join Wards w on e.IdWard = w.IdWard
                join WardTranslations wt on w.IdWard = wt.Idward
                where c.IdOrder = {idOrder}
                    and wt.IdLanguage = (select l1.IdLanguage from Languages l1 where l1.Code = '{lang}')
            ";

            return BaseDAO.Select(query, ReadSimpleEmployeeModel);
        }


        private EmployeeModel ReadEmployeeModel(CustomReader reader)
        {
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
                IdWard = reader.GetLong("IdWard"),
                Ward = reader.GetString("Ward")
            };
        }

        private EmployeeModel ReadEmployeeModelForAdmin(CustomReader reader)
        {
            return new EmployeeModel()
            {
                IdEmployee = reader.GetLong("IdEmployee"),
                IdPosition = reader.GetLong("IdPosition"),
                Position = reader.GetString("Position"),
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
                IdWard = reader.GetLong("IdWard"),
                Ward = reader.GetString("Ward"),
                Login = reader.GetString("Login"),
                FullAddress = reader.GetString("Street") + " " + reader.GetString("HouseNumber") + ", " + reader.GetString("PostalCode") + " " + reader.GetString("City")
            };
        }

        private EmployeeModel ReadSimpleEmployeeModel(CustomReader reader)
        {
            return new EmployeeModel()
            {
                IdEmployee = reader.GetLong("IdEmployee"),
                IdPosition = reader.GetLong("IdPosition"),
                FirstName = reader.GetString("FirstName"),
                Surname = reader.GetString("Surname"),
                Phone = reader.GetString("Phone"),
                Email = reader.GetNullableString("Email"),
                IdWard = reader.GetLong("IdWard"),
                Ward = reader.GetString("Ward")
            };
        }
    }
}
