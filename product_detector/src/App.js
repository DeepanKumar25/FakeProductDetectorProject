import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import HomePage from "./components/HomePage";
import QRCodeDecoder from "./components/Decoder";
import ProductForm from "./components/ProductForm";
const App = () => {
  return (
    <Router>
      <NavBar/>
      <Routes>

          <Route path="/" Component={HomePage} />
          <Route path="/add-product" Component={ProductForm} />
          <Route path="/verify-product" Component={QRCodeDecoder} />
      </Routes>
    </Router>
  );
};

export default App;
