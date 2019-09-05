using LisApp.Models;
using System.Collections.Generic;

namespace LisApp.IDAO
{
    public interface IOrdersDAO
    {
        List<OrderModel> ReadOrdersList(long idEmployee, string idLang);
        OrderModel ReadOrderById(long id, string lang);
        List<OrderModel> ReadOrdersListForNurse(string lang);
        OrderModel ReadSimpleOrderById(long id, string lang);

        long? InsertOrder(OrderModel o);
        void UpdateOrder(OrderModel o);
        void ChangeOrderStatus(long IdOrder, long IdStatus);
        void FullUpdateOrder(OrderModel o);
    }
}