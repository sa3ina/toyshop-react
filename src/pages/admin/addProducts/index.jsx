import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Dashboard from "../dashboard";
function AddProducts() {
  return (
    <>
      <Grid container>
        <Dashboard />

        <Grid item xs={4} style={{ margin: "0 auto" }}>
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
            <TextField variant="outlined" />
            <label htmlFor="">Brand</label>
            <TextField variant="outlined" />
            <label htmlFor="">Collection</label>
            <TextField variant="outlined" />
            <label htmlFor="">Price</label>
            <TextField variant="outlined" />

            <button
              style={{
                backgroundColor: "#ffafcc",
                color: "black ",
                padding: "10px",
                border: "none",
              }}
            >
              Add product
            </button>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default AddProducts;
