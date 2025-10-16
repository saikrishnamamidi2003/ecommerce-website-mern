import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ShippingPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  // ✅ Redirect if not logged in
  if (!user) {
    navigate("/login");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("shippingAddress", JSON.stringify(address));
    navigate("/placeorder");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Shipping Address</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={address.fullName}
          onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Street"
          value={address.street}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="City"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="State"
          value={address.state}
          onChange={(e) => setAddress({ ...address, state: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={address.postalCode}
          onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Country"
          value={address.country}
          onChange={(e) => setAddress({ ...address, country: e.target.value })}
          required
        />
        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default ShippingPage;
