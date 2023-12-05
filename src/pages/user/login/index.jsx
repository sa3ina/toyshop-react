import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginSuccess, loginFailure } from "../../../redux/slices/loginSlice";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cardProducts());
  }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/users"); // Fetch user data from your mock server
      const users = await response.json();
      const foundUser = users.find(
        (user) => user.email == email && user.password === password
      );

      if (foundUser) {
        dispatch(loginSuccess(foundUser)); // Dispatch login success action with user data
        console.log(foundUser);
        localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
        navigate("/"); // Redirect to dashboard or any desired route
      } else {
        dispatch(loginFailure("Invalid email or password")); // Dispatch login failure action
      }
    } catch (error) {
      dispatch(loginFailure("An error occurred during login")); // Handle fetch error
      console.error("Error during login:", error);
    }
  };
  return (
    <>
      <Container>
        <Grid
          container
          spacing={8}
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={6}>
            <Typography
              style={{
                fontFamily: "Mali",
                fontSize: "45px",
                fontWeight: "600",
              }}
              variant="h3"
              align="center"
              color="RGB(31, 51, 50)"
            >
              Login
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
                Account
              </Typography>
            </div>{" "}
            <form action="" onSubmit={handleSubmit}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "20px",
                }}
              >
                <label htmlFor="">Your email</label>
                <input
                  value={email}
                  type="text"
                  style={{
                    height: "60px",
                    color: "grey",
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
                    color: "grey",
                    fontSize: "26px",
                    color: "black",
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p>Forgot your password?</p>
                <button className={styles.signin} type="submit">
                  {" "}
                  Sign in
                </button>

                <div className={styles.textbetweenlines}>
                  <div className={styles.line}></div>
                  <p className={styles.or}>OR</p>
                  <div className={styles.line}></div>
                </div>

                <button
                  onClick={() => {
                    navigate("/register");
                  }}
                  className={styles.create}
                >
                  Create account
                </button>
              </div>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Login;
