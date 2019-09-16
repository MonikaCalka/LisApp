using LisApp.Enums;
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
                    e.FirstName as DoctorName, e.Surname as DoctorSurname, p.IdPatient, p.FirstName as PatientName, p.Surname as PatientSurname, o.DateOfOrder, 
                    pft.Name as Profile, o.Comment, sam.Code as Sample, p.Sex as PatientSex, s.ReasonForRepeat, s.Actual, s.PreviousId, s.DateOfEnd, 
                    e2.FirstName as RepeatFirstName, e2.Surname as RepeatSurname, n.IdStudy as NextId
                from Studies s
                join Orders o on s.IdOrder = o.IdOrder
                join Patients p on o.IdPatient = p.IdPatient
                left join Employees e on o.IdEmployee = e.IdEmployee
                join Status st on s.IdStatus = st.IdStatus
                join StatusTranslations stt on st.IdStatus = stt.IdStatus
                join Priorities pr on o.IdPriority = pr.IdPriority
                join PriorityTranslations prt on pr.IdPriority = prt.IdPriority
                join Profiles pf on s.IdProfile = pf.IdProfile
                join ProfileTranslations pft on pf.IdProfile = pft.IdProfile
                left join Samples sam on s.IdStudy = sam.IdStudy
                left join Employees e2 on o.IdEmployee = e2.IdEmployee
				left join (select * from Studies s2 ) n on s.IdStudy = n.PreviousId
                where stt.IdLanguage = (select l1.IdLanguage from Languages l1 where l1.Code = '{lang}') 
                    and prt.IdLanguage = (select l2.IdLanguage from Languages l2 where l2.Code = '{lang}')
                    and pft.IdLanguage = (select l3.IdLanguage from Languages l3 where l3.Code = '{lang}')
                    and s.IdStudy = {id}
            ";

            return BaseDAO.SelectFirst(query, ReadStudyModel);
        }

        public List<StudyModel> ReadStudiesListForDoctors(long idEmployee, string lang)
        {
            string query = $@"
                select s.IdStudy, s.IdOrder, s.IdStatus, stt.Name as Status, prt.Name as Priority,
                    p.FirstName as PatientName, p.Surname as PatientSurname, o.DateOfOrder, 
                    pft.Name as Profile
                from Studies s
                join Orders o on s.IdOrder = o.IdOrder
                join Patients p on o.IdPatient = p.IdPatient
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
                    and s.IdStatus != {(long)StatusTypeEnum.ReOrdered}
            ";

            return BaseDAO.Select(query, ReadStudyModelForList);
        }

        public List<StudyModel> ReadStudiesListForNurse(string lang)
        {
            string query = $@"
                select s.IdStudy, s.IdOrder, s.IdStatus, stt.Name as Status, prt.Name as Priority,
                    p.FirstName as PatientName, p.Surname as PatientSurname, o.DateOfOrder, 
                    pft.Name as Profile
                from Studies s
                join Orders o on s.IdOrder = o.IdOrder
                join Patients p on o.IdPatient = p.IdPatient
                join Status st on s.IdStatus = st.IdStatus
                join StatusTranslations stt on st.IdStatus = stt.IdStatus
                join Priorities pr on o.IdPriority = pr.IdPriority
                join PriorityTranslations prt on pr.IdPriority = prt.IdPriority
                join Profiles pf on s.IdProfile = pf.IdProfile
                join ProfileTranslations pft on pf.IdProfile = pft.IdProfile
                where stt.IdLanguage = (select l1.IdLanguage from Languages l1 where l1.Code = '{lang}') 
                    and prt.IdLanguage = (select l2.IdLanguage from Languages l2 where l2.Code = '{lang}')
                    and pft.IdLanguage = (select l3.IdLanguage from Languages l3 where l3.Code = '{lang}')
                    and s.IdStatus in ({(long)StatusTypeEnum.Ordered}, {(long)StatusTypeEnum.TakenSample})
            ";

            return BaseDAO.Select(query, ReadStudyModelForList);
        }

        public List<StudyModel> ReadStudiesListForLab(string lang)
        {
            string query = $@"
                select s.IdStudy, s.IdOrder, s.IdStatus, stt.Name as Status, prt.Name as Priority,
                    p.FirstName as PatientName, p.Surname as PatientSurname, o.DateOfOrder, 
                    pft.Name as Profile
                from Studies s
                join Orders o on s.IdOrder = o.IdOrder
                join Patients p on o.IdPatient = p.IdPatient
                join Status st on s.IdStatus = st.IdStatus
                join StatusTranslations stt on st.IdStatus = stt.IdStatus
                join Priorities pr on o.IdPriority = pr.IdPriority
                join PriorityTranslations prt on pr.IdPriority = prt.IdPriority
                join Profiles pf on s.IdProfile = pf.IdProfile
                join ProfileTranslations pft on pf.IdProfile = pft.IdProfile
                where stt.IdLanguage = (select l1.IdLanguage from Languages l1 where l1.Code = '{lang}') 
                    and prt.IdLanguage = (select l2.IdLanguage from Languages l2 where l2.Code = '{lang}')
                    and pft.IdLanguage = (select l3.IdLanguage from Languages l3 where l3.Code = '{lang}')
                    and s.IdStatus in ({(long)StatusTypeEnum.TakenSample}, {(long)StatusTypeEnum.InProgress}, {(long)StatusTypeEnum.ToVerify})
            ";

            return BaseDAO.Select(query, ReadStudyModelForList);
        }

        public List<StudyModel> ReadStudiesListByOrderId(long? id)
        {
            string query = $@"
                select s.IdStudy, s.IdProfile, s.IdEmployee, s.IdOrder, s.IdStatus, s.DateOfStudy, sam.Code as Sample, s.ReasonForRepeat, s.Actual, s.PreviousId, s.DateOfEnd
                from Studies s
                left join Samples sam on s.IdStudy = sam.IdStudy
                where s.IdOrder = {id} and s.Actual = 1
            ";

            return BaseDAO.Select(query, ReadSimpleStudyModel);
        }

        public List<StudyModel> ReadNotVerifiedStudiesListByOrderId(long id)
        {
            string query = $@"
                select s.IdStudy, s.IdProfile, s.IdEmployee, s.IdOrder, s.IdStatus, s.DateOfStudy, sam.Code as Sample, s.ReasonForRepeat, s.Actual, s.PreviousId, s.DateOfEnd
                from Studies s
                left join Samples sam on s.IdStudy = sam.IdStudy
                where s.IdOrder = {id} and s.Actual = 1 and IdStatus in ({(long)StatusTypeEnum.Ordered}, {(long)StatusTypeEnum.InProgress}, {(long)StatusTypeEnum.TakenSample}, {(long)StatusTypeEnum.ToVerify})
            ";

            return BaseDAO.Select(query, ReadSimpleStudyModel);
        }

        public long? InsertStudy(StudyModel study)
        {
            string query = $@"
                insert into Studies(IdOrder, IdProfile, IdStatus, Actual, PreviousId) 
                    output INSERTED.IdStudy
                    values({study.IdOrder}, {study.IdProfile}, {(long)StatusTypeEnum.Ordered}, 1, {BaseDAO.SetNullableLong(study.PreviousId)});
            ";
            return BaseDAO.InsertOrUpdate(query, true);
        }

        public void ChangeStudyStatus(long IdStudy, long IdStatus)
        {
            string query = $@"
                update Studies set IdStatus={IdStatus}
                where IdStudy={IdStudy}
            ";
            BaseDAO.InsertOrUpdate(query, false);
        }

        public void UpdateStudy(StudyModel study)
        {
            string query = $@"
                update Studies set IdEmployee={study.IdDoctor}, IdStatus={study.IdStatus}, DateOfStudy={BaseDAO.SetDate(study.DateOfStudy)},
                ReasonForRepeat={BaseDAO.SetString(study.ReasonForRepeat)}, Actual={BaseDAO.SetBool(study.Actual)}, 
                PreviousId={BaseDAO.SetNullableLong(study.PreviousId)}, DateOfEnd={BaseDAO.SetDate(study.DateOfEnd)},
                IdRepeatEmployee={BaseDAO.SetNullableLong(study.IdRepeatEmployee)}
                where IdStudy={study.IdStudy}
            ";
            BaseDAO.InsertOrUpdate(query, false);
        }

        public void SetReorederDataOfStudy(StudyModel study)
        {
            string query = $@"
                update Studies set IdRepeatEmployee={study.IdRepeatEmployee}, IdStatus={(long)StatusTypeEnum.ReOrdered},
                ReasonForRepeat={BaseDAO.SetString(study.ReasonForRepeat)}, Actual={BaseDAO.SetBool(false)}, 
                DateOfEnd={BaseDAO.SetDate(DateTime.Now)}
                where IdStudy={study.IdStudy}
            ";
            BaseDAO.InsertOrUpdate(query, false);
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
                IdDoctor = reader.GetNullableLong("IdEmployee"),
                IdOrder = reader.GetLong("IdOrder"),
                IdStatus = reader.GetLong("IdStatus"),
                DateOfStudy = reader.GetNullableDate("DateOfStudy"),
                SampleCode = reader.GetNullableString("Sample"),
                ReasonForRepeat = reader.GetNullableString("ReasonForRepeat"),
                Actual = reader.GetNullableBool("Actual"),
                PreviousId = reader.GetNullableLong("PreviousId"),
                DateOfEnd = reader.GetNullableDate("DateOfEnd")
            };
        }

        private StudyModel ReadStudyModel(CustomReader reader)
        {
            return new StudyModel()
            {
                IdStudy = reader.GetLong("IdStudy"),
                IdProfile = reader.GetNullableLong("IdProfile"),
                IdDoctor = reader.GetNullableLong("IdEmployee"),
                IdOrder = reader.GetLong("IdOrder"),
                IdStatus = reader.GetLong("IdStatus"),
                DateOfStudy = reader.GetNullableDate("DateOfStudy"),
                Status = reader.GetNullableString("Status"),
                IdPriority = reader.GetNullableLong("IdPriority"),
                Priority = reader.GetNullableString("Priority"),
                IdPatient = reader.GetNullableLong("IdPatient"),
                Patient = reader.GetNullableString("PatientName") + " " + reader.GetNullableString("PatientSurname"),
                Doctor = reader.GetNullableString("DoctorName") + " " + reader.GetNullableString("DoctorSurname"),
                Profile = reader.GetNullableString("Profile"),
                DateOfOrder = reader.GetDate("DateOfOrder"),
                OrderComment = reader.GetNullableString("Comment"),
                SampleCode = reader.GetNullableString("Sample"),
                PatientSex = reader.GetNullableString("PatientSex"),
                ReasonForRepeat = reader.GetNullableString("ReasonForRepeat"),
                Actual = reader.GetNullableBool("Actual"),
                PreviousId = reader.GetNullableLong("PreviousId"),
                NextId = reader.GetNullableLong("NextId"),
                DateOfEnd = reader.GetNullableDate("DateOfEnd"),
                RepeatEmployee = reader.GetNullableString("RepeatFirstName") + " " + reader.GetNullableString("RepeatSurname")
            };
        }

        private StudyModel ReadStudyModelForList(CustomReader reader)
        {
            return new StudyModel()
            {
                IdStudy = reader.GetLong("IdStudy"),
                IdOrder = reader.GetLong("IdOrder"),
                IdStatus = reader.GetLong("IdStatus"),
                Status = reader.GetNullableString("Status"),
                Priority = reader.GetNullableString("Priority"),
                Patient = reader.GetNullableString("PatientName") + " " + reader.GetNullableString("PatientSurname"),
                Profile = reader.GetNullableString("Profile"),
                DateOfOrder = reader.GetDate("DateOfOrder"),
            };
        }
    }
}