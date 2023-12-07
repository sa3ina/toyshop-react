import React from "react";

function NoPage() {
  return (
    <div
      style={{
        backgroundColor: "#e2ebf1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        fontFamily: "Mali",
        gap: "30px",
      }}
    >
      <h1>Page Not Found</h1>
      <img
        style={{ height: "500px" }}
        src="https://www.svgrepo.com/download/9717/bear.svg"
        alt=""
      />
    </div>
  );
}

export default NoPage;
