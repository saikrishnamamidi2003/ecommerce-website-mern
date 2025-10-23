import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; 
import "./AdminProductsPage.css";
import API_URL from "../api";
const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext); // ✅ admin user from context

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get( API_URL +"/api/products");
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  //const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Add Product
  const addProduct = async (e) => {
    e.preventDefault();
    // if (!user?.token || !user?.isAdmin) {
    //   alert("Only admin can add products!");
    //   return;
    // }

    try {
          const token = localStorage.getItem("token");

      const { data } = await axios.post(
         API_URL +"/api/products",
        { name, price, description, image },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("✅ Product added successfully!");
      setProducts([...products, data]);
      setName("");
      setPrice("");
      setDescription("");
      setImage("");
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("❌ Error adding product!");
    }
  };

  // ✅ Delete Product
  const deleteProduct = async (id) => {
    // const user = JSON.parse(localStorage.getItem("user"));

    // if (!user?.token || !user?.isAdmin) {
    //   alert("Only admin can delete products!");
    //   return;
    // }

    if (window.confirm("Are you sure you want to delete this product?")) {

      try {


        const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. Please log in as admin.");
      return;
    }
    //console.log(token);
    console.log("id: ",id);
        await axios.delete(`${API_URL}/api/products/${id}`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
        });
        setProducts(products.filter((p) => p._id !== id)); // remove deleted product
        setMessage("🗑️ Product deleted successfully!");
        setTimeout(() => setMessage(""), 2000);
      } catch (error) {
        console.error("Error deleting product:", error);
        setMessage("❌ Error deleting product!");
      }
    }
  };

  return (
    <div className="admin-products-page">
      <h1>Admin Products Dashboard</h1>

      {message && <p className="admin-message">{message}</p>}

      <div className="add-product-section">
        <h2>Add New Product</h2>
        <form onSubmit={addProduct} className="add-product-form">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          <button type="submit" className="add-btn">
            ➕ Add Product
          </button>
        </form>
      </div>

      <div className="product-list-section">
        <h2>All Products</h2>
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price (₹)</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>
                  <img
                    src={p.image}
                    alt={p.name}
                    className="admin-product-img"
                  />
                </td>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.description}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteProduct(p._id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductsPage;
