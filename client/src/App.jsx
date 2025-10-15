import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CartPage from "./pages/CartrPage.jsx";

function App(){
  return (
    <Router>
      <Layout>
          <Routes>
            <Route path="/" element={<Homepage/>} />
            <Route path="/product/:id" element={<ProductPage/>} />
            <Route path="/Login" element={<LoginPage/>} />
            <Route path="/cart" element={<CartPage/>} />
          </Routes>
      </Layout>
    </Router>
  );
}

export default App;