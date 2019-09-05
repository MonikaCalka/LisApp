﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LisApp.Models
{
    public class HistoryPersonalData
    {
        public long IdHistoryPersonalData { get; set; }

        public string FirstName { get; set; }

        public string Surname { get; set; }

        public string Pesel { get; set; }

        public string Sex { get; set; }

        public string Street { get; set; }

        public string HouseNumber { get; set; }

        public string City { get; set; }

        public string PostalCode { get; set; }

        public string Country { get; set; }

        public string Phone { get; set; }

        public string IdCardNumber { get; set; }

        public string ContactPersonFirstName { get; set; }

        public string ContactPersonSurname { get; set; }

        public string ContactPersonPesel { get; set; }

        public string ContactPersonPhone { get; set; }

        public string Email { get; set; }

        public string LicenseNumber { get; set; }

        public long IdPatient { get; set; }

        public long IdEmployee { get; set; }

        public DateTime DateOfChange { get; set; }

        public string UserOfChange { get; set; }
    }
}