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
        public StudyModel ReadStudyById(long? id, string lang)
        {
            string query = $@"
                select s.IdStudy, s.IdProfile, s.IdEmployee, s.IdOrder, s.IdStatus, stt.Name as Status, s.DateOfStudy, o.IdPriority, prt.Name as Priority,
                    e.FirstName as DoctorName, e.Surname as DoctorSurname, p.IdPatient, p.FirstName as PatientName, p.Surname as PatientSurname, o.DateOfOrder, pft.Name as Profile
                from Studies s
                join Orders o on s.IdOrder = o.IdOrder
                join Patients p on o.IdPatient = p.IdPatient
                join Employees e on o.IdEmployee = e.IdEmployee
                join Status st on s.IdStatus = st.IdStatus
                join StatusTranslations stt on st.IdStatus = stt.IdStatus
                join Priorities pr on o.IdPriority = pr.IdPriority
                join PriorityTranslations prt on pr.IdPriority = prt.IdPriority
                join Profiles pf on s.IdProfile = pf.IdProfile
                join ProfileTranslations pft on pf.IdProfile = pft.IdProfile
                where stt.IdLanguage = (select l1.IdLanguage from Languages l1 where l1.Code = '{lang}') 
                    and prt.IdLanguage = (select l2.IdLanguage from Languages l2 where l2.Code = '{lang}')
                    and pft.IdLanguage = (select l3.IdLanguage from Languages l3 where l3.Code = '{lang}')
                    and IdStudy = {id}
            ";

            return BaseDAO.SelectFirst(query, ReadStudyModel);
        }

        public List<StudyModel> ReadStudiesListForDoctors(long idEmployee, string lang)
        {
            string query = $@"
                select s.IdStudy, s.IdProfile, s.IdEmployee, s.IdOrder, s.IdStatus, stt.Name as Status, s.DateOfStudy, o.IdPriority, prt.Name as Priority,
                    e.FirstName as DoctorName, e.Surname as DoctorSurname, p.IdPatient, p.FirstName as PatientName, p.Surname as PatientSurname, o.DateOfOrder, pft.Name as Profile
                from Studies s
                join Orders o on s.IdOrder = o.IdOrder
                join Patients p on o.IdPatient = p.IdPatient
                join Employees e on o.IdEmployee = e.IdEmployee
                join Status st on s.IdStatus = st.IdStatus
                join StatusTranslations stt on st.IdStatus = stt.IdStatus
                join Priorities pr on o.IdPriority = pr.IdPriority
                join PriorityTranslations prt on pr.IdPriority = prt.IdPriority
                join Profiles pf on s.IdProfile = pf.IdProfile
                join ProfileTranslations pft on pf.IdProfile = pft.IdProfile
                where ({idEmployee} = o.IdEmployee or {idEmployee} in (select con.IdEmployee from Consultants con where con.IdOrder = o.IdOrder))
                    and stt.IdLanguage = (select l1.IdLanguage from Languages l1 where l1.Code = '{lang}') 
                    and prt.IdLanguage = (select l2.IdLanguage from Languages l2 where l2.Code = '{lang}')
                    and pft.IdLanguage = (select l3.IdLanguage from Languages l3 where l3.Code = '{lang}')
            ";

            return BaseDAO.Select(query, ReadStudyModel);
        }

        public List<StudyModel> ReadStudiesListForNurse(string lang)
        {
            string query = $@"
                select s.IdStudy, s.IdProfile, s.IdEmployee, s.IdOrder, s.IdStatus, stt.Name as Status, s.DateOfStudy, o.IdPriority, prt.Name as Priority,
                    e.FirstName as DoctorName, e.Surname as DoctorSurname, p.IdPatient, p.FirstName as PatientName, p.Surname as PatientSurname, o.DateOfOrder, pft.Name as Profile
                from Studies s
                join Orders o on s.IdOrder = o.IdOrder
                join Patients p on o.IdPatient = p.IdPatient
                join Employees e on o.IdEmployee = e.IdEmployee
                join Status st on s.IdStatus = st.IdStatus
                join StatusTranslations stt on st.IdStatus = stt.IdStatus
                join Priorities pr on o.IdPriority = pr.IdPriority
                join PriorityTranslations prt on pr.IdPriority = prt.IdPriority
                join Profiles pf on s.IdProfile = pf.IdProfile
                join ProfileTranslations pft on pf.IdProfile = pft.IdProfile
                where stt.IdLanguage = (select l1.IdLanguage from Languages l1 where l1.Code = '{lang}') 
                    and prt.IdLanguage = (select l2.IdLanguage from Languages l2 where l2.Code = '{lang}')
                    and pft.IdLanguage = (select l3.IdLanguage from Languages l3 where l3.Code = '{lang}')
                    and IdStatus in (1)
            ";

            return BaseDAO.Select(query, ReadStudyModel);
        }

        public List<StudyModel> ReadStudiesListForLab(string lang)
        {
            string query = $@"
                select s.IdStudy, s.IdProfile, s.IdEmployee, s.IdOrder, s.IdStatus, stt.Name as Status, s.DateOfStudy, o.IdPriority, prt.Name as Priority,
                    e.FirstName as DoctorName, e.Surname as DoctorSurname, p.IdPatient, p.FirstName as PatientName, p.Surname as PatientSurname, o.DateOfOrder, pft.Name as Profile
                from Studies s
                join Orders o on s.IdOrder = o.IdOrder
                join Patients p on o.IdPatient = p.IdPatient
                join Employees e on o.IdEmployee = e.IdEmployee
                join Status st on s.IdStatus = st.IdStatus
                join StatusTranslations stt on st.IdStatus = stt.IdStatus
                join Priorities pr on o.IdPriority = pr.IdPriority
                join PriorityTranslations prt on pr.IdPriority = prt.IdPriority
                join Profiles pf on s.IdProfile = pf.IdProfile
                join ProfileTranslations pft on pf.IdProfile = pft.IdProfile
                where stt.IdLanguage = (select l1.IdLanguage from Languages l1 where l1.Code = '{lang}') 
                    and prt.IdLanguage = (select l2.IdLanguage from Languages l2 where l2.Code = '{lang}')
                    and pft.IdLanguage = (select l3.IdLanguage from Languages l3 where l3.Code = '{lang}')
                    and s.IdStatus in (7, 3, 4)
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

        public long? InsertStudy(StudyModel study)
        {
            string query = $@"
                insert into Studies(IdOrder, IdProfile, IdStatus) 
                    output INSERTED.IdStudy
                    values({study.IdOrder}, {study.IdProfile}, 1 )  ;
            ";
            return BaseDAO.InsertOrUpdate(query, true);
        }

        public void DeleteStudiesByOrder(long idOrder)
        {
            string query = $@"
                delete Studies where IdOrder = {idOrder}
            ";
            BaseDAO.InsertOrUpdate(query, false);
        }

        private StudyModel ReadSimpleStudyModel(CustomReader reader)
        {
            return new StudyModel()
            {
                IdStudy = reader.GetLong("IdStudy"),
                IdProfile = reader.GetNullableLong("IdProfile"),
                IdEmployee = reader.GetNullableLong("IdEmployee"),
                IdOrder = reader.GetLong("IdOrder"),
                IdStatus = reader.GetLong("IdStatus"),
                DateOfStudy = reader.GetNullableDate("DateOfStudy")
            };
        }

        private StudyModel ReadStudyModel(CustomReader reader)
        {
            return new StudyModel()
            {
                IdStudy = reader.GetLong("IdStudy"),
                IdProfile = reader.GetNullableLong("IdProfile"),
                IdEmployee = reader.GetNullableLong("IdEmployee"),
                IdOrder = reader.GetLong("IdOrder"),
                IdStatus = reader.GetLong("IdStatus"),
                DateOfStudy = reader.GetNullableDate("DateOfStudy"),
                Status = reader.GetNullableString("Status"),
                IdPriority = reader.GetNullableLong("IdPriority"),
                Priority = reader.GetNullableString("Priority"),
                IdPatient = reader.GetNullableLong("IdPatient"),
                Patient = reader.GetNullableString("PatientName") + " " + reader.GetNullableString("PatientSurname"),
                EmployeeName = reader.GetNullableString("DoctorName") + " " + reader.GetNullableString("DoctorSurname"),
                Profile = reader.GetNullableString("Profile"),
                DateOfOrder = reader.GetDate("DateOfOrder")
            };
        }
    }
}