using System;
using System.ComponentModel.DataAnnotations;

namespace LisApp.Models
{
    public class EmployeeModel
    {
        public long? IdEmployee { get; set; }

        [Required]
        public long IdPosition { get; set; }

        public string Position { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public string Surname { get; set; }

        [Required]
        [StringLength(11)]
        [RegularExpression("^([0-9]{11})$")]
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
        [RegularExpression("^([0-9]{9})$")]
        public string Phone { get; set; }

        [StringLength(50)]
        [EmailAddress]
        public string Email { get; set; }
        
        public DateTime DateOfEmployment { get; set; }

        public DateTime? DateOfLaying { get; set; }

        [StringLength(50)]
        public string LicenseNumber { get; set; }

        public long? IdWard { get; set; }

        public string Ward { get; set; }

        public string Login { get; set; }

        public string FullAddress { get; set; }
    }
}
