﻿using LisApp.Common;
using LisApp.IDAO;
using LisApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LisApp.DAO
{
    public class PatientsDAO : IPatientsDAO
    {
        public void CreatePatient(PatientModel patient)
        {
            throw new NotImplementedException();
        }

        public PatientModel ReadPatientById(long? id)
        {
            string query = $@"
                select p.IdPatient, p.FirstName, p.Surname, p.Pesel, p.Sex, p.Street, p.HouseNumber, p.City, p.PostalCode, p.Country, p.Phone, p.IdCardNumber,
                    p.ContactPersonFirstName, p.ContactPersonSurname, p.ContactPersonPesel, p.ContactPersonPhone, u.Login
                from Patients p
                join Users u on p.IdPatient = u.IdPatient
                where p.IdPatient = {id}
            ";
            return BaseDAO.SelectFirst(query, ReadPatientModel);
        }

        public PatientModel ReadPatientByUserId(long? idUser)
        {
            string query = $@"
                select p.IdPatient, p.FirstName, p.Surname, p.Pesel, p.Sex, p.Street, p.HouseNumber, p.City, p.PostalCode, p.Country, p.Phone, p.IdCardNumber,
                    p.ContactPersonFirstName, p.ContactPersonSurname, p.ContactPersonPesel, p.ContactPersonPhone, u.Login
                from Patients p
                join Users u on p.IdPatient = u.IdPatient
                where u.IdUser = {idUser}
            ";
            return BaseDAO.SelectFirst(query, ReadPatientModel);
        }

        public List<PatientModel> ReadPatientsList()
        {
            string query = @"
                select p.IdPatient, p.FirstName, p.Surname, p.Pesel, p.Sex, p.Street, p.HouseNumber, p.City, p.PostalCode, p.Country, p.Phone, p.IdCardNumber,
                    p.ContactPersonFirstName, p.ContactPersonSurname, p.ContactPersonPesel, p.ContactPersonPhone, u.Login
                from Patients p
                join Users u on p.IdPatient = u.IdPatient
            ";

            return BaseDAO.Select(query, ReadPatientModel);
        }

        public long? InsertPatient(PatientModel p)
        {
            string query = $@"
                insert into Patients(FirstName, Surname, Pesel, Sex, Street, HouseNumber, City, PostalCode, Country, Phone, IdCardNumber,
                    ContactPersonFirstName, ContactPersonSurname, ContactPersonPesel, ContactPersonPhone) 
                    output INSERTED.IdPatient
                    values({BaseDAO.SetString(p.FirstName)},{BaseDAO.SetString(p.Surname)},{BaseDAO.SetString(p.Pesel)},{BaseDAO.SetString(p.Sex)},
                    {BaseDAO.SetString(p.Street)},{BaseDAO.SetString(p.HouseNumber)},{BaseDAO.SetString(p.City)},{BaseDAO.SetString(p.PostalCode)},
                    {BaseDAO.SetString(p.Country)},{BaseDAO.SetString(p.Phone)},{BaseDAO.SetString(p.IdCardNumber)},
                    {BaseDAO.SetString(p.ContactPersonFirstName)},{BaseDAO.SetString(p.ContactPersonSurname)},{BaseDAO.SetString(p.ContactPersonPesel)},
                    {BaseDAO.SetString(p.ContactPersonPhone)});
            ";
            return BaseDAO.InsertOrUpdate(query, true);
        }

        public void UpdatePatient(PatientModel p)
        {
            string query = $@"
                update Patients set FirstName={BaseDAO.SetString(p.FirstName)}, Surname={BaseDAO.SetString(p.Surname)}, Pesel={BaseDAO.SetString(p.Pesel)}, 
                Sex={BaseDAO.SetString(p.Sex)}, Street={BaseDAO.SetString(p.Street)}, HouseNumber={BaseDAO.SetString(p.HouseNumber)}, City={BaseDAO.SetString(p.City)}, 
                PostalCode={BaseDAO.SetString(p.PostalCode)}, Country={BaseDAO.SetString(p.Country)}, Phone={BaseDAO.SetString(p.Phone)}, IdCardNumber={BaseDAO.SetString(p.IdCardNumber)}, 
                ContactPersonFirstName={BaseDAO.SetString(p.ContactPersonFirstName)}, ContactPersonSurname={BaseDAO.SetString(p.ContactPersonSurname)}, 
                ContactPersonPesel={BaseDAO.SetString(p.ContactPersonPesel)}, ContactPersonPhone={BaseDAO.SetString(p.ContactPersonPhone)}
                where IdPatient={p.IdPatient}
            ";
            BaseDAO.InsertOrUpdate(query, false);
        }

        public void InsertHistoryDataOfPatient(PatientModel p, string user)
        {
            string query = $@"
                insert into HistoryPersonalData(FirstName, Surname, Pesel, Sex, Street, HouseNumber, City, PostalCode, Country, Phone, IdCardNumber, 
                    ContactPersonFirstName, ContactPersonSurname, ContactPersonPesel, ContactPersonPhone, IdPatient, DateOfChange, UserOfChange) 
                    values({BaseDAO.SetString(p.FirstName)},{BaseDAO.SetString(p.Surname)},{BaseDAO.SetString(p.Pesel)},{BaseDAO.SetString(p.Sex)},
                    {BaseDAO.SetString(p.Street)},{BaseDAO.SetString(p.HouseNumber)},{BaseDAO.SetString(p.City)},{BaseDAO.SetString(p.PostalCode)},
                    {BaseDAO.SetString(p.Country)},{BaseDAO.SetString(p.Phone)},{BaseDAO.SetString(p.IdCardNumber)},
                    {BaseDAO.SetString(p.ContactPersonFirstName)},{BaseDAO.SetString(p.ContactPersonSurname)},{BaseDAO.SetString(p.ContactPersonPesel)},
                    {BaseDAO.SetString(p.ContactPersonPhone)},{p.IdPatient},{BaseDAO.SetDate(DateTime.Now)},{BaseDAO.SetString(user)});
            ";
            BaseDAO.InsertOrUpdate(query, false);
        }

        public List<PatientModel> ReadPatientsSelect()
        {
            string query = @"
                select IdPatient, FirstName, Surname, Pesel 
                from Patients
            ";

            return BaseDAO.Select(query, ReadPatientSelect);
        }

        private PatientModel ReadPatientModel(CustomReader reader)
        {
            return new PatientModel()
            {
                IdPatient = reader.GetLong("IdPatient"),
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
                IdCardNumber = reader.GetNullableString("IdCardNumber"),
                ContactPersonFirstName = reader.GetNullableString("ContactPersonFirstName"),
                ContactPersonSurname = reader.GetNullableString("ContactPersonSurname"),
                ContactPersonPesel = reader.GetNullableString("ContactPersonPesel"),
                ContactPersonPhone = reader.GetNullableString("ContactPersonPhone"),
                FullAddress = reader.GetString("Street") + " " + reader.GetString("HouseNumber") + ", " + reader.GetString("PostalCode") + " " + reader.GetString("City") + ", " + reader.GetString("Country"),
                Login = reader.GetString("Login")
            };
        }

        private PatientModel ReadPatientSelect(CustomReader reader)
        {
            return new PatientModel()
            {
                value = reader.GetLong("IdPatient"),
                label = reader.GetLong("IdPatient") + " - " + reader.GetString("FirstName") + " " + reader.GetString("Surname") + "\n" + reader.GetString("Pesel")
            };
        }
    }
}