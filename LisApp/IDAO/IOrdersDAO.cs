using LisApp.Models;
using System.Collections.Generic;

namespace LisApp.IDAO
{
    public interface IOrdersDAO
    {
        List<OrderModel> ReadOrdersList();
        OrderModel ReadOrderById(long id);
    }
}