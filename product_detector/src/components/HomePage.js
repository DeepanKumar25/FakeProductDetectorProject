import React from "react";

const HomePage = () => {
  return (
    <div>
      <div className="main-content">
        <h1 style={textStyle}>
          Verify Your Product's Originality Using Blockchain
        </h1>
        {/* Add more content here */}
      </div>
    </div>
  );
};

const textStyle = {
  fontSize: "36px",
  fontWeight: "bold",
  color: "#333",
  textAlign: "center",
  marginBottom: "20px",
};
export default HomePage;
