using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LisApp.Models
{
    public class EmployeeModel
    {
        public long? IdEmployee { get; set; }

        public long IdPosition { get; set; }

        public string Position { get; set; }

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

        public long? IdWard { get; set; }

        public string Ward { get; set; }

        public string Login { get; set; }

        public string FullAddress { get; set; }
    }
}
