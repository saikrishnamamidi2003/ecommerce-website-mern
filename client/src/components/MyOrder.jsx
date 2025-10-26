import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${API_URL}/api/orders/myorders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // ✅ Check if data is array or inside object
        setOrders(Array.isArray(data) ? data : data.orders || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setOrders([]); // prevent crash
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <h3>Loading orders...</h3>;

  // ✅ Safe check
  if (!orders.length) return <h3>No orders found</h3>;

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <h4>Order ID: {order._id}</h4>
          <p>Total: ₹{order.totalPrice}</p>
          <p>Status: {order.isDelivered ? "Delivered ✅" : "Pending ⏳"}</p>
          <div>
            {order.orderItems.map((item, idx) => (
              <p key={idx}>
                {item.name} - ₹{item.price} × {item.qty}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
