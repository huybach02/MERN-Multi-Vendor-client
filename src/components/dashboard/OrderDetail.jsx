import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {get_one_order} from "../../store/reducers/orderReducer";

const OrderDetail = () => {
  const dispatch = useDispatch();

  const {orderId} = useParams();
  const {myOrder} = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(get_one_order(orderId));
  }, [orderId]);

  return (
    <div className="bg-white">
      <h2 className="font-semibold text-xl md-lg:text-sm text-blue-600 flex items-center gap-3">
        Detail of order <p className="text-black">#{myOrder?._id}</p>
      </h2>
      <span className="font-semibold text-xl md-lg:text-sm text-blue-600 flex items-center gap-3">
        Time order: <p className="text-black">{myOrder?.date}</p>
      </span>
      <div className="grid grid-cols-2 md-lg:grid-cols-1 gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-blue-600 font-semibold text-xl md-lg:text-sm flex items-center gap-3">
            Deliver to:{" "}
            <p className="text-black">{myOrder?.shippingInfo?.name}</p>
          </h2>
          <p className="text-blue-600 font-semibold text-xl md-lg:text-sm flex items-center gap-3">
            Email to <p className="text-black">{myOrder?.customerId?.email}</p>
          </p>
          <p className="my-3">
            <span className="bg-blue-100 text-blue-800 font-medium mr-2 px-5 py-2 rounded md-lg:py-1">
              Home
            </span>
            <span className="text-slate-600">
              {myOrder?.shippingInfo?.address} {myOrder?.shippingInfo?.province}{" "}
              {myOrder?.shippingInfo?.city} {myOrder?.shippingInfo?.area}
            </span>
          </p>
        </div>
        <div className="text-blue-600 flex flex-col gap-3">
          <h2>
            <strong>Price:</strong> ${myOrder?.price} (include shipping fee)
          </h2>
          <p>
            <strong>Payment status:</strong>{" "}
            <span className="bg-gray-400/30 px-2 py-1 rounded-md">
              {myOrder?.payment_status}
            </span>
          </p>
          <p>
            <strong>Order status:</strong>{" "}
            <span className="bg-gray-400/30 px-2 py-1 rounded-md">
              {myOrder?.delivery_status}
            </span>
          </p>
        </div>
      </div>
      <div className="mt-3">
        <h2 className="text-blue-600 text-lg font-semibold pb-2">Products:</h2>
        <div className="flex gap-5 flex-col">
          {myOrder?.products?.map((p, i) => (
            <div key={i}>
              <div className="flex gap-5 justify-between items-center text-blue-600">
                <div className="flex gap-3">
                  <img
                    className="md-lg:w-[55px] md-lg:h-[55px] w-[70px] h-[70px] p-1"
                    src={p.images[0]}
                    alt=""
                  />
                  <div className="flex md-lg:text-sm flex-col justify-start items-start">
                    <Link className="font-bold">{p.name}</Link>
                    <p className="flex flex-col">
                      <span>
                        <strong>Brand:</strong> {p.brand}
                      </span>
                      <span>
                        <strong>Quantity:</strong> {p.quantity}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="pl-4 flex items-center gap-3">
                  <p className="text-red-500">-{p.discount}%</p>
                  <p className="line-through text-black">{p.price}</p>
                  <h2 className="text-blue-600 text-lg font-semibold">
                    ${p.price - Math.floor((p.price * p.discount) / 100)}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
