using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace LisApp.Models
{
    public class OrderModel
    {
        public long? IdOrder { get; set; }

        [Required]
        public long IdPatient { get; set; }

        public PatientModel Patient { get; set; }

        public long IdEmployee { get; set; }

        public String EmployeeName { get; set; }

        public long? IdWard { get; set; }

        public string Ward { get; set; }

        [StringLength(100)]
        public string Institution { get; set; }

        public string Comment { get; set; }

        public DateTime DateOfOrder { get; set; }

        public DateTime? DateOfReceived { get; set; }

        public long IdStatus { get; set; }

        public string Status { get; set; }

        [Required]
        public long IdPriority { get; set; }

        public string Priority { get; set; }

        public List<long> IdConsultants { get; set; }

        public List<StudyModel> Studies { get; set; }

        public String PatientName { get; set; }
    }
}