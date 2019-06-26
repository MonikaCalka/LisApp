using LisApp.IDAO;
using LisApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LisApp.DAO
{
    public class StudiesDAO : IStudiesDAO
    {
        public StudyModel ReadStudyById(long? id)
        {
            string query = $@"
                select IdStudy, IdProfile, IdEmployee, IdOrder, IdStatus, DateOfStudy
                from Studies
                where IdStudy = {id}
            ";

            return BaseDAO.SelectFirst(query, ReadSimpleStudyModel);
        }

        public List<StudyModel> ReadStudiesListForDoctors(long idEmployee, String lang)
        {
            string query = $@"
                select s.IdStudy, s.IdProfile, s.IdEmployee, s.IdOrder, s.IdStatus, stt.Name as Status, s.DateOfStudy, o.IdPriority, prt.Name as Priority,
                    e.FirstName as DoctorName, e.Surname as DoctorSurname, p.IdPatient, p.FirstName as PatientName, p.Surname as PatientSurname
                from Studies s
                join Orders o
                on s.IdOrder = o.IdOrder
                join Patients p
                on o.IdPatient = p.IdPatient
                join Employees e
                on o.IdEmployee = e.IdEmployee
                join Status st
                on s.IdStatus = st.IdStatus
                join StatusTranslations stt
                on st.IdStatus = stt.IdStatus
                join Priorities pr
                on o.IdPriority = pr.IdPriority
                join PriorityTranslations prt
                on pr.IdPriority = prt.IdPriority
                where ({idEmployee} = o.IdEmployee or {idEmployee} in (select con.IdEmployee from Consultants con where con.IdOrder = o.IdOrder))
                    and st.IdLanguage = (select l2.IdLanguage from Languages l2 where l2.Code = '{lang}') 
                    and prt.IdLanguage = (select l3.IdLanguage from Languages l3 where l3.Code = '{lang}')
            ";

            return BaseDAO.Select(query, ReadStudyModel);
        }

        public List<StudyModel> ReadStudiesList(String lang)
        {
            string query = $@"
                select s.IdStudy, s.IdProfile, s.IdEmployee, s.IdOrder, s.IdStatus, stt.Name as Status, s.DateOfStudy, o.IdPriority, prt.Name as Priority,
                    e.FirstName as DoctorName, e.Surname as DoctorSurname, p.IdPatient, p.FirstName as PatientName, p.Surname as PatientSurname
                from Studies s
                join Orders o
                on s.IdOrder = o.IdOrder
                join Patients p
                on o.IdPatient = p.IdPatient
                join Employees e
                on o.IdEmployee = e.IdEmployee
                join Status st
                on s.IdStatus = st.IdStatus
                join StatusTranslations stt
                on st.IdStatus = stt.IdStatus
                join Priorities pr
                on o.IdPriority = pr.IdPriority
                join PriorityTranslations prt
                on pr.IdPriority = prt.IdPriority
                where stt.IdLanguage = (select l2.IdLanguage from Languages l2 where l2.Code = '{lang}') 
                    and prt.IdLanguage = (select l3.IdLanguage from Languages l3 where l3.Code = '{lang}')
            ";

            return BaseDAO.Select(query, ReadStudyModel);
        }

        public List<StudyModel> ReadStudiesListByOrderId(long? id)
        {
            string query = $@"
                select IdStudy, IdProfile, IdEmployee, IdOrder, IdStatus, DateOfStudy
                from Studies
                where IdOrder = {id}
            ";

            return BaseDAO.Select(query, ReadSimpleStudyModel);
        }

        private StudyModel ReadSimpleStudyModel(CustomReader reader)
        {
            return new StudyModel()
            {
                IdStudy = reader.GetLong("IdStudy"),
                IdProfile = reader.GetLong("IdProfile"),
                IdEmployee = reader.GetLong("IdEmployee"),
                IdOrder = reader.GetLong("IdOrder"),
                IdStatus = reader.GetLong("IdStatus"),
                DateOfStudy = reader.GetDate("DateOfStudy")
            };
        }

        private StudyModel ReadStudyModel(CustomReader reader)
        {
            return new StudyModel()
            {
                IdStudy = reader.GetLong("IdStudy"),
                IdProfile = reader.GetLong("IdProfile"),
                IdEmployee = reader.GetLong("IdEmployee"),
                IdOrder = reader.GetLong("IdOrder"),
                IdStatus = reader.GetLong("IdStatus"),
                DateOfStudy = reader.GetDate("DateOfStudy"),
                Status = reader.GetNullableString("Status"),
                IdPriority = reader.GetNullableLong("IdPriority"),
                Priority = reader.GetNullableString("Priority"),
                IdPatient = reader.GetNullableLong("IdPatient"),
                Patient = reader.GetNullableString("PatientName") + " " + reader.GetNullableString("PatientSurname"),
                EmployeeName = reader.GetNullableString("DoctorName") + " " + reader.GetNullableString("DoctorSurname")
            };
        }
    }
}