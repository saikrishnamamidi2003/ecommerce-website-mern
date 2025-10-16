import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) return <h2>Your cart is empty</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Shopping Cart</h2>
      {cart.map((item) => (
        <div key={item.id} style={{ borderBottom: "1px solid #ccc", margin: "10px 0" }}>
          <h3>{item.name}</h3>
          <p>₹{item.price}</p>
          <input
            type="number"
            value={item.quantity}
            min="1"
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
          />
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <h3>Total: ₹{total}</h3>
    </div>
  );
};

export default CartPage;
