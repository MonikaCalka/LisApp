using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LisApp.Models
{
    public class EmployeeModel
    {
        public long IdEmployee { get; set; }

        public long IdPosition { get; set; }

        public DictionaryModel Position { get; set; }

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

        public string Email { get; set; }
        
        public DateTime DateOfEmployment { get; set; }

        public DateTime? DateOfLaying { get; set; }

        public string LicenseNumber { get; set; }

        public DictionaryModel Ward { get; set; }
    }
}
