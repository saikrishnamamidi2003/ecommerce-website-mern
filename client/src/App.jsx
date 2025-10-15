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
            <Route path="/" element={<ProductPage/>} />
            <Route path="/" element={<LoginPage/>} />
            <Route path="/" element={<CartPage/>} />
          </Routes>
      </Layout>
    </Router>
  );
}

export default App;