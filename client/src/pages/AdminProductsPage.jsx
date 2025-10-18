import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    countInStock: "",
    image: "",
  });
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  // Fetch products
  const fetchProducts = async () => {
    const { data } = await axios.get("http://localhost:5000/api/products");
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product
  const addProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", newProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("✅ Product added successfully!");
      setTimeout(() => setMessage(""), 3000); // auto hide after 3s
      fetchProducts();
      setNewProduct({ name: "", price: "", description: "", countInStock: "", image: "" });
    } catch (error) {
      alert("Error adding product");
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("🗑 Product deleted!");
      setTimeout(() => setMessage(""), 3000);
      fetchProducts();
    }
  };

  return (
    <div className="admin-products">
      <h2>Admin Product Management</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}

      {/* Add product form */}
      <form onSubmit={addProduct}>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.countInStock}
          onChange={(e) => setNewProduct({ ...newProduct, countInStock: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <button type="submit">Add Product</button>
      </form>

      {/* Product list */}
      <h3>All Products</h3>
      {products.map((p) => (
        <div key={p._id}>
          <p>
            {p.name} — ₹{p.price}
            <button onClick={() => deleteProduct(p._id)}>Delete</button>
          </p>
        </div>
      ))}
    </div>
  );
};

export default AdminProductsPage;
