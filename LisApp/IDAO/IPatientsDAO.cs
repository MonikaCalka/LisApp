using LisApp.Models;
using System.Collections.Generic;

namespace LisApp.IDAO
{
    public interface IPatientsDAO
    {
        void CreatePatient(PatientModel patient);

        List<PatientModel> ReadPatientsList();
        PatientModel ReadPatientById(long id);
    }
}
