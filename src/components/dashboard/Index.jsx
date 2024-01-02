import React, {useEffect} from "react";
import {FaShoppingCart} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {get_dashboard_index_data} from "../../store/reducers/dashboardReducer";

const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {userInfo} = useSelector((state) => state.auth);
  const {totalOrders, recentOrders, pendingOrders, cancelledOrders} =
    useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(get_dashboard_index_data(userInfo.id));
  }, []);

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
    <div>
      <div className="grid grid-cols-3 md:grid-cols-1 gap-5">
        <div className="flex justify-center items-center p-5 bg-main gap-5 shadow-md rounded-md">
          <div className="bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-green-600">
              <FaShoppingCart />
            </span>
          </div>
          <div className="flex flex-col items-center text-white">
            <h2 className="text-3xl font-semibold">{totalOrders}</h2>
            <span>Total Orders</span>
          </div>
        </div>
        <div className="flex justify-center items-center p-5 bg-main gap-5 shadow-md rounded-md">
          <div className="bg-yellow-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-yellow-600">
              <FaShoppingCart />
            </span>
          </div>
          <div className="flex flex-col items-center text-white">
            <h2 className="text-3xl font-semibold">{pendingOrders}</h2>
            <span>Pending Orders</span>
          </div>
        </div>
        <div className="flex justify-center items-center p-5 bg-main gap-5 shadow-md rounded-md">
          <div className="bg-red-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <span className="text-xl text-red-600">
              <FaShoppingCart />
            </span>
          </div>
          <div className="flex flex-col items-center text-white">
            <h2 className="text-3xl font-semibold">{cancelledOrders}</h2>
            <span>Cancelled Orders</span>
          </div>
        </div>
      </div>
      <div className="bg-white mt-5 rounded-md">
        <h2 className="text-xl font-semibold text-blue-600">Recent Orders</h2>
        <div className="pt-4">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-center">
              <thead className="text-blue-600 uppercase bg-gray-100">
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
                {recentOrders?.map((item, index) => (
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
                        <span className="bg-green-100 text-green-800 text-sm font-normal mr-2 px-4 py-1 rounded">
                          View
                        </span>
                      </Link>

                      <span
                        className="bg-orange-100 text-orange-800 text-sm font-normal mr-2 px-4 py-1 rounded cursor-pointer"
                        onClick={() => redirect(item)}
                      >
                        Pay Now
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
