import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useDispatch, useSelector } from "react-redux";
import { cardProducts } from "../../../redux/slices/cardSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
function Dashboard() {
  return (
    // <Grid container>
    <Grid item lg={3} md={4} xs={12}>
      <Paper
        elevation={3}
        style={{
          backgroundColor: "#fff",
          padding: "16px",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          className="m-2"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <i className="bi bi-bootstrap-fill me-3 fs-4"></i>

          <Typography
            variant="h6"
            className="brand-name fs-4"
            style={{ fontSize: "30px" }}
          >
            {" "}
            Admin Panel
          </Typography>
        </div>
        <hr className="text-dark" />
        <List component="nav">
          <ListItem>
            <i className="bi bi-speedometer2 fs-5 me-3"></i>
            <Typography variant="subtitle1">
              <Link
                to="/admin"
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "600",
                }}
              >
                {" "}
                Dashboard
              </Link>
            </Typography>
          </ListItem>
          <ListItem>
            <i className="bi bi-house fs-5 me-3"></i>
            <Typography variant="subtitle1">
              <Link
                to="/admin/adminProducts"
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "600",
                }}
              >
                {" "}
                Products
              </Link>
            </Typography>
          </ListItem>
          <ListItem>
            <i className="bi bi-house fs-5 me-3"></i>
            <Typography variant="subtitle1">
              <Link
                to="/admin/addProducts"
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "600",
                }}
              >
                Add Products
              </Link>
            </Typography>
          </ListItem>
          <ListItem>
            <i className="bi bi-house fs-5 me-3"></i>
            <Typography variant="subtitle1">
              <Link
                to="/admin/users"
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "600",
                }}
              >
                Users
              </Link>
            </Typography>
          </ListItem>
          <ListItem>
            <i className="bi bi-house fs-5 me-3"></i>
            <Typography variant="subtitle1">
              <Link
                to="/admin/addUser"
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "600",
                }}
              >
                Add Users
              </Link>
            </Typography>
          </ListItem>
        </List>
      </Paper>
    </Grid>
  );
}

export default Dashboard;
