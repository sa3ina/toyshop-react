import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useState } from "react";
import Dashboard from "../dashboard";
import axios from "axios";
function AddProducts() {
  function generateRatingNumber() {
    return Math.floor(Math.random() * 5) + 1;
  }
  function generateRandomNumber() {
    return Math.floor(Math.random() * 5) + 1;
  }
  const [img, setImg] = useState("");
  useEffect(() => {
    axios("https://source.unsplash.com/random/?toy").then((response) => {
      setImg(response.request.responseURL);
    });
  }, []);

  const randomNumber = generateRandomNumber();
  const randomRatingNumber = generateRatingNumber();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [collection, setCollection] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          discountPercent: 10,
          commentArray: "",
          rating: randomRatingNumber,
          description: "",
          brand,
          collection,
          sold: randomNumber,
          availability: false,
          image: img,
        }),
      });

      if (response.ok) {
        // navigate("/login");
        console.log("navigate");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
    }
    setName("");
    setBrand("");
    setCollection("");
    setPrice("");
  };
  return (
    <>
      <Grid container>
        <Dashboard />

        <Grid item xs={4} style={{ margin: "0 auto" }}>
          <form action="" onSubmit={handleFormSubmit}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "20px",
                height: "100vh",
              }}
            >
              <label htmlFor="">Name</label>
              <input
                value={name}
                type="text"
                style={{
                  height: "60px",
                  fontSize: "22px",
                  color: "black",
                }}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="">Brand</label>
              <input
                value={brand}
                type="text"
                style={{
                  height: "60px",
                  fontSize: "22px",
                  color: "black",
                }}
                onChange={(e) => setBrand(e.target.value)}
              />
              <label htmlFor="">Collection</label>
              <input
                value={collection}
                type="text"
                style={{
                  height: "60px",
                  fontSize: "22px",
                  color: "black",
                }}
                onChange={(e) => setCollection(e.target.value)}
              />
              <label htmlFor="">Price</label>
              <input
                value={price}
                type="number"
                style={{
                  height: "60px",
                  fontSize: "22px",
                  color: "black",
                }}
                onChange={(e) => setPrice(e.target.value)}
              />

              <button
                style={{
                  backgroundColor: "#ffafcc",
                  color: "black ",
                  padding: "10px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Add product
              </button>
            </div>
          </form>
        </Grid>
      </Grid>
    </>
  );
}

export default AddProducts;
