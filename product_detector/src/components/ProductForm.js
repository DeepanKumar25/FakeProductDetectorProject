import React, { useState } from "react";
// import QRCode from 'qrcode.react';
// import Layout from './Layout';
import qr from "qrcode";
import NavBar from "./Navbar";
import { ethers } from "ethers";
import abi from "../abi";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [url, setUrl] = useState("");

  const generateQR = async () => {
    // Create an object with the data you want to encode
    const data = {
      name: formData.name,
      id: formData.id,
      price: formData.price,
    };

    // Convert the data object to a JSON string
    const jsonData = JSON.stringify(data);

    // Encode the JSON string into a QR code
    const qrCodeURL = `https://localhost:3000/add-product?data=${encodeURIComponent(
      jsonData
    )}`;

    qr.toDataURL(qrCodeURL, (err, url) => {
      if (err) {
        console.error(err);
      } else {
        console.log(url);
        setUrl(url);
      }
    });
  };
  const clearData = () => {
    setFormData({
      id: "",
      name: "",
      price: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Do something with the form data, like sending it to an API or storing it.
    console.log(formData);

    // Set the submitted state to true
    setSubmitted(true);

    generateQR();
    clearData();

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0xd27eAFE831Bc7745494Aa7B487b7F1D59dFD8Fd2",
      abi,
      signer
    );
    console.log(contract);

    await contract.uploadProduct(formData.id, formData.name, formData.price);
  };

  return (
    <div>
      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Submit
        </button>
      </form>

      {submitted && (
        <div>
          <h3>Generated QR Code:</h3>
          {/* <QRCode value={JSON.stringify(formData)} size={128} /> */}
          <img src={url}></img>
        </div>
      )}
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  border: "2px solid #ccc",
  borderRadius: "4px",
};

const buttonStyle = {
  background: "#4CAF50",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default ProductForm;
