import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CartPage from "./pages/CartrPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

import ShippingPage from "./pages/ShippingPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
function App(){
  return (
      <Layout>
          <Routes>
            <Route path="/" element={<Homepage/>} />
            <Route path="/product/:id" element={<ProductPage/>} />
            <Route path="/login" element={<LoginPage/>} />
             <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage/>} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/placeorder" element={<PlaceOrderPage />} />
            <Route path="/order/:id" element={<OrderDetailsPage />} />
          </Routes>
      </Layout>
  );
}

export default App;