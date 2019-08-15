using System;
using System.Collections.Generic;
using LisApp.Enums;
using LisApp.IDAO;
using LisApp.Models;
using LisApp.Common;

namespace LisApp.DAO
{
    class EmployeesDAO : IEmployeesDAO
    {
        public EmployeeModel ReadEmployeeById(long? id, string lang)
        {
            string query = $@"
                select e.IdEmployee, e.IdPosition, pt.Name as Position, e.FirstName, e.Surname, e.Pesel, e.Sex, e.Street, e.HouseNumber, e.City, e.PostalCode, e.Country, 
                    e.Phone, e.Email, e.DateOfEmployment, e.DateOfLaying, e.LicenseNumber, e.IdWard, wt.Name as Ward, u.Login
                from Employees e
                join Users u
                on e.IdEmployee = u.IdEmployee
                left join Wards w on e.IdWard = w.IdWard
                full join WardTranslations wt on w.IdWard = wt.Idward
                join Positions p on e.IdPosition = p.IdPosition
                join PositionTranslations pt on p.IdPosition = pt.IdPosition
                where e.IdEmployee = {id} 
                    and (w.IdWard is null or wt.IdLanguage = (select l1.IdLanguage from Languages l1 where l1.Code = '{lang}'))
                    and pt.IdLanguage = (select l2.IdLanguage from Languages l2 where l2.Code = '{lang}')
            ";

            return BaseDAO.SelectFirst(query, ReadEmployeeModelForAdmin);
        }

        //public List<EmployeeModel> ReadEmployeesList(string lang)
        //{
        //    string query = $@"
        //        select e.IdEmployee, e.IdPosition, e.FirstName, e.Surname, e.Pesel, e.Sex, e.Street, e.HouseNumber, e.City, e.PostalCode, e.Country, 
        //            e.Phone, e.Email, e.DateOfEmployment, e.DateOfLaying, e.LicenseNumber, e.IdWard, wt.Name as Ward
        //        from Employees
        //        join Wards w on e.IdWard = w.IdWard
        //        join WardTranslations wt on w.IdWard = wt.Idward
        //        where wt.IdLanguage = (select l1.IdLanguage from Languages l1 where l1.Code = '{lang}')
        //    ";

        //    return BaseDAO.Select(query, ReadEmployeeModel);
        //}

        public List<EmployeeModel> ReadEmployeesListForAdmin(string lang)
        {
            string query = $@"
                select e.IdEmployee, e.IdPosition, pt.Name as Position, e.FirstName, e.Surname, e.Pesel, e.Sex, e.Street, e.HouseNumber, e.City, e.PostalCode, e.Country, 
                    e.Phone, e.Email, e.DateOfEmployment, e.DateOfLaying, e.LicenseNumber, e.IdWard, wt.Name as Ward, u.Login
                from Employees e 
                join Users u
                on e.IdEmployee = u.IdEmployee
                left join Wards w on e.IdWard = w.IdWard
                full join WardTranslations wt on w.IdWard = wt.Idward
                join Positions p on e.IdPosition = p.IdPosition
                join PositionTranslations pt on p.IdPosition = pt.IdPosition
                where (w.IdWard is null or wt.IdLanguage = (select l1.IdLanguage from Languages l1 where l1.Code = '{lang}'))
                    and pt.IdLanguage = (select l2.IdLanguage from Languages l2 where l2.Code = '{lang}')
                    and u.InUse = 1;
            ";

            return BaseDAO.Select(query, ReadEmployeeModelForAdmin);
        }

        public List<SelectOption> ReadConsultantsSelect()
        {
            string query = @"
                select e.IdEmployee, e.FirstName, e.Surname
                from Employees e
                join Positions p on e.IdPosition = p.IdPosition
                where p.IdPosition = 1;
            ";

            return BaseDAO.Select(query, ReadPatientSelect);
        }

        public List<EmployeeModel> ReadConsultantsList(long idOrder, string lang)
        {
            string query = $@"
                select e.IdEmployee, e.IdPosition, e.FirstName, e.Surname, e.Phone, e.Email, e.IdWard, wt.Name as Ward
                from Employees e join Consultants c on e.IdEmployee = c.IdEmployee 
                left join Wards w on e.IdWard = w.IdWard
                full join WardTranslations wt on w.IdWard = wt.Idward
                where c.IdOrder = {idOrder}
                    and (w.IdWard is null or wt.IdLanguage = (select l1.IdLanguage from Languages l1 where l1.Code = '{lang}'))
            ";

            return BaseDAO.Select(query, ReadSimpleEmployeeModel);
        }

