import React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { Typography, Grid } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";
import {
  faChevronRight,
  faStar,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { cardProducts } from "../../../redux/slices/cardSlice";
import { useEffect } from "react";
import styles from "./index.module.css";
import { setCheck } from "../../../redux/slices/cardSlice";
function Wishlist() {
  const cardProd = useSelector((state) => state.products.posts);
  const checkValue = useSelector((state) => state.products.check);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cardProducts());
    console.log(cardProducts());
  }, [dispatch]);
  console.log(cardProd);
  return (
    <>
      <Container>
        <Grid
          marginTop={0}
          container
          spacing={8}
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={12}>
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
              Wishlist
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
                Wishlist
              </Typography>
            </div>
          </Grid>

          {/* {Array.from(Array(6)).map((_, index) => ( */}
          {cardProd.map((elem, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <Card
                className={styles.cardd}
                sx={{ minWidth: 275 }}
                style={{ marginBottom: "15px" }}
              >
                <CardContent
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100%",
                  }}
                >
                  <div className={styles.heart}>
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                  <button
                    className={styles.addtoCart}
                    style={{ cursor: "pointer", border: "none" }}
                    onClick={() => {
                      dispatch(setCheck(true));
                    }}
                  >
                    ADD TO CART
                  </button>

                  <img
                    className={styles.card}
                    style={{
                      height: "290px",
                      width: "280px",
                      objectFit: "cover",
                    }}
                    src={elem.image}
                    alt=""
                  />
                </CardContent>
              </Card>
              <Typography
                // align="center"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <div>
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <div> {elem.name}</div>

                <div
                  style={{ display: "flex", flexDirection: "row", gap: "8px" }}
                >
                  <p style={{ textDecoration: "line-through" }}>
                    {elem.price}.00$
                  </p>{" "}
                  <p>
                    {Math.round(
                      elem.price - (elem.discountPercent / 100) * elem.price
                    )}
                    .00$
                  </p>
                </div>
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Grid
        item
        lg={3}
        md={4}
        xs={12}
        style={{
          display: checkValue ? "block" : "none",
          position: "fixed",
          top: "0",
          right: "0",
          zIndex: "1000",
          height: "100vh",
          width: "30vw",
        }}
        className={styles.basket}
      >
        <Paper
          elevation={3}
          style={{
            backgroundColor: "#fff",
            padding: "16px",
            width: "100%",
            height: "100%",
          }}
        >
          <button
            style={{
              position: "absolute",
              top: "100px",
              right: "30px",
              fontSize: "30px",
              fontFamily: "arial",
              border: "none",
              cursor: "pointer",
              backgroundColor: "transparent",
            }}
            onClick={() => {
              dispatch(setCheck(false));
            }}
          >
            x
          </button>
          <div
            className="m-2"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <i className="bi bi-bootstrap-fill me-3 fs-4"></i>

            <Typography
              variant="h6"
              className="brand-name fs-4"
              style={{ fontSize: "30px", marginTop: "80px" }}
            >
              {" "}
              Shopping cart
            </Typography>
          </div>
          <hr className="text-dark" />
          <List component="nav">
            <ListItem>
              <i className="bi bi-speedometer2 fs-5 me-3"></i>
              <div>
                <Typography
                  variant="subtitle1"
                  style={{
                    display: "flex",
                    gap: "20px",
                  }}
                >
                  <div style={{ display: "flex", marginBottom: "10px" }}>
                    {" "}
                    <img
                      src="https://cdn.shopify.com/s/files/1/0524/8555/4369/products/kids-toy-product-06.jpg?v=1698814397&width=140"
                      alt=""
                      width={"100px"}
                      height={"100px"}
                      className={styles.images}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <p style={{ fontWeight: "600" }}>Soft panda teddy</p>
                    <p>$27.00</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <button
                      style={{
                        position: "absolute",
                        top: "15px",
                        right: "23px",
                        borderRadius: "50%",
                        padding: "0 5px",
                        cursor: "pointer",
                      }}
                    >
                      x
                    </button>
                    <div
                      className={styles.inc}
                      style={{
                        position: "absolute",
                        top: "80px",
                        right: "23px",
                        display: "flex",
                        gap: "20px",
                        padding: "0 7px",
                      }}
                    >
                      <p>-</p>
                      <p>1</p>
                      <p>+</p>
                    </div>
                  </div>
                </Typography>
                <Typography
                  variant="subtitle1"
                  style={{
                    display: "flex",
                    gap: "20px",
                  }}
                >
                  <div>
                    {" "}
                    <img
                      src="https://cdn.shopify.com/s/files/1/0524/8555/4369/products/kids-toy-product-13.jpg?v=1698814434&width=140"
                      alt=""
                      width={"100px"}
                      height={"100px"}
                      className={styles.images}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <p style={{ fontWeight: "600" }}>Soft panda teddy</p>
                    <p>$45.00</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <button
                      style={{
                        position: "absolute",
                        top: "15px",
                        right: "23px",
                        borderRadius: "50%",
                        padding: "0 5px",
                        cursor: "pointer",
                      }}
                    >
                      x
                    </button>
                    <div
                      className={styles.inc}
                      style={{
                        position: "absolute",
                        bottom: "22px",
                        right: "23px",
                        display: "flex",
                        gap: "20px",
                        padding: "0 7px",
                      }}
                    >
                      <p>-</p>
                      <p>1</p>
                      <p>+</p>
                    </div>
                  </div>
                </Typography>
              </div>
            </ListItem>
          </List>
        </Paper>
      </Grid>
    </>
  );
}

export default Wishlist;
