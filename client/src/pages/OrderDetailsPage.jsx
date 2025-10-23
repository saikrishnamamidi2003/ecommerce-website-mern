import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../api";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/api/orders/${id}`).then((res) => setOrder(res.data));
  }, [id]);

  if (!order) return <p>Loading order details...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Order #{order.id}</h2>
      <h3>Shipping Address</h3>
      <p>{order.shippingAddress.fullName}</p>
      <p>{order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}</p>

      <h3>Items</h3>
      {order.orderItems.map((item) => (
        <div key={item.id}>
          {item.name} x {item.quantity} = ₹{item.price * item.quantity}
        </div>
      ))}

      <h3>Total Paid: ₹{order.totalPrice}</h3>
    </div>
  );
};

export default OrderDetailsPage;
