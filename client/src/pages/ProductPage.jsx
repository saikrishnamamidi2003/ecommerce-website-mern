import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductPage.css";
import { CartContext } from "../context/CartContext";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading product...</div>;
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
          onClick={() => addToCart(product, quantity)}
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
