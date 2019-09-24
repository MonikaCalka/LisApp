using LisApp.Common;
using System;
using System.ComponentModel.DataAnnotations;

namespace LisApp.Models
{
    public class PatientModel : SelectOption
    {
        public long? IdPatient { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public string Surname { get; set; }

        [Required]
        [StringLength(11)]
        [RegularExpression("^(([0-9]{4}[0-3][0-9]{6})|NN|([1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9]))$")]
        public string Pesel { get; set; }

        [Required]
        [StringLength(1)]
        public string Sex { get; set; }

        [Required]
        [StringLength(50)]
        public string Street { get; set; }

        [Required]
        [StringLength(15)]
        public string HouseNumber { get; set; }

        [Required]
        [StringLength(50)]
        public string City { get; set; }

        [Required]
        [StringLength(15)]
        public string PostalCode { get; set; }

        [Required]
        [StringLength(50)]
        public string Country { get; set; }

        [Required]
        [StringLength(9)]
        [RegularExpression("^(([0-9]*|NN))$")]
        public string Phone { get; set; }

        [StringLength(50)]
        public string IdCardNumber { get; set; }

        [StringLength(50)]
        public string ContactPersonFirstName { get; set; }

        [StringLength(50)]
        public string ContactPersonSurname { get; set; }

        [StringLength(11)]
        [RegularExpression("^(([0-9]{4}[0-3][0-9]{6}))$")]
        public string ContactPersonPesel { get; set; }

        [StringLength(9)]
        [RegularExpression("^([0-9]{9})$")]
        public string ContactPersonPhone { get; set; }

        public string FullAddress { get; set; }
    }
}