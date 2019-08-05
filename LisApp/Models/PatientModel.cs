using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace LisApp.Models
{
    public class PatientModel
    {
        public long? IdPatient { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        [StringLength(11)]
        public string Pesel { get; set; }

        [Required]
        public string Sex { get; set; }

        [Required]
        public string Street { get; set; }

        [Required]
        public string HouseNumber { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string PostalCode { get; set; }

        [Required]
        public string Country { get; set; }

        [Required]
        public string Phone { get; set; }

        public string IdCardNumber { get; set; }

        public string Insurance { get; set; }

        public string ContactPersonFirstName { get; set; }

        public string ContactPersonSurname { get; set; }

        public string ContactPersonPesel { get; set; }

        public string ContactPersonPhone { get; set; }

        public string FullAddress { get; set; }
    }
}