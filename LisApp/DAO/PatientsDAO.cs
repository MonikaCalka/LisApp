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

        public PatientModel ReadPatientById(long id)
        {
            string query = $@"
                select IdPatient, FirstName, Surname, Pesel, Sex, Street, HouseNumber, City, PostalCode, Country, Phone, IdCardNumber, Insurance, 
                    ContactPersonFirstName, ContactPersonSurname, ContactPersonPesel, ContactPersonPhone
                from Patients 
                where IdPatient = {id}
            ";
            return BaseDAO.SelectFirst(query, ReadPatientModel);
        }

        public List<PatientModel> ReadPatientsList()
        {
            string query = @"
                select IdPatient, FirstName, Surname, Pesel, Sex, Street, HouseNumber, City, PostalCode, Country, Phone, IdCardNumber, Insurance, 
                    ContactPersonFirstName, ContactPersonSurname, ContactPersonPesel, ContactPersonPhone 
                from Patients
            ";

            return BaseDAO.Select(query, ReadPatientModel);
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
                Insurance = reader.GetNullableString("Insurance"),
                ContactPersonFirstName = reader.GetNullableString("ContactPersonFirstName"),
                ContactPersonSurname = reader.GetNullableString("ContactPersonSurname"),
                ContactPersonPesel = reader.GetNullableString("ContactPersonPesel"),
                ContactPersonPhone = reader.GetNullableString("ContactPersonPhone"),
                FullAddress = reader.GetString("Street") + " " + reader.GetString("HouseNumber") + ", " + reader.GetString("PostalCode") + " " + reader.GetString("City") + ", " + reader.GetString("Country")
            };
        }
    }
}