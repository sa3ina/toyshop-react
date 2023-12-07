
import React from "react";
import style from "./index.module.css";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Slider from "@mui/material/Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";

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
import CardContent from "@mui/material/CardContent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

function Products() {
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
//   const [card,setCard]=useState([])
//   const [category,setCategory]=useState(["Dolls","Toys","Clothes","Sensory","Games","Strolles"])
//   const [choose, setChoose] = useState(null)
//   useEffect(()=>{
//     fetch('http://localhost:3000/users/posts')
//     .then(response => response.json())
//     .then(data => setCard(data))
//     .catch(error => console.error('Kartlar yuklenmedi:', error));
// }, [])
// const filterCardByCategory = (selectedCategory) => {
//   return card.filter(kart => kart.title.toLowerCase().includes(selectedCategory.toLowerCase()));
// };
// const handleCategoryClick = (clickedCategory) => {
//   setChoose(clickedCategory);
// };
  return (
    <>
      <section className={style.section}>
        <Container>
          <Grid spacing={0}>
            <Grid item lg={12} sm={12} className={style.item1}>
              <div className={style.text1}>
                <h3>Toys</h3>
                <p>Premium toys and games</p>
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>
      <section>
        <Container maxWidth="xl" style={{ display: "flex" }}>
          <Toolbar disableGutters>
            <div className={style.row}>
              <div className={style.collection}>
                <h3>Collection</h3>
                <div style={{display:"flex", flexDirection:"column"}}><span className={style.ctg}>Dolls</span>
                    <span  className={style.ctg}>Toys</span>
                    <span  className={style.ctg}>Toys</span>
                    <span  className={style.ctg}>Clothes</span>
                    <span className={style.ctg}>Sensory</span>
                    <span  className={style.ctg}>Games</span>
                    <span className={style.ctg}>Strolles</span></div>
                   
        {/* {category.map(kategori => (
          <span key={kategori} onClick={() => handleCategoryClick(kategori)}>{kategori}</span>
        ))}
      </div>
                    {filterCardByCategory(choose).map(kart=>(
                    <div key={kart.id}>
            <h3>{kart.title}</h3>
            <p>{kart.body}</p>
          </div>
        ))}</div> */}
                    
              
              <div
                className={style.price}
                style={{ borderTop: "1px solid #626262" }}
              >
                <h3>Price</h3>
                <Slider
                  defaultValue={30}
                  sx={{
                    width: 200,
                    color: "gray",
                  }}
                />
                <p>Price:$1.00 - $30.00</p>
              </div>
              <div
                className={style.brand}
                style={{ borderTop: "1px solid  #626262" }}
              >
                <h3>Brand</h3>
                <ul className={style.list}>
                  <li className={style.check}>
                    <input type="radio" name="" />
                    <label htmlFor="Acme">Acme</label>
                    <span>(02)</span>
                  </li>
                  <li className={style.check}>
                    <input type="radio" name="" />
                    <label htmlFor="Haider Ackermann">Haider Ackermann</label>
                    <span>(01)</span>
                  </li>
                  <li className={style.check}>
                    <input type="radio" name="" />
                    <label htmlFor="">Hamofy</label>
                    <span>(02)</span>
                  </li>
                  <li className={style.check}>
                    <input type="radio" name="" />
                    <label htmlFor="">Helmut Lang</label>
                    <span>(01)</span>
                  </li>
                  <li className={style.check}>
                    <input type="radio" name="" />
                    <label htmlFor="Hurry">Hurry</label>
                    <span>(04)</span>
                  </li>
                  <li className={style.check}>
                    <input type="radio" name="" />
                    <label htmlFor="Maison Margiela">Maison Margiela</label>
                    <span>(01)</span>
                  </li>
                  <li className={style.check}>
                    <input type="radio" name="" />
                    <label htmlFor="Massive">Massive</label>
                    <span>(02)</span>
                  </li>
                  <li className={style.check}>
                    <input type="radio" name="" />
                    <label
                      htmlFor="Moschino
"
                    >
                      Moschino
                    </label>
                    <span>(01)</span>
                  </li>
                  <li className={style.check}>
                    <input type="radio" name="" />
                    <label htmlFor="Sandro">Sandro</label>
                    <span>(01)</span>
                  </li>
                  <li className={style.check}>
                    <input type="radio" name="" />
                    <label htmlFor="Sandro">Sandro</label>
                    <span>(01)</span>
                  </li>
                  <li className={style.check}>
                    <input type="radio" name="" />
                    <label htmlFor="Starwalks">Starwalks</label>
                    <span>(01)</span>
                  </li>
                </ul>
              </div>
              <div
                className={style.availability}
                style={{ borderTop: "1px solid  #626262;" }}
              >
                <h3>Availability</h3>
                <ul>
                  <li className={style.check}>
                    <input type="radio" name="" />
                    <label htmlFor="">In stock</label>
                    <span>(15)</span>
                  </li>
                </ul>

                <div className={style.disabled} style={{ marginTop: "5px" }}>
                  <input type="radio" disabled />
                  <label htmlFor="Out of stock">Out of stock</label>
                </div>
              </div>
              <div
                className={style.tag}
                style={{ borderTop: "1px solid  #626262;" }}
              >
                <button className={style.btn}>Classik</button>
                <button className={style.btn}>Kids</button>
                <button className={style.btn}>Modern</button>
                <button className={style.btn}>Stylish</button>
                <button className={style.btn}>Toy</button>
              </div>
              <div className={style.image}>
                <img
                  style={{ width: "200px" }}
                  src="//hongotheme.myshopify.com/cdn/shop/files/demo-kids-toy-product-listing-banner.jpg?v=1698815628"
                  alt=""
                />
              </div>
            </div></div>
          </Toolbar>
          <Grid
          lg={12}
            spacing={0}
            style={{  width:"100%"}}
          >
            <Grid item className={style.item} lg={12} xs={6} style={{ }}>
              <div>
                <span>Showing of 16 products</span>
                <button className={style.zoom}>||</button>
                <button className={style.zoom}>|||</button>
                <button className={style.zoom}>||||</button>
              </div>
              <div className={style.sort}>
                <span>Sort by: </span>
                <span>Best selling <FontAwesomeIcon icon={faChevronDown} /></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </Grid>
            <Grid  spacing={0} lg={4} style={{display:"flex",flexWrap:"wrap",marginTop:"100px"}}>{cardProd.map((elem, i) => (
              <Grid item lg={3} xs={2} key={i} style={{ marginRight:"5px",flexWrap:"wrap"}}>
                <Card
                  className={style.cardd}
                  sx={{ minWidth: 275 }}
                  style={{ marginBottom: "15px"}}
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
                      className={style.heart}
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
                      className={style.addtoCart}
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
                      className={style.card}
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
          <Grid item lg={12} xs={12} style={{marginTop:"50px", display:"flex", justifyContent:"center",textAlign:"center"}}>
            <div> <p>Showing 12 of 16 Product</p>
            <div style={{display:"flex",marginTop:"15px"}}><div className={style.line}></div>
           <div className={style.lines}></div></div>
          
            <button className={style.btn2}>Load More</button></div>
           
          </Grid>
          </Grid>
          
    
        </Container>
  
      </section>
    </>
  );
}

export default Products;
