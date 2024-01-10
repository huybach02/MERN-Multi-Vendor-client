import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {get_all_orders} from "../../store/reducers/orderReducer";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {userInfo} = useSelector((state) => state.auth);
  const {myOrders} = useSelector((state) => state.order);

  const [state, setState] = useState("all");

  useEffect(() => {
    dispatch(
      get_all_orders({
        status: state,
        customerId: userInfo.id,
      })
    );
  }, [state]);

  const redirect = (order) => {
    let items = 0;
    for (let i = 0; i < order.length; i++) {
      items = items + order.products[i].quantity;
    }
    navigate("/payment", {
      state: {
        price: order.price,
        items,
        orderId: order._id,
      },
    });
  };
  return (
    <div className="bg-white rounded-md">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-blue-600 mb-5">My Orders</h2>
        <select
          className="outline-none px-3 py-1 border rounded-md text-slate-600"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="all">--order status---</option>
          <option value="Placed">Placed</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Warehouse">Warehouse</option>
        </select>
      </div>
      <div className="pt-4">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-center ">
            <thead className="text-sm text-blue-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment status
                </th>
                <th scope="col" className="px-6 py-3">
                  Order status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {myOrders?.map((item, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="px-6 py-4 font-medium whitespace-nowrap">
                    {item._id}
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap">
                    ${item.price}
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap">
                    {item.payment_status}
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap">
                    {item.delivery_status}
                  </td>
                  <td className="px-6 py-4 md-lg:flex md-lg:flex-col gap-2">
                    <Link to={`/dashboard/order/details/${item._id}`}>
                      <span className="bg-blue-100 text-blue-800 text-sm font-normal mr-2 px-4 py-1 rounded">
                        View
                      </span>
                    </Link>

                    {item.payment_status === "Unpaid" ? (
                      <span
                        className="bg-orange-100 text-orange-800 text-sm font-normal mr-2 px-4 py-1 rounded cursor-pointer"
                        onClick={() => redirect(item)}
                      >
                        Pay Now
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-800 text-sm font-normal mr-2 px-8 py-1 rounded ">
                        Paid
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
