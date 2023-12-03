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

function Wishlist() {
  const cardProd = useSelector((state) => state.products.posts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cardProducts());
    console.log(cardProducts());
  }, [dispatch]);
  console.log(cardProd);
  return (
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
            style={{ fontFamily: "Mali", fontSize: "45px", fontWeight: "600" }}
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
              Home
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
                <div className={styles.addtoCart}>ADD TO CART</div>

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
  );
}

export default Wishlist;
