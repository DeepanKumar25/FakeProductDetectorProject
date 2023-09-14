import React, { useState } from "react";
import jsQR from "jsqr";
import abi from "../abi";
import { ethers } from "ethers";
const QRCodeDecoder = () => {
  const [decodedData, setDecodedData] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
  });
  const [isOri, setisOri] = useState(false);
  const [toggle, setToggle] = useState(false);
  const decodeQRCode = (qrCodeData) => {
    console.log(qrCodeData);
    // Your QR code decoding logic here (as shown in the previous code).
    const image = new Image();
    image.src = qrCodeData;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0, image.width, image.height);
      const imageData = context.getImageData(0, 0, image.width, image.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        setDecodedData(code.data);
      } else {
        console.error("QR code not found.");
      }
    };
    // After decoding the QR code, you can decode the URL parameter here.
    const urlParam = new URL(decodedData).searchParams.get("data");
    if (urlParam) {
      console.log("ji");
      const decodedParam = JSON.parse(decodeURIComponent(urlParam));
      console.log(decodedParam);
      // This will log the decoded URL parameter data.
      setFormData({
        id: decodedParam.id,
        name: decodedParam.name,
        price: decodedParam.price,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleVerifyClick = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const qrCodeData = e.target.result;
        decodeQRCode(qrCodeData);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleVerify = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0xd27eAFE831Bc7745494Aa7B487b7F1D59dFD8Fd2",
      abi,
      signer
    );

    const answer = await contract.isOriginalProduct(formData.id, formData.name);
    console.log(answer);
    setToggle(true);
    if (answer == true) {
      setisOri(true);
    } else {
      setisOri(false);
    }
  };

  const handleClear = () => {
    setFormData({
      id: "",
      name: "",
      price: "",
    });
    setToggle(false);
  };
  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button type="submit" onClick={handleVerifyClick}>
        Get Data
      </button>

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
      {isOri == true && toggle == true ? <h1>Your Product Is Original</h1> : ""}
      {!isOri && toggle ? <h1>OOPS...Your Product is Fake</h1> : ""}
      <button onClick={handleVerify}>Verify</button>
      <button onClick={handleClear}>Clear</button>
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

export default QRCodeDecoder;
