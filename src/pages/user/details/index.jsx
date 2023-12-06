import React from "react";
import style from "./index.module.css";
import axios from "axios";
import Container from "@mui/material/Container";
import { Typography, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import styles from "./index.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    axios("http://localhost:3000/posts/" + id).then((res) => {
      setProduct(res.data);
    });
  }, []);
  console.log(product);
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
              Details
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

          <Grid item xs={12} sm={6} md={4} lg={3}>
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
                <button
                  name={product.id}
                  className={styles.heart}
                  onClick={() => {
                    handleRemoveToWishlist(user.id, {
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    });
                    dispatch(setCheck(true));
                  }}
                >
                  {" "}
                  <FavoriteIcon color="error" />
                </button>
                <button
                  className={styles.addtoCart}
                  style={{ cursor: "pointer", border: "none" }}
                  onClick={() => {
                    handleAddToCart(user.id, {
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      quantity: 1,
                    });
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
                  src={product.image}
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
              <div> {product.name}</div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                }}
              >
                <p style={{ textDecoration: "line-through" }}>
                  {product.price}.00$
                </p>{" "}
                <p>
                  {Math.round(
                    product.price -
                      (product.discountPercent / 100) * product.price
                  )}
                  .00$
                </p>
              </div>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Details;
