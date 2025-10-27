import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductPage.css";
import { CartContext } from "../context/CartContext";
import API_URL from "../api";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const [showForm, setShowForm] = useState(false);

  const[form, setForm] = useState(
    {
      address: "",
      city: "",
      postalCode: "",
      Phone: "",
    }
  );

  const handleChange = (e) => {
    setForm( {...form, [e.target.name]: e.target.value} );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      OrderItems: [
        {
          name: product.name,
          image: product.image,
          price: product.price,
          qty: quantity,//product.quantity
          product: product._id,
        },
      ],
       shippingAddress: {
      address: form.address,
      city: form.city,
      postalCode: form.postalCode,
      country: "India",
    },
    paymentMethod: "COD",
      totalPrice: product.price * quantity,
    };

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. Please log in as admin.");
      return;
    }

    try{
    const res = await axios.post(`${API_URL}/api/orders`, orderData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

     //alert("✅ Order placed successfully!");
     setAddedMessage("✅ Order placed successfully!");
     setTimeout( ()=>setAddedMessage(""),1000); 
  setShowForm(false);
  console.log("Order response:", res.data);
  }
  catch (error){
      console.error("❌ Order failed:", error.response?.data || error.message);
  alert("❌ Order failed: " + (error.response?.data?.message || error.message));
  }

    // const data = await res.json();
    // if (res.ok) {
    //   alert("✅ Order placed successfully!");
    //   setShowForm(false);
    // } else {
    //   alert("❌ " + data.message);
    // }
  }


  const [addedMessage, setAddedMessage] = useState("");
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div style={{  textAlign: "center", marginTop: "50px" }}>
      <img src= "/images/giphy.gif" alt="Loading..." width="80"  />
    </div>;
  if (!product) return <div>Product not found!</div>;

  return (
    <div className="product-page">
      <div className="product-image-section">
        <img
          src={product.image}
          alt={product.name}
          className="product-page-image"
        />
      </div>

      <div className="product-details">
        <h2>{product.name}</h2>
        <p className="product-price">Price: ₹{product.price}</p>
        <p className="product-description">{product.description}</p>

        <div className="quantity-section">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        <button
          className="add-to-cart-btn"
          onClick={() =>{ addToCart(product, quantity);
            setAddedMessage("✅ Added to cart!");
            setTimeout( ()=>setAddedMessage(""),1000); 
          }
          }
        >
          🛒 Add to Cart
        </button>

        <button onClick={() => setShowForm(true)}>Buy Now</button>

        {addedMessage && <p className="added-message">{addedMessage}</p>}

        {showForm && (
        <div className="buy-form">
          <h3>Enter Shipping Details</h3>
          <form onSubmit={handleSubmit}>
            <input name="address" placeholder="Address" onChange={handleChange} required />
            <input name="city" placeholder="City" onChange={handleChange} required />
            <input name="postalCode" placeholder="Postal Code" onChange={handleChange} required />
            <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
            <button type="submit">Confirm Order</button>
          </form>
        </div>
      )}
      </div>
    </div>
  );
};

export default ProductPage;
