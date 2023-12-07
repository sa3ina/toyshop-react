import React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { Typography, Grid } from "@mui/material";
import {
  faChevronRight,
  faStar,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useDispatch, useSelector } from "react-redux";
import { cardProducts } from "../../../redux/slices/cardSlice";
import { useEffect } from "react";
import styles from "./index.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
function Register() {
  const navigate = useNavigate();

  const cardProd = useSelector((state) => state.products.posts);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
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
          lastname,
          email,
          password,
          orders: [],
          balance: 0,
          basket: [],
          wishlist: [],
          isAdmin: false,
          comments: "",
          reviews: "",
        }),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        console.error("Registration failed");
        // Handle error scenarios based on API response
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
      // Handle any other error scenarios, e.g., network issues
    }
  };

  useEffect(() => {
    dispatch(cardProducts());
  }, [dispatch]);

  return (
    <Container>
      <Grid
        container
        marginTop={1}
        marginBottom={1}
        spacing={8}
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={6}>
          <Typography
            style={{ fontFamily: "Mali", fontSize: "45px", fontWeight: "600" }}
            variant="h3"
            align="center"
            color="RGB(31, 51, 50)"
            marginBottom="10px"
          >
            Register
          </Typography>
          <div
            style={{
              gap: "17px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography style={{ fontFamily: "Mali" }} variant="subtitle1">
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "black",
                  cursor: "pointer",
                }}
              >
                Home
              </Link>
            </Typography>
            <Typography style={{ marginTop: "3px" }}>
              <FontAwesomeIcon icon={faChevronRight} />
            </Typography>
            <Typography
              variant="subtitle1"
              style={{ fontFamily: "Mali", marginBottom: "10px" }}
            >
              Create Account
            </Typography>
          </div>{" "}
          <form action="" onSubmit={handleFormSubmit}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              <label htmlFor="">First name</label>
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
              <label htmlFor="">Last name</label>
              <input
                value={lastname}
                type="text"
                style={{
                  height: "60px",
                  fontSize: "22px",
                  color: "black",
                }}
                onChange={(e) => setLastname(e.target.value)}
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
              <p>Forgot your password?</p>
              <button
                type="submit"
                className={styles.signin}
                style={{ cursor: "pointer" }}
              >
                {" "}
                Create now
              </button>

              <button
                className={styles.create}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
            </div>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Register;
