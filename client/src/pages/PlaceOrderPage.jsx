import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";

const PlaceOrderPage = () => {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = async () => {
    try {
      const orderData = {
        orderItems: cart,
        shippingAddress,
        totalPrice,
      };

      const res = await axios.post("/api/orders", orderData);
      
      // ✅ Clear cart after success
      setCart([]);
      localStorage.removeItem("cart");

      navigate(`/order/${res.data.id}`);
    } catch (error) {
      console.error("Order failed", error);
    }
  };

  if (cart.length === 0) return <h2>Your cart is empty</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Place Order</h2>

      <h3>Shipping Address</h3>
      <p>{shippingAddress.fullName}</p>
      <p>{shippingAddress.street}, {shippingAddress.city}, {shippingAddress.state}, {shippingAddress.postalCode}, {shippingAddress.country}</p>

      <h3>Order Items</h3>
      {cart.map((item) => (
        <div key={item.id}>
          {item.name} x {item.quantity} = ₹{item.price * item.quantity}
        </div>
      ))}

      <h3>Total: ₹{totalPrice}</h3>

      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
};

export default PlaceOrderPage;
