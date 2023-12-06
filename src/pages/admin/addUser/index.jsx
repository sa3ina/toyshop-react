import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Dashboard from "../dashboard";
function AddUser() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          surname,
          email,
          password,
          orders: [],
          balance: 0,
          basket: [],
          favorites: [],
          isAdmin: false,
          comments: "",
          reviews: "",
        }),
      });

      if (response.ok) {
        // navigate("/login");
        console.log("navigate");
      } else {
        console.error("Registration failed");
        // Handle error scenarios based on API response
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
      // Handle any other error scenarios, e.g., network issues
    }
    setName("");
    setSurname("");
    setEmail("");
    setPassword("");
  };
  return (
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
            <label htmlFor="">Surname</label>
            <input
              value={surname}
              type="text"
              style={{
                height: "60px",
                fontSize: "22px",
                color: "black",
              }}
              onChange={(e) => setSurname(e.target.value)}
            />
            <label htmlFor="">Email</label>
            <input
              value={email}
              type="text"
              style={{
                height: "60px",
                fontSize: "26px",
                color: "black",
              }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="">Password</label>
            <input
              value={password}
              type="password"
              style={{
                height: "60px",
                fontSize: "26px",
                color: "black",
              }}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              style={{
                backgroundColor: "#A2D2FF",
                color: "black ",
                padding: "10px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Add user
            </button>
          </div>
        </form>
      </Grid>
    </Grid>
  );
}

export default AddUser;
