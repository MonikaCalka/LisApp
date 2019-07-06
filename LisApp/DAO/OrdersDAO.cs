using LisApp.IDAO;
using LisApp.Models;
using System;
using System.Collections.Generic;

namespace LisApp.DAO
{
    public class OrdersDAO : IOrdersDAO
    {
        public OrderModel ReadOrderById(long id, string lang)
        {
            string query = $@"
                select o.IdOrder, o.IdPatient, o.IdEmployee, o.IdWard, wt.Name as Ward, o.Institution, o.Comment, o.DateOfOrder, o.DateOfReceived, o.IdStatus, 
                    st.Name as Status, o.IdPriority, prt.Name as Priority, p.FirstName, p.Surname
                from Orders o
                join Patients p on o.IdPatient = p.IdPatient
                join Priorities pr  on o.IdPriority = pr.IdPriority
                join PriorityTranslations prt on pr.IdPriority = prt.IdPriority
                join Wards w on o.IdWard = w.IdWard
                join WardTranslations wt on w.IdWard = wt.Idward
                join Status s on o.IdStatus = s.IdStatus
                join StatusTranslations st on s.IdStatus = st.IdStatus
                where wt.IdLanguage = (select l1.IdLanguage from Languages l1 where l1.Code = '{lang}') 
                    and st.IdLanguage = (select l2.IdLanguage from Languages l2 where l2.Code = '{lang}') 
                    and prt.IdLanguage = (select l3.IdLanguage from Languages l3 where l3.Code = '{lang}')
                    and IdOrder = {id}
            ";

            return BaseDAO.SelectFirst(query, ReadOrderModel);
        }

        public List<OrderModel> ReadOrdersList(long idEmployee, string lang)
        {
            //Status: all
            string query = $@"
                select o.IdOrder, o.IdPatient, o.IdEmployee, o.IdWard, wt.Name as Ward, o.Institution, o.Comment, o.DateOfOrder, o.DateOfReceived, o.IdStatus, 
                    st.Name as Status, o.IdPriority, prt.Name as Priority, p.FirstName, p.Surname
                from Orders o
                join Patients p on o.IdPatient = p.IdPatient
                join Priorities pr  on o.IdPriority = pr.IdPriority
                join PriorityTranslations prt on pr.IdPriority = prt.IdPriority
                join Wards w on o.IdWard = w.IdWard
                join WardTranslations wt on w.IdWard = wt.Idward
                join Status s on o.IdStatus = s.IdStatus
                join StatusTranslations st on s.IdStatus = st.IdStatus
                where ({idEmployee} = o.IdEmployee or {idEmployee} in (select con.IdEmployee from Consultants con where con.IdOrder = o.IdOrder))
                    and wt.IdLanguage = (select l1.IdLanguage from Languages l1 where l1.Code = '{lang}') 
                    and st.IdLanguage = (select l2.IdLanguage from Languages l2 where l2.Code = '{lang}') 
                    and prt.IdLanguage = (select l3.IdLanguage from Languages l3 where l3.Code = '{lang}')
            ";

            return BaseDAO.Select(query, ReadOrderModel);
        }


        public List<OrderModel> ReadOrdersListForNurse(string lang)
        {
            //Status: Ordered
            string query = $@"
                select o.IdOrder, o.IdPatient, o.IdEmployee, o.Comment, o.DateOfOrder, o.IdStatus, 
                    st.Name as Status, o.IdPriority, prt.Name as Priority, p.FirstName, p.Surname
                from Orders o
                join Patients p on o.IdPatient = p.IdPatient
                join Priorities pr on o.IdPriority = pr.IdPriority
                join PriorityTranslations prt on pr.IdPriority = prt.IdPriority
                join Status s on o.IdStatus = s.IdStatus
                join StatusTranslations st on s.IdStatus = st.IdStatus
                where st.IdLanguage = (select l1.IdLanguage from Languages l1 where l1.Code = '{lang}') 
                    and prt.IdLanguage = (select l2.IdLanguage from Languages l2 where l2.Code = '{lang}')
                    and s.IdStatus = 7;
            ";

            return BaseDAO.Select(query, ReadSimpleOrderModel);
        }

        private OrderModel ReadOrderModel(CustomReader reader)
        {
            return new OrderModel()
            {
                IdOrder = reader.GetLong("IdOrder"),
                IdPatient = reader.GetLong("IdPatient"),
                IdEmployee = reader.GetLong("IdEmployee"),
                IdWard = reader.GetNullableLong("IdWard"),
                Ward = reader.GetString("Ward"),
                Institution = reader.GetNullableString("Institution"),
                Comment = reader.GetNullableString("Comment"),
                DateOfOrder = reader.GetDate("DateOfOrder"),
                DateOfReceived = reader.GetNullableDate("DateOfReceived"),
                IdStatus = reader.GetLong("IdStatus"),
                Status = reader.GetString("Status"),
                IdPriority = reader.GetLong("IdPriority"),
                Priority = reader.GetString("Priority"),
                PatientName = reader.GetString("FirstName") + " " + reader.GetString("Surname")
            };
        }

        private OrderModel ReadSimpleOrderModel(CustomReader reader)
        {
            return new OrderModel()
            {
                IdOrder = reader.GetLong("IdOrder"),
                IdPatient = reader.GetLong("IdPatient"),
                IdEmployee = reader.GetLong("IdEmployee"),
                Comment = reader.GetNullableString("Comment"),
                DateOfOrder = reader.GetDate("DateOfOrder"),
                IdStatus = reader.GetLong("IdStatus"),
                Status = reader.GetString("Status"),
                IdPriority = reader.GetLong("IdPriority"),
                Priority = reader.GetString("Priority"),
                PatientName = reader.GetString("FirstName") + " " + reader.GetString("Surname")
            };
        }
    }
}