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
                select o.IdOrder, o.IdPatient, o.IdEmployee, e.FirstName as DoctorFirstName, e.Surname as DoctorSurname, o.IdWard, wt.Name as Ward, o.Institution,
                    o.Comment, o.DateOfOrder, o.DateOfReceived, o.IdStatus, st.Name as Status, o.IdPriority, prt.Name as Priority, p.FirstName, p.Surname, p.IdCardNumber
                from Orders o
                join Patients p on o.IdPatient = p.IdPatient
                join Employees e on o.IdEmployee = e.IdEmployee
                join Priorities pr  on o.IdPriority = pr.IdPriority
                join PriorityTranslations prt on pr.IdPriority = prt.IdPriority
                left join Wards w on o.IdWard = w.IdWard
                full join WardTranslations wt on w.IdWard = wt.Idward
                join Status s on o.IdStatus = s.IdStatus
                join StatusTranslations st on s.IdStatus = st.IdStatus
                where (w.IdWard is null or wt.IdLanguage = (select l1.IdLanguage from Languages l1 where l1.Code = '{lang}'))
                    and st.IdLanguage = (select l2.IdLanguage from Languages l2 where l2.Code = '{lang}') 
                    and prt.IdLanguage = (select l3.IdLanguage from Languages l3 where l3.Code = '{lang}')
                    and IdOrder = {id}
            ";

            return BaseDAO.SelectFirst(query, ReadOrderModel);
        }

        public OrderModel ReadSimpleOrderById(long id, string lang)
        {
            string query = $@"
                select o.IdOrder, o.IdPatient, o.IdEmployee, e.FirstName as DoctorFirstName, e.Surname as DoctorSurname, 
                    o.Comment, o.DateOfOrder, o.DateOfReceived, o.IdStatus, st.Name as Status, o.IdPriority, prt.Name as Priority, p.FirstName, p.Surname
                from Orders o
                join Patients p on o.IdPatient = p.IdPatient
                join Employees e on o.IdEmployee = e.IdEmployee
                join Priorities pr  on o.IdPriority = pr.IdPriority
                join PriorityTranslations prt on pr.IdPriority = prt.IdPriority
                join Status s on o.IdStatus = s.IdStatus
                join StatusTranslations st on s.IdStatus = st.IdStatus
                where st.IdLanguage = (select l2.IdLanguage from Languages l2 where l2.Code = '{lang}') 
                    and prt.IdLanguage = (select l3.IdLanguage from Languages l3 where l3.Code = '{lang}')
                    and IdOrder = {id}
            ";

            return BaseDAO.SelectFirst(query, ReadSimpleOrderModel);
        }

        public List<OrderModel> ReadOrdersList(long idEmployee, string lang)
        {
            //Status: all
            string query = $@"
                select o.IdOrder, o.IdPatient, o.IdEmployee, e.FirstName as DoctorFirstName, e.Surname as DoctorSurname, o.Comment, o.DateOfOrder, o.DateOfReceived, o.IdStatus, 
                    st.Name as Status, o.IdPriority, prt.Name as Priority, p.FirstName, p.Surname
                from Orders o
                join Patients p on o.IdPatient = p.IdPatient
                join Employees e on o.IdEmployee = e.IdEmployee
                join Priorities pr  on o.IdPriority = pr.IdPriority
                join PriorityTranslations prt on pr.IdPriority = prt.IdPriority
                join Status s on o.IdStatus = s.IdStatus
                join StatusTranslations st on s.IdStatus = st.IdStatus
                where ({idEmployee} = o.IdEmployee or {idEmployee} in (select con.IdEmployee from Consultants con where con.IdOrder = o.IdOrder))
                    and st.IdLanguage = (select l2.IdLanguage from Languages l2 where l2.Code = '{lang}') 
                    and prt.IdLanguage = (select l3.IdLanguage from Languages l3 where l3.Code = '{lang}')
            ";

            return BaseDAO.Select(query, ReadSimpleOrderModel);
        }


        public List<OrderModel> ReadOrdersListForNurse(string lang)
        {
            //Status: Ordered and InProgress where study not in progress in lab (only sample collected)
            string query = $@"
                select o.IdOrder, o.IdPatient, o.IdEmployee, e.FirstName as DoctorFirstName, e.Surname as DoctorSurname, o.Comment, o.DateOfOrder, o.IdStatus, 
                    st.Name as Status, o.IdPriority, prt.Name as Priority, p.FirstName, p.Surname
                from Orders o
                join Patients p on o.IdPatient = p.IdPatient
                join Employees e on o.IdEmployee = e.IdEmployee
                join Priorities pr on o.IdPriority = pr.IdPriority
                join PriorityTranslations prt on pr.IdPriority = prt.IdPriority
                join Status s on o.IdStatus = s.IdStatus
                join StatusTranslations st on s.IdStatus = st.IdStatus
                where st.IdLanguage = (select l1.IdLanguage from Languages l1 where l1.Code = '{lang}') 
                    and prt.IdLanguage = (select l2.IdLanguage from Languages l2 where l2.Code = '{lang}')
                    and (s.IdStatus = 1 or s.IdStatus = 3)
					and o.IdOrder in (
						select stu.IdOrder 
						from Studies stu
						where stu.IdStatus in (1, 7) 
					) 
                order by IdOrder;
            ";

            return BaseDAO.Select(query, ReadSimpleOrderModel);
        }

        public long? InsertOrder(OrderModel o)
        {
            string query = $@"
                insert into Orders(IdPatient, IdEmployee, IdWard, Institution, Comment, DateOfOrder, IdStatus, IdPriority) 
                    output INSERTED.IdOrder
                    values({o.IdPatient},{o.IdEmployee},{BaseDAO.SetNullableLong(o.IdWard)},{BaseDAO.SetString(o.Institution)},
                    {BaseDAO.SetString(o.Comment)},{BaseDAO.SetDate(DateTime.Now)}, 1, {o.IdPriority});
            ";
            return BaseDAO.InsertOrUpdate(query, true);
        }

        public void UpdateOrder(OrderModel o)
        {
            string query = $@"
                update Orders set IdWard={BaseDAO.SetNullableLong(o.IdWard)}, Institution={BaseDAO.SetString(o.Institution)},
                Comment={BaseDAO.SetString(o.Comment)}, IdPriority={o.IdPriority}
                where IdOrder={o.IdOrder}
            ";
            BaseDAO.InsertOrUpdate(query, false);
        }
        public void FullUpdateOrder(OrderModel o)
        {
            string query = $@"
                update Orders set IdPatient={o.IdPatient}, IdWard={BaseDAO.SetNullableLong(o.IdWard)}, Institution={BaseDAO.SetString(o.Institution)},
                Comment={BaseDAO.SetString(o.Comment)}, IdPriority={o.IdPriority}
                where IdOrder={o.IdOrder}
            ";
            BaseDAO.InsertOrUpdate(query, false);
        }

        public void ChangeOrderStatus(long IdOrder, long IdStatus)
        {
            string query = $@"
                update Orders set IdStatus={IdStatus}
                where IdOrder={IdOrder}
            ";
            BaseDAO.InsertOrUpdate(query, false);
        }

        private OrderModel ReadOrderModel(CustomReader reader)
        {
            return new OrderModel()
            {
                IdOrder = reader.GetLong("IdOrder"),
                IdPatient = reader.GetLong("IdPatient"),
                IdEmployee = reader.GetLong("IdEmployee"),
                EmployeeName = reader.GetString("DoctorFirstName") + " " + reader.GetString("DoctorSurname"),
                IdWard = reader.GetNullableLong("IdWard"),
                Ward = reader.GetNullableString("Ward"),
                Institution = reader.GetNullableString("Institution"),
                Comment = reader.GetNullableString("Comment"),
                DateOfOrder = reader.GetDate("DateOfOrder"),
                DateOfReceived = reader.GetNullableDate("DateOfReceived"),
                IdStatus = reader.GetLong("IdStatus"),
                Status = reader.GetString("Status"),
                IdPriority = reader.GetLong("IdPriority"),
                Priority = reader.GetString("Priority"),
                PatientName = reader.GetString("FirstName") + " " + reader.GetString("Surname"),
                IdCardNumber = reader.GetNullableString("IdCardNumber")
            };
        }

        private OrderModel ReadSimpleOrderModel(CustomReader reader)
        {
            return new OrderModel()
            {
                IdOrder = reader.GetLong("IdOrder"),
                IdPatient = reader.GetLong("IdPatient"),
                IdEmployee = reader.GetLong("IdEmployee"),
                EmployeeName = reader.GetString("DoctorFirstName") + " " + reader.GetString("DoctorSurname"),
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