import { useEffect } from "react";
import OrderItemCard from "./OrderItemCard";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { fetchUserOrderHistory } from "../../../Redux Toolkit/Customer/OrderSlice";

const Order = () => {
  const dispatch = useAppDispatch();
  const { auth, orders } = useAppSelector((store) => store);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      dispatch(fetchUserOrderHistory(token));
    }
  }, [auth.jwt, dispatch]);

  return (
    <div className="text-sm min-h-screen">
      <div className="pb-5">
        <h1 className="font-semibold">All orders</h1>
        <p>from anytime</p>
      </div>

      <div className="space-y-2">
        {orders?.orders?.length > 0 ? (
          orders.orders.map((order) =>
            order.orderItems.map((item) => (
              <OrderItemCard
                key={item._id}
                item={item}
                order={order}
              />
            ))
          )
        ) : (
          <p className="text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Order;
