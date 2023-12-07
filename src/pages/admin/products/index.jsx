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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dashboard from "../dashboard";
// import { productItems } from "../../../redux/slices/productsSlice";
import {
  deleteProduct,
  editProductInDB,
} from "../../../redux/slices/cardSlice";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function AdminProducts() {
  const cardProd = useSelector((state) => state.products.posts);
  const products = useSelector((state) => state.products.products);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cardProducts());
    console.log(cardProducts());
  }, [dispatch]);
  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };
  const [search, setSearch] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedProductData, setEditedProductData] = useState({
    name: "",
    price: "",
    brand: "",
    collection: "",
    rating: "",
    sold: "",
  });

  const handleClose = () => {
    setOpen(false);
    setEditedProductData(null);
  };
  const handleOpen = (product) => {
    console.log("editing product: ", product);
    console.log(editedProductData);
    setEditedProductData(product);
    console.log(editedProductData);
    setOpen(true);
  };

  const handleEditSubmit = (product) => {
    dispatch(
      editedProductData({
        productId: product.id,
        updatedProduct: product,
      })
    );
    setIsEditModalOpen(false);
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [open, setOpen] = useState(false);
  const filteredProducts = cardProd.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
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
            <input
              type="text"
              placeholder="Type to search.."
              value={search}
              style={{ height: "30px", marginBottom: "20px" }}
              onChange={(e) => {
                setSearch(e.target.value);
                console.log(e.target.value);
              }}
            />
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
                    <TableCell>Delete</TableCell>
                    <TableCell>Edit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProducts.map((product) => (
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
                      <TableCell>{product.price}$</TableCell>
                      <TableCell>{product.brand}</TableCell>
                      <TableCell>{product.collection}</TableCell>
                      <TableCell>{product.rating}</TableCell>
                      <TableCell>{product.sold}</TableCell>
                      <TableCell>
                        {product.availability ? "true" : "false"}
                      </TableCell>
                      <TableCell>
                        <button
                          style={{
                            backgroundColor: "#BF211E",
                            color: "white",
                            border: "none",
                            padding: "10px",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDelete(product.id)}
                        >
                          delete
                        </button>
                      </TableCell>
                      <TableCell>
                        <button
                          style={{
                            backgroundColor: "#E5F993",
                            color: "black",
                            border: "none",
                            padding: "10px",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleOpen(product)}
                        >
                          edit
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              style={{
                fontWeight: "800",
                fontFamily: "revert-layer",
                margin: "15px",
                textAlign: "center",
                fontSize: "25px",
              }}
            >
              EDIT PRODUCT
            </Typography>
            <Box sx={{ flexGrow: 1 }} textAlign="center">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <label htmlFor="editName">Name</label> <br />
                  <input
                    name="name"
                    type="text"
                    id="editName"
                    defaultValue={editedProductData?.name}
                    style={{
                      borderRadius: "25px",
                      minHeight: "40px",
                      margin: "5px",
                      width: "100%",
                    }}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label htmlFor="editSurname">Price</label> <br />
                  <input
                    name="surname"
                    type="text"
                    id="editSurname"
                    defaultValue={editedProductData?.price}
                    style={{
                      borderRadius: "25px",
                      minHeight: "40px",
                      margin: "5px",
                      width: "100%",
                    }}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label htmlFor="editEmail">Brand</label> <br />
                  <input
                    name="email"
                    type="text"
                    id="editEmail"
                    defaultValue={editedProductData?.brand}
                    style={{
                      borderRadius: "25px",
                      minHeight: "40px",
                      margin: "5px",
                      width: "100%",
                    }}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label htmlFor="balance">Collection</label> <br />
                  <input
                    name="balance"
                    type="text"
                    id="balance"
                    defaultValue={editedProductData?.collection}
                    style={{
                      borderRadius: "25px",
                      minHeight: "40px",
                      margin: "5px",
                      width: "100%",
                    }}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label htmlFor="balance">Rating</label> <br />
                  <input
                    name="balance"
                    type="number"
                    id="balance"
                    defaultValue={editedProductData?.rating}
                    style={{
                      borderRadius: "25px",
                      minHeight: "40px",
                      margin: "5px",
                      width: "100%",
                    }}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label htmlFor="balance">Sold</label> <br />
                  <input
                    name="balance"
                    type="number"
                    id="balance"
                    defaultValue={editedProductData?.sold}
                    style={{
                      borderRadius: "25px",
                      minHeight: "40px",
                      margin: "5px",
                      width: "100%",
                    }}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="success"
                    style={{
                      padding: "14px 30px",
                      borderRadius: "12px",
                    }}
                    onClick={() => handleEditSubmit(editedProductData)}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default AdminProducts;
