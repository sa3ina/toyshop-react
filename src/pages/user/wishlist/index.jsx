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
import { addToWishlist } from "../../../redux/slices/wishlistSlice";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { setCheck } from "../../../redux/slices/cardSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Wishlist() {
  const cardProd = useSelector((state) => state.products.posts);
  const checkValue = useSelector((state) => state.products.check);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(cardProducts());
  // }, [dispatch]);

  let user = JSON.parse(localStorage.getItem("loggedInUser")) || [];

  const handleIncrement = (index) => {
    const updatedBasket = [...userBasket];
    updatedBasket[index].quantity++;
    setUserBasket(updatedBasket);
  };

  const handleDecrement = (index) => {
    const updatedBasket = [...userBasket];
    if (updatedBasket[index].quantity > 1) {
      updatedBasket[index].quantity--;
      setUserBasket(updatedBasket);
    }
  };

  const handleAddToCart = async (userId, productId) => {
    await dispatch(addToCart({ userId, productId }));
    try {
      const response = await fetch(`http://localhost:3000/users/${user.id}`);
      const userData = await response.json();

      if (userData && userData.basket) {
        setUserBasket(userData.basket);
      }
    } catch (error) {
      console.error("Error fetching user basket:", error);
    }
  };
  const basketProd = useSelector((state) => state.basket.basketItems);

  const [userBasket, setUserBasket] = useState([]);

  useEffect(() => {
    const fetchUserBasket = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${user.id}`);
        const userData = await response.json();

        if (userData && userData.basket) {
          setUserBasket(userData.basket);
        }
      } catch (error) {
        console.error("Error fetching user basket:", error);
      }
    };

    fetchUserBasket();
  }, []);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};

    if (loggedInUser && loggedInUser.basket) {
      setUserBasket(loggedInUser.basket);
    }
  }, []);
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    userBasket.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };

  const totalPrice = calculateTotalPrice();
  const productIdToRemove = 1;

  const handleCheckout = async () => {
    try {
      await axios.put(`http://localhost:3000/users/${user.id}`, {
        basket: [],
      });
      setUserBasket([]);
      dispatch(clearCart());
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const wishlistProd = useSelector((state) => state.wishlist.wishlistItem);


  console.log(wishlistProd);


  let arrWishlist = JSON.parse(localStorage.getItem("loggedInUser"));
  console.log(arrWishlist?.wishlist);

  const handleRemoveToWishlist = async (userId, productId) => {
    await dispatch(addToWishlist({ userId, productId }));

    let currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

    console.log(productId);
    if (currentUser.wishlist.find((x) => x.id == productId.id)) {
      let idx = currentUser.wishlist.findIndex((x) => x.id == productId.id);
      currentUser.wishlist.splice(idx, 1);
      localStorage.setItem("loggedInUser", JSON.stringify(currentUser));
    }
    // setUserWishlist(currentUser.wishlist);?
  };

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
          {arrWishlist?.wishlist &&
            arrWishlist?.wishlist.map((elem, i) => (
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
                    <button
                      name={elem.id}
                      className={styles.heart}
                      onClick={() => {

                        handleRemoveToWishlist(user.id, {
                          id: elem.id,
                          name: elem.name,
                          price: elem.price,
                          image: elem.image,
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
                          id: elem.id,
                          name: elem.name,
                          price: elem.price,
                          image: elem.image,
                          quantity: 1,
                        });
                        dispatch(setCheck(true));
                      }}
                    >
                      ADD TO CART
                    </button>
                    <Link
                      to={"/products/" + elem.id}
                      className={styles.details}
                      style={{ cursor: "pointer", border: "none" }}
                    >
                      Details
                    </Link>
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
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "8px",
                    }}
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
            {userBasket.map((item, index) => (
              <ListItem key={index}>
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
                      src={item.image}
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
                      // alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <p style={{ fontWeight: "600" }}>{item.name}</p>
                    <p style={{ textAlign: "left" }}>
                      ${item.price * item.quantity}.00
                    </p>
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
                      onClick={() =>
                        dispatch(
                          removeFromCart({ id: user.id, prodId: item.id })
                        )
                      }
                    >
                      x
                    </button>
                    <div
                      className={styles.inc}
                      style={{
                        position: "absolute",
                        top: "75px",
                        right: "23px",
                        display: "flex",
                        gap: "20px",
                        padding: "2px 5px",
                      }}
                    >
                      <button
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDecrement(index)}
                      >
                        -
                      </button>
                      <button
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        {item.quantity}
                      </button>
                      <button
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          cursor: "pointer",
                        }}
                        onClick={() => handleIncrement(index)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </Typography>
              </ListItem>
            ))}

            <ListItem>
              <i className="bi bi-speedometer2 fs-5 me-3"></i>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "40px",
                  fontWeight: "600",
                }}
              >
                {" "}
                <button
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    padding: "10px",
                    borderRadius: "5px",

                    cursor: "pointer",
                  }}
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
                <p>Total count: {totalPrice}.00$</p>
              </div>
            </ListItem>
          </List>
        </Paper>
      </Grid>
    </>
  );
}

export default Wishlist;
