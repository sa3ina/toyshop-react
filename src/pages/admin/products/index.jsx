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
  const handleEdit = (product) => {
    setIsEditModalOpen(true);
  };

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
      editProductInDB({
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

  //Sorted product

  const [sortNameDirection, setSortNameDirection] = useState("");
  const [sortPriceDirection, setSortPriceDirection] = useState("");
  const [sortBrandDirection, setSortBrandDirection] = useState("");
  const [sortCollectionDirection, setSortCollectionDirection] = useState("");
  const [sortRatingDirection, setSortRatingDirection] = useState("");
  const [sortSoldDirection, setSortSoldDirection] = useState("");

  const handleSortName = () => {
    if (sortNameDirection == "") {
      setSortNameDirection("asc");
    } else {
      setSortNameDirection(sortNameDirection === "asc" ? "desc" : "asc");
    }
    setSortPriceDirection("");
    setSortBrandDirection("");
    setSortCollectionDirection("");
    setSortRatingDirection("");
    setSortSoldDirection("");
  };

  const handleSortPrice = () => {
    if (sortPriceDirection == "") {
      setSortPriceDirection("asc");
    } else {
      setSortPriceDirection(sortPriceDirection === "asc" ? "desc" : "asc");
    }
    setSortNameDirection("");
    setSortBrandDirection("");
    setSortCollectionDirection("");
    setSortRatingDirection("");
    setSortSoldDirection("");
  };

  const handleSortBrand = () => {
    if (sortBrandDirection == "") {
      setSortBrandDirection("asc");
    } else {
      setSortBrandDirection(sortBrandDirection === "asc" ? "desc" : "asc");
    }
    setSortNameDirection("");
    setSortPriceDirection("");
    setSortCollectionDirection("");
    setSortRatingDirection("");
    setSortSoldDirection("");
  };

  const handleSortColletion = () => {
    if (sortCollectionDirection == "") {
      setSortCollectionDirection("asc");
    } else {
      setSortCollectionDirection(
        sortCollectionDirection === "asc" ? "desc" : "asc"
      );
    }
    setSortNameDirection("");
    setSortPriceDirection("");
    setSortBrandDirection("");
    setSortRatingDirection("");
    setSortSoldDirection("");
  };

  const handleSortRating = () => {
    if (sortRatingDirection == "") {
      setSortRatingDirection("asc");
    } else {
      setSortRatingDirection(sortRatingDirection === "asc" ? "desc" : "asc");
    }
    setSortNameDirection("");
    setSortPriceDirection("");
    setSortBrandDirection("");
    setSortCollectionDirection("");
    setSortSoldDirection("");
  };

  const handleSortSold = () => {
    if (sortSoldDirection == "") {
      setSortSoldDirection("asc");
    } else {
      setSortSoldDirection(sortSoldDirection === "asc" ? "desc" : "asc");
    }
    setSortNameDirection("");
    setSortPriceDirection("");
    setSortBrandDirection("");
    setSortCollectionDirection("");
    setSortRatingDirection("");
  };

  const sortedData = filteredProducts.sort((a, b) => {
    if (sortNameDirection === "asc") {
      return a.name.localeCompare(b.name);
    }
    if (sortNameDirection === "desc") {
      return b.name.localeCompare(a.name);
    }

    if (sortPriceDirection === "asc") {
      return a.price - b.price;
    }
    if (sortPriceDirection === "desc") {
      return b.price - a.price;
    }

    if (sortBrandDirection === "asc") {
      return a.brand.localeCompare(b.brand);
    }
    if (sortBrandDirection === "desc") {
      return b.brand.localeCompare(a.brand);
    }

    if (sortCollectionDirection === "asc") {
      return a.collection.localeCompare(b.collection);
    }
    if (sortCollectionDirection === "desc") {
      return b.collection.localeCompare(a.collection);
    }

    if (sortRatingDirection === "asc") {
      return a.rating - b.rating;
    }
    if (sortRatingDirection === "desc") {
      return b.rating - a.rating;
    }

    if (sortSoldDirection === "asc") {
      return a.sold - b.sold;
    }
    if (sortSoldDirection === "desc") {
      return b.sold - a.sold;
    }
  });

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
            <div style={{ textAlign: "center" }}>
              <input
                type="text"
                placeholder="Type to search.."
                value={search}
                style={{
                  width: "35%",
                  minHeight: "40px",
                  borderRadius: "10px",
                  margin: "10px",
                }}
                onChange={(e) => {
                  setSearch(e.target.value);
                  console.log(e.target.value);
                }}
              />
              <button
                style={{
                  marginLeft: "10px",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  backgroundColor: "purple",
                  color: "white",
                  borderColor: "purple",
                }}
                onClick={handleSortName}
              >
                Sort by Name
              </button>
              <button
                style={{
                  marginLeft: "10px",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  backgroundColor: "purple",
                  color: "white",
                  borderColor: "purple",
                }}
                onClick={handleSortPrice}
              >
                Sort by Price
              </button>
              <button
                style={{
                  marginLeft: "10px",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  backgroundColor: "purple",
                  color: "white",
                  borderColor: "purple",
                }}
                onClick={handleSortBrand}
              >
                Sort by Brand
              </button>

              <button
                style={{
                  marginLeft: "10px",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  backgroundColor: "purple",
                  color: "white",
                  borderColor: "purple",
                }}
                onClick={handleSortColletion}
              >
                Sort by Collection
              </button>
              <button
                style={{
                  marginLeft: "10px",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  backgroundColor: "purple",
                  color: "white",
                  borderColor: "purple",
                }}
                onClick={handleSortRating}
              >
                Sort by Rating
              </button>
              <button
                style={{
                  marginLeft: "10px",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  backgroundColor: "purple",
                  color: "white",
                  borderColor: "purple",
                }}
                onClick={handleSortSold}
              >
                Sort by Sold
              </button>
            </div>

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
                            backgroundColor: "#82CCFF",
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
                  <label htmlFor="editPrice">Price</label> <br />
                  <input
                    name="price"
                    type="text"
                    id="editPrice"
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
                  <label htmlFor="editBrand">Brand</label> <br />
                  <input
                    name="brand"
                    type="text"
                    id="editBrand"
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
                  <label htmlFor="editCollrction">Collection</label> <br />
                  <input
                    name="collection"
                    type="text"
                    id="editCollection"
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
                  <label htmlFor="editRating">Rating</label> <br />
                  <input
                    name="rating"
                    type="number"
                    id="editRating"
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
                  <label htmlFor="editSold">Sold</label> <br />
                  <input
                    name="sold"
                    type="number"
                    id="editSold"
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
