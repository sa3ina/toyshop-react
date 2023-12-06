import React from "react";
import CardsProduct from "../../../components/cards";
import style from "../home/index.module.css";
import EastIcon from "@mui/icons-material/East";
import "../../../grid.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import axios from "axios";
import { Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faStar,
  faHeart,
  faBox,
  faCircleCheck,
  faCommentDots,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { cardProducts } from "../../../redux/slices/cardSlice";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.css";
import gucci from "../../../assets/image/brandes/gucci.avif";
import chanel from "../../../assets/image/brandes/chanel.avif";
import asos from "../../../assets/image/brandes/asos.avif";
import prada from "../../../assets/image/brandes/prada.avif";
import celine from "../../../assets/image/brandes/celine.avif";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { setCheck } from "../../../redux/slices/cardSlice";
import { addToCart, removeFromCart } from "../../../redux/slices/basketSlice";
import { clearCart } from "../../../redux/slices/basketSlice";

import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/slices/wishlistSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Wishlist from "../wishlist";
function Home() {
  let user = JSON.parse(localStorage.getItem("loggedInUser")) || [];

  const navigate = useNavigate();
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

  // useEffect(() => {
  //   dispatch(basketProducts());
  // }, [dispatch]);

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

  const handleRemoveFromCart = async (productIdToRemove) => {
    try {
      await axios.put(`http://localhost:3000/users/${user.id}`, {
        basket: [...basket],
      });

      dispatch(removeFromCart(user.id, productIdToRemove));
    } catch (error) {
      console.error("Error during removal:", error);
    }
  };

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

  return (
    <>
      <div style={{ backgroundColor: "#88A9A8" }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            <Grid
              container
              spacing={0}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#F7FCF7",
                fontWeight: "500",
                fontFamily: "Bradley hand,cursive",
                textAlign: "center",
              }}
            >
              <Grid
                item
                sm={12}
                md={12}
                lg={3}
                xl={3}
                style={{ borderRight: "1px solid #F7FCF7", padding: "20px" }}
              >
                <p>Refer a Friend. Get 20% Off</p>
              </Grid>
              <Grid
                item
                sm={12}
                md={12}
                lg={3}
                xl={3}
                style={{ borderRight: "1px solid #F7FCF7", padding: "20px" }}
              >
                <p>Subscribe Today and Get $10</p>
              </Grid>
              <Grid item sm={12} md={12} lg={3} xl={3}>
                <p>Subscribe Today and Get $10</p>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>

      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        style={{ marginBottom: "150px" }}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <div className={style.slider1}>
            <Container maxWidth="xl">
              <div className={style.overlowHidden}>
                <img
                  src="https://176ghzqe7rspygq6-52485554369.shopifypreview.com/cdn/shop/files/demo-kids-toy-01_small.png?v=1698815628"
                  alt=""
                  loading="lazy"
                />
              </div>
              <div className={style.overlowHidden}>
                <div className={style.title}>
                  <h1>
                    Fashion fun <br />
                    for little kids
                  </h1>
                </div>
              </div>
              <div className={style.overlowHidden}>
                <p>Get ready for playtime with our fun kids clothing.</p>
              </div>
              <div className={style.overlowHidden}>
                <button
                  onClick={() => {
                    navigate("/products");
                  }}
                >
                  Shop Now
                  <span style={{ paddingLeft: "3px" }}>
                    <EastIcon />
                  </span>
                </button>
              </div>
            </Container>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.slider2}>
            <Container maxWidth="xl">
              <div className={style.overlowHidden}>
                <img
                  src="https://176ghzqe7rspygq6-52485554369.shopifypreview.com/cdn/shop/files/demo-kids-toy-01_small.png?v=1698815628"
                  alt=""
                  loading="lazy"
                />
              </div>
              <div className={style.overlowHidden}>
                <div className={style.title}>
                  <h1>
                    Best choice <br />
                    for your kids
                  </h1>
                </div>
              </div>
              <div className={style.overlowHidden}>
                <p>Our baby stuffs are cute, affordable, and stylish.</p>
              </div>
              <div className={style.overlowHidden}>
                <button
                  onClick={() => {
                    navigate("/products");
                  }}
                >
                  Shop Now
                  <span style={{ paddingLeft: "3px" }}>
                    <EastIcon />
                  </span>
                </button>
              </div>
            </Container>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.slider3}>
            <Container maxWidth="xl">
              <div className={style.overlowHidden}>
                <img
                  src="https://176ghzqe7rspygq6-52485554369.shopifypreview.com/cdn/shop/files/demo-kids-toy-01_small.png?v=1698815628"
                  alt=""
                  loading="lazy"
                />
              </div>
              <div className={style.overlowHidden}>
                <div className={style.title}>
                  <h1>
                    Buy soft toys <br />
                    for babies
                  </h1>
                </div>
              </div>
              <div className={style.overlowHidden}>
                <p>Explore a world of fun with our toy collection.</p>
              </div>
              <div className={style.overlowHidden}>
                <button
                  onClick={() => {
                    navigate("/products");
                  }}
                >
                  Shop Now
                  <span style={{ paddingLeft: "3px" }}>
                    <EastIcon />
                  </span>
                </button>
              </div>
            </Container>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.slider4}>
            <Container maxWidth="xl">
              <div className={style.overlowHidden}>
                <img
                  src="https://176ghzqe7rspygq6-52485554369.shopifypreview.com/cdn/shop/files/demo-kids-toy-01_small.png?v=1698815628"
                  alt=""
                  loading="lazy"
                />
              </div>
              <div className={style.overlowHidden}>
                <div className={style.title}>
                  <h1>
                    Fashion fun <br />
                    for little kids
                  </h1>
                </div>
              </div>
              <div className={style.overlowHidden}>
                <p>Get ready for playtime with our fun kids clothing.</p>
              </div>
              <div className={style.overlowHidden}>
                <button
                  onClick={() => {
                    navigate("/products");
                  }}
                >
                  Shop Now{" "}
                  <span style={{ paddingLeft: "3px" }}>
                    <EastIcon />
                  </span>
                </button>
              </div>
            </Container>
          </div>
        </SwiperSlide>
      </Swiper>

      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={7} className={style.container}>
            <Grid item className={style.items}>
              <Link to="/products" className={style.icons}>
                <div className={style.hover}>
                  <div className={style.icon}>
                    <img
                      src="https://176ghzqe7rspygq6-52485554369.shopifypreview.com/cdn/shop/files/demo-kids-toy-icon-01.svg?v=1698815628"
                      alt=""
                      width={78}
                      height={67}
                    />
                  </div>
                </div>
              </Link>
              <Link to="/products" className={style.categories}>
                Dolls
              </Link>
            </Grid>
            <Grid item className={style.items}>
              <Link to="/products" className={style.icons}>
                <div className={style.hover}>
                  <div className={style.icon}>
                    <img
                      src="https://176ghzqe7rspygq6-52485554369.shopifypreview.com/cdn/shop/files/demo-kids-toy-icon-02.svg?v=1698815628"
                      alt=""
                      width={78}
                      height={67}
                    />
                  </div>
                </div>
              </Link>
              <Link to="/products" className={style.categories}>
                Toys
              </Link>
            </Grid>
            <Grid item className={style.items}>
              <Link to="/products" className={style.icons}>
                <div className={style.hover}>
                  <div className={style.icon}>
                    <img
                      src="https://176ghzqe7rspygq6-52485554369.shopifypreview.com/cdn/shop/files/demo-kids-toy-icon-03.svg?v=1698815628"
                      alt=""
                      width={78}
                      height={67}
                    />
                  </div>
                </div>
              </Link>
              <Link to="/products" className={style.categories}>
                Clothes
              </Link>
            </Grid>
            <Grid item className={style.items}>
              <Link to="/products" className={style.icons}>
                <div className={style.hover}>
                  <div className={style.icon}>
                    <img
                      src="https://176ghzqe7rspygq6-52485554369.shopifypreview.com/cdn/shop/files/demo-kids-toy-icon-04.svg?v=1698815628"
                      alt=""
                      width={78}
                      height={67}
                    />
                  </div>
                </div>
              </Link>
              <Link to="/products" className={style.categories}>
                Sensory
              </Link>
            </Grid>
            <Grid item className={style.items}>
              <Link to="/products" className={style.icons}>
                <div className={style.hover}>
                  <div className={style.icon}>
                    <img
                      src="https://176ghzqe7rspygq6-52485554369.shopifypreview.com/cdn/shop/files/demo-kids-toy-icon-05.svg?v=1698815628"
                      alt=""
                      width={78}
                      height={67}
                    />
                  </div>
                </div>
              </Link>
              <Link to="/products" className={style.categories}>
                Games
              </Link>
            </Grid>
            <Grid item className={style.items}>
              <Link to="/products" className={style.icons}>
                <div className={style.hover}>
                  <div className={style.icon}>
                    <img
                      src="https://176ghzqe7rspygq6-52485554369.shopifypreview.com/cdn/shop/files/demo-kids-toy-icon-06.svg?v=1698815628"
                      alt=""
                      width={78}
                      height={67}
                    />
                  </div>
                </div>
              </Link>
              <Link to="/products" className={style.categories}>
                Strollers
              </Link>
            </Grid>
            <Grid item className={style.items}>
              <Link to="/products" className={style.icons}>
                <div className={style.hover}>
                  <div className={style.icon}>
                    <img
                      src="https://176ghzqe7rspygq6-52485554369.shopifypreview.com/cdn/shop/files/demo-kids-toy-icon-07.svg?v=1698815628"
                      alt=""
                      width={78}
                      height={67}
                    />
                  </div>
                </div>
              </Link>
              <Link to="/products" className={style.categories}>
                Dolls
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={5} style={{ marginBottom: "100px" }}>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <div className={style.box1}>
                <div className={style.titles}>
                  <h2>
                    Wood toys <br />
                    for your kids
                  </h2>
                  <p>Get 20% flate your first purchase</p>
                  <button
                    onClick={() => {
                      navigate("/products");
                    }}
                  >
                    SHOP NOW
                    <span>
                      <EastIcon />
                    </span>
                  </button>
                </div>
              </div>
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <div className={style.box2}>
                <div className={style.titles}>
                  <h2>
                    Early black <br /> friday specials
                  </h2>
                  <p>Big discount 50% off on all order</p>
                  <button
                    onClick={() => {
                      navigate("/products");
                    }}
                  >
                    SHOP NOW
                    <span>
                      <EastIcon />
                    </span>
                  </button>
                </div>
              </div>
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <div className={style.box3}>
                <div className={style.titles}>
                  <h2>
                    The best <br />
                    thing for kids
                  </h2>
                  <p>Special ofter gift voucher</p>
                  <button
                    onClick={() => {
                      navigate("/products");
                    }}
                  >
                    SHOP NOW
                    <span>
                      <EastIcon />
                    </span>
                  </button>
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={5} style={{ marginBottom: "100px" }}>
            <Grid tem xl={12} lg={12} md={12} sm={12} xs={12}>
              <p
                style={{
                  textAlign: "center",
                  fontFamily: "cursive",
                  fontWeight: "500",
                  fontSize: "20px",
                  color: "#1f3332;",
                }}
              >
                <img
                  src="https://cdn.shopify.com/s/files/1/0770/8701/5196/files/rainbow-icon.jpg?v=1695205444"
                  alt=""
                />
                Greatest prices and deals{" "}
                <span
                  style={{
                    color: "red",
                    textDecoration: "underline",
                    textDecorationThickness: "3px",
                  }}
                >
                  save 20%off
                </span>{" "}
                baby and kids wears.
                <img
                  src="https://cdn.shopify.com/s/files/1/0770/8701/5196/files/rainbow-icon-1.jpg?v=1695205468"
                  alt=""
                />
              </p>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            className={style.containerCards}
            marginTop={0}
            container
            spacing={8}
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item xs={12}>
              <div className={style.titleBest}>
                <h3>Best selling</h3>
                <p>
                  It has survived not only five centuries, but also the leap
                  into <br />
                  electronic typesetting, remaining essentially unchanged.
                </p>
              </div>
            </Grid>
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
                    <button
                      name={elem.id}
                      className={styles.heart}
                      style={{ cursor: "pointer", border: "none" }}
                      onClick={() => {
                        handleAddToWishlist(user.id, {
                          id: elem.id,
                          name: elem.name,
                          price: elem.price,
                          image: elem.image,
                        });
                      }}
                    >
                      {userWishlist.find((x) => x.id === elem.id) ? (
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
                    {/* <button style={{ cursor: "pointer", border: "none" }}>
                      <Link
                        className={styles.details}
                        to={"/products/" + elem.id}
                      >
                        Quick view
                      </Link>
                    </button> */}

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
        </Box>
      </Container>

      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={7} className={style.containerAge}>
            <Grid item xs={12}>
              <h3>Shop by age</h3>
            </Grid>

            <Grid item className={style.items}>
              <Link to="/" className={style.icons}>
                <div className={style.age1}></div>
              </Link>
              <Link to="/" className={style.categoriesAge}>
                0-12 Months
              </Link>
            </Grid>
            <Grid item className={style.items}>
              <Link to="/" className={style.icons}>
                <div className={style.age2}></div>
              </Link>
              <Link to="/" className={style.categoriesAge}>
                1-2 Years
              </Link>
            </Grid>
            <Grid item className={style.items}>
              <Link to="/" className={style.icons}>
                <div className={style.age3}></div>
              </Link>
              <Link to="/" className={style.categoriesAge}>
                2-4 Years
              </Link>
            </Grid>
            <Grid item className={style.items}>
              <Link to="/" className={style.icons}>
                <div className={style.age4}></div>
              </Link>
              <Link to="/" className={style.categoriesAge}>
                4-6 Years
              </Link>
            </Grid>
            <Grid item className={style.items}>
              <Link to="/" className={style.icons}>
                <div className={style.age5}></div>
              </Link>
              <Link to="/" className={style.categoriesAge}>
                5-8 Years
              </Link>
            </Grid>
            <Grid item className={style.items}>
              <Link to="/" className={style.icons}>
                <div className={style.age6}></div>
              </Link>
              <Link to="/" className={style.categoriesAge}>
                8-12 Years
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <div className={style.imageUnderline}></div>
            </Grid>
          </Grid>
        </Box>
      </Container> */}

      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            className={style.containerPopularCards}
            marginTop={0}
            container
            spacing={8}
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item xs={12}>
              <div className={style.titleBest}>
                <h3>Popular products</h3>
                <p>
                  It has survived not only five centuries, but also the leap
                  into <br />
                  electronic typesetting, remaining essentially unchanged.
                </p>
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
                    {/* <div className={styles.heart}>
                      <FontAwesomeIcon icon={faHeart} />
                    </div> */}
                    <button
                      className={styles.heart}
                      style={{ cursor: "pointer", border: "none" }}
                      onClick={() => {
                        handleAddToWishlist(user.id, {
                          id: elem.id,
                          name: elem.name,
                          price: elem.price,
                          image: elem.image,
                        });
                      }}
                    >
                      {userWishlist.find((x) => x.id === elem.id) ? (
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
        </Box>
      </Container>

      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1, marginBottom: "100px" }}>
          <Grid container spacing={7}>
            <Grid item>
              <Link to="/">
                <img src={gucci} alt="" />
              </Link>
            </Grid>
            <Grid item>
              <Link to="/">
                <img src={chanel} alt="" />
              </Link>
            </Grid>
            <Grid item>
              <Link to="/">
                <img src={asos} alt="" />
              </Link>
            </Grid>
            <Grid item>
              <Link to="/">
                <img src={prada} alt="" />
              </Link>
            </Grid>
            <Grid item>
              <Link to="/">
                <img src={celine} alt="" />
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <div className={style.threeCards}>
        <Grid container spacing={0}>
          <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
            <div className={style.one}>
              <Link to="/products" className={style.links}>
                <Container maxWidth="xl">
                  <div className={style.title}>
                    <img
                      src="https://wn9omz0g55pl0w56-52485554369.shopifypreview.com/cdn/shop/files/demo-kids-toy-02.svg?v=1698815628"
                      alt=""
                    />
                    <h2>
                      Best choice <br />
                      for your kids
                    </h2>
                    <p>Our baby stuffs are affordable & stylish.</p>
                    <button>SHOP NOW</button>
                  </div>
                </Container>
              </Link>
            </div>
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
            <div className={style.two}>
              <Link to="/products" className={style.links}>
                <Container maxWidth="xl">
                  <div className={style.title}>
                    <p>Up to 30% discount</p>
                    <h2>
                      Out door <br /> adventure toys
                    </h2>
                    <button>SHOP NOW</button>
                  </div>
                </Container>
              </Link>
            </div>
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
            <div className={style.three}>
              <Link to="/products" className={style.links}>
                <Container maxWidth="xl">
                  <div className={style.title}>
                    <p>Up to 50% discount</p>
                    <h2>
                      Imaginative <br /> playsets
                    </h2>
                    <button>SHOP NOW</button>
                  </div>
                </Container>
              </Link>
            </div>
          </Grid>
        </Grid>
      </div>

      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={5} style={{ marginBottom: "100px" }}>
            <Grid tem xl={12} lg={12} md={12} sm={12} xs={12}>
              <p
                style={{
                  textAlign: "center",
                  fontFamily: "cursive",
                  fontWeight: "500",
                  fontSize: "20px",
                  color: "#1f3332;",
                }}
              >
                Trusted by
                <span
                  style={{
                    color: "red",
                    textDecoration: "underline",
                    textDecorationThickness: "3px",
                  }}
                >
                  250.000+
                </span>{" "}
                happy customers are using crafto toys.
              </p>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Container maxWidth="xl">
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={5}
            style={{
              marginBottom: "100px",
              display: "flex",
              justifyContent: "center",
              padding: "10%",
            }}
          >
            <Grid tem xl={3} lg={3} md={6} sm={12} xs={12}>
              <div className={style.freeShipping}>
                <div className={style.image}>
                  <FontAwesomeIcon icon={faBox} className={style.icons} />
                </div>
                <div>
                  <p className={style.paragraf}>Free shipping</p>
                  <p className={style.paragraf2}>Orders from all item</p>
                </div>
              </div>
            </Grid>
            <Grid tem xl={3} lg={3} md={6} sm={12} xs={12}>
              <div className={style.freeShipping}>
                <div className={style.image}>
                  <FontAwesomeIcon icon={faCircleCheck} />
                </div>
                <div className="titles">
                  <p className={style.paragraf}>Secure payment</p>
                  <p className={style.paragraf2}>100% Secure payment.</p>
                </div>
              </div>
            </Grid>
            <Grid tem xl={3} lg={3} md={6} sm={12} xs={12}>
              <div className={style.freeShipping}>
                <div className={style.image}>
                  <FontAwesomeIcon icon={faCommentDots} />
                </div>
                <div className="titles">
                  <p className={style.paragraf}>24/7 Support</p>
                  <p className={style.paragraf2}>Dedicated support.</p>
                </div>
              </div>
            </Grid>
            <Grid tem xl={3} lg={3} md={6} sm={12} xs={12}>
              <div className={style.freeShipping}>
                <div className={style.image}>
                  <FontAwesomeIcon icon={faCalendar} />
                </div>
                <div className="titles">
                  <p className={style.paragraf}>90 days return</p>
                  <p className={style.paragraf2}>If goods have problems.</p>
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
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
                      onClick={() => {
                        axios
                          .get(`http://localhost:3000/users/${user.id}`)
                          .then((response) => {
                            const currentUserData = response.data;

                            const productIndex =
                              currentUserData.basket.findIndex(
                                (basketItem) => basketItem.id === item.id
                              );

                            if (productIndex !== -1) {
                              currentUserData.basket.splice(productIndex, 1);

                              axios
                                .put(`http://localhost:3000/users/${user.id}`, {
                                  ...currentUserData,
                                })
                                .then((updateResponse) => {
                                  console.log(
                                    "Successfully updated user basket:",
                                    updateResponse.data
                                  );
                                  setUserBasket([...currentUserData.basket]);
                                })
                                .catch((updateError) => {
                                  console.error(
                                    "Error updating user basket:",
                                    updateError
                                  );
                                });
                            } else {
                              console.log(
                                "Product not found in the user's basket"
                              );
                            }
                          })
                          .catch((error) => {
                            console.error("Error fetching user data:", error);
                          });
                      }}
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

export default Home;