        public long? InsertEmployee(EmployeeModel e)
        {
            string query = $@"
                insert into Employees(FirstName, Surname, Pesel, Sex, Street, HouseNumber, City, PostalCode, Country, Phone, IdPosition, Email, DateOfEmployment, LicenseNumber, IdWard) 
                    output INSERTED.IdEmployee
                    values({BaseDAO.SetString(e.FirstName)},{BaseDAO.SetString(e.Surname)},{BaseDAO.SetString(e.Pesel)},{BaseDAO.SetString(e.Sex)},
                    {BaseDAO.SetString(e.Street)},{BaseDAO.SetString(e.HouseNumber)},{BaseDAO.SetString(e.City)},{BaseDAO.SetString(e.PostalCode)},
                    {BaseDAO.SetString(e.Country)},{BaseDAO.SetString(e.Phone)},{e.IdPosition},{BaseDAO.SetString(e.Email)},
                    {BaseDAO.SetDate(DateTime.Now)},{BaseDAO.SetString(e.LicenseNumber)},{BaseDAO.SetNullableLong(e.IdWard)})  ;
            ";
            return BaseDAO.InsertOrUpdate(query, true);
        }

        public void UpdateEmployee(EmployeeModel e)
        {
            string query = $@"
                update Employees set FirstName={BaseDAO.SetString(e.FirstName)}, Surname={BaseDAO.SetString(e.Surname)}, Pesel={BaseDAO.SetString(e.Pesel)}, 
                Sex={BaseDAO.SetString(e.Sex)}, Street={BaseDAO.SetString(e.Street)}, HouseNumber={BaseDAO.SetString(e.HouseNumber)}, City={BaseDAO.SetString(e.City)}, 
                PostalCode={BaseDAO.SetString(e.PostalCode)}, Country={BaseDAO.SetString(e.Country)}, Phone={BaseDAO.SetString(e.Phone)}, IdPosition={e.IdPosition}, 
                Email={BaseDAO.SetString(e.Email)}, LicenseNumber={BaseDAO.SetString(e.LicenseNumber)}, IdWard={BaseDAO.SetNullableLong(e.IdWard)}
                where IdEmployee={e.IdEmployee}
            ";
            BaseDAO.InsertOrUpdate(query, false);
        }

        public void InsertHistoryDataOfEmployee(EmployeeModel e, string user)
        {
            string query = $@"
                insert into HistoryPersonalData(FirstName, Surname, Pesel, Sex, Street, HouseNumber, City, PostalCode, Country, Phone, 
                Email, LicenseNumber, IdEmployee, DateOfChange, UserOfChange) 
                    values({BaseDAO.SetString(e.FirstName)},{BaseDAO.SetString(e.Surname)},{BaseDAO.SetString(e.Pesel)},{BaseDAO.SetString(e.Sex)},
                    {BaseDAO.SetString(e.Street)},{BaseDAO.SetString(e.HouseNumber)},{BaseDAO.SetString(e.City)},{BaseDAO.SetString(e.PostalCode)},
                    {BaseDAO.SetString(e.Country)},{BaseDAO.SetString(e.Phone)}, {BaseDAO.SetString(e.Email)}, {BaseDAO.SetString(e.LicenseNumber)},
                    {e.IdEmployee}, {BaseDAO.SetDate(DateTime.Now)},{BaseDAO.SetString(user)});
            ";
            BaseDAO.InsertOrUpdate(query, false);
        }

        //private EmployeeModel ReadEmployeeModel(CustomReader reader)
        //{
        //    return new EmployeeModel()
        //    {
        //        IdEmployee = reader.GetLong("IdEmployee"),
        //        IdPosition = reader.GetLong("IdPosition"),
        //        FirstName = reader.GetString("FirstName"),
        //        Surname = reader.GetString("Surname"),
        //        Pesel = reader.GetString("Pesel"),
        //        Sex = reader.GetString("Sex"),
        //        Street = reader.GetString("Street"),
        //        HouseNumber = reader.GetString("HouseNumber"),
        //        City = reader.GetString("City"),
        //        PostalCode = reader.GetString("PostalCode"),
        //        Country = reader.GetString("Country"),
        //        Phone = reader.GetString("Phone"),
        //        Email = reader.GetNullableString("Email"),
        //        DateOfEmployment = reader.GetDate("DateOfEmployment"),
        //        DateOfLaying = reader.GetNullableDate("DateOfLaying"),
        //        LicenseNumber = reader.GetNullableString("LicenseNumber"),
        //        IdWard = reader.GetNullableLong("IdWard"),
        //        Ward = reader.GetNullableString("Ward")
        //    };
        //}

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
                IdWard = reader.GetNullableLong("IdWard"),
                Ward = reader.GetNullableString("Ward"),
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
                IdWard = reader.GetNullableLong("IdWard"),
                Ward = reader.GetNullableString("Ward")
            };
        }

        private SelectOption ReadPatientSelect(CustomReader reader)
        {
            return new SelectOption()
            {
                value = reader.GetLong("IdEmployee"),
                label = reader.GetLong("IdEmployee") + " - " + reader.GetString("FirstName") + " " + reader.GetString("Surname")
            };
        }
    }
}
