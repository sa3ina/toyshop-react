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
import { useDispatch, useSelector } from "react-redux";
import { cardProducts } from "../../../redux/slices/cardSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import styles from "./index.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addToWishlist } from "../../../redux/slices/wishlistSlice";
import { setWishCheck } from "../../../redux/slices/cardSlice";
import { addToCart } from "../../../redux/slices/basketSlice";
function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    axios("http://localhost:3000/posts/" + id).then((res) => {
      setProduct(res.data);
    });
  }, []);
  console.log(product);

  let user = JSON.parse(localStorage.getItem("loggedInUser")) || [];

  const cardProd = useSelector((state) => state.products.posts);
  const checkValue = useSelector((state) => state.products.check);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cardProducts());
  }, [dispatch]);

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
  const [userWishlist, setUserWishlist] = useState([]);

  const handleAddToWishlist = async (userId, productId) => {
    await dispatch(addToWishlist({ userId, productId }));
    try {
      const response = await fetch(`http://localhost:3000/users/${user.id}`);
      const userData = await response.json();

      if (userData && userData.wishlist) {
        setUserWishlist(userData.wishlist);
      }
    } catch (error) {
      console.error("Error fetching user wishlist:", error);
    }
    let currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (currentUser.wishlist.find((x) => x.id == productId.id)) {
      let idx = currentUser.wishlist.findIndex((x) => x.id == productId.id);
      currentUser.wishlist.splice(idx, 1);
      localStorage.setItem("loggedInUser", JSON.stringify(currentUser));
    } else {
      let find = cardProd.find((elem) => elem.id == productId.id);
      currentUser.wishlist.push(find);
      console.log("pushed: ", currentUser);
      localStorage.setItem("loggedInUser", JSON.stringify(currentUser));
    }
    setUserWishlist(currentUser.wishlist);
  };

  const wishlistProd = useSelector((state) => state.wishlist.wishlistItem);

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
    const fetchUserWishlist = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${user.id}`);
        const userData = await response.json();

        if (userData && userData.wishlist) {
          setUserWishlist(userData.wishlist);
        }
      } catch (error) {
        console.error("Error fetching user wishlist:", error);
      }
    };

    fetchUserWishlist();
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

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};

    if (loggedInUser && loggedInUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    }
  }, []);

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

    let arrWishlist = JSON.parse(localStorage.getItem("loggedInUser"));
    console.log(arrWishlist.wishlist);
  };
  const StarRating = ({ rating }) => {
    const stars = [];

    // Assuming rating is out of 5 stars
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesomeIcon
          icon={faStar}
          key={i}
          style={{ color: i < rating ? "gold" : "gray" }}
        />
      );
    }

    return <div>{stars}</div>;
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
          style={{ minHeight: "50vh" }}
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
                Details
              </Typography>
            </div>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            style={{
              display: "flex",
              minWidth: "600px",
              justifyContent: "center",
            }}
          >
            <Card
              className={styles.cardd}
              sx={{ minWidth: 450 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "15px",
              }}
            >
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "100%",
                }}
              >
                <button
                  name={product.id}
                  className={styles.heart}
                  onClick={() => {
                    handleAddToWishlist(user.id, {
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    });
                    console.log("details");
                  }}
                >
                  {userWishlist.find((x) => x.id === product.id) ? (
                    <FavoriteIcon color="error" />
                  ) : (
                    <FavoriteBorderIcon color="error" />
                  )}
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
                flex: "left",
                display: "flex",
                alignItems: "start",
                justifyContent: "center",
                flexDirection: "column",
                minWidth: "450px",
                marginLeft: "25px",
              }}
            >
              <div
                style={{
                  fontSize: "30px",
                  fontWeight: "900",
                  fontFamily: "cursive",
                  marginBottom: "7px",
                }}
              >
                {" "}
                {product.name}
              </div>
              <div style={{ marginBottom: "10px" }}>
                <StarRating rating={product.rating} />
              </div>
              <p
                style={{
                  fontFamily: "cursive",
                  fontSize: "20px",
                  marginBottom: "10px",
                }}
              >
                <b>Price:</b>{" "}
                {Math.round(
                  product.price -
                    (product.discountPercent / 100) * product.price
                )}
                .00$
                <p
                  style={{
                    textDecoration: "line-through",
                    fontFamily: "cursive",
                    fontSize: "19px",
                    color: "grey",
                    display: "inline",
                    marginLeft: "9px",
                  }}
                >
                  {product.price}.00$
                </p>
              </p>

              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "500",
                  fontFamily: "cursive",
                  marginBottom: "15px",
                }}
              >
                {product.description}
              </div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                  fontFamily: "cursive",
                  marginBottom: "10px",
                }}
              >
                <b> Brand:</b> {product.brand}
              </div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                  fontFamily: "cursive",
                  marginBottom: "10px",
                }}
              >
                <b> Collection:</b> {product.collection}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                }}
              ></div>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Details;
