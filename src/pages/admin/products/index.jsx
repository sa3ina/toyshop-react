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
import Dashboard from "../dashboard";
function AdminProducts() {
  const cardProd = useSelector((state) => state.products.posts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cardProducts());
    console.log(cardProducts());
  }, [dispatch]);
  return (
    <Grid container>
      <Dashboard />

      <Grid item lg={9} md={8} xs={12}>
        <Paper
          elevation={3}
          style={{
            padding: "16px",
            width: "100%",
          }}
        >
          <TableContainer component={Paper} style={{ height: "100vh" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Brand</TableCell>
                  <TableCell>Collection</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Sold</TableCell>
                  <TableCell>Availability</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cardProd.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      <img
                        src={product.image}
                        alt=""
                        style={{ width: "32px", height: "32px" }}
                      />
                    </TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>{product.collection}</TableCell>
                    <TableCell>{product.rating}</TableCell>
                    <TableCell>{product.sold}</TableCell>
                    <TableCell>
                      {product.availability ? "true" : "false"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AdminProducts;
