import React from "react";
import style from "./index.module.css";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Slider from "@mui/material/Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
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
} from "../../../redux/slices/wishlistSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
function Products() {
  let user = JSON.parse(localStorage.getItem("loggedInUser")) || [];

  const cardProd = useSelector((state) => state.products.posts);
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

  const [zoom, setZoom] = useState(300);
  const handleZoomClick = (level) => {
    setZoom(level);
  };
  const [isChecked, setIsChecked] = useState(false);
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
  const [visibleItems, setVisibleItems] = useState(8);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedBrand, setSelectedBrand] = useState("");
  const[price,setPrice]=useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((response) => {
        setItems(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleCategoryChange = (collection) => {
    setSelectedCategory(collection);
  };
  const handleLoadMore  = (data) => {
    setVisibleItems(data)
    console.log(data)
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };
  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
  };
  const handleInput=(e,pricee)=>{
    e.preventDefault()
    setPrice(pricee)
    console.log(e.target.value)
  }
  
  
  // const filteredItems = items.filter((item) => {
   
  //   if (selectedCategory === "all") {
  //     return true;
  //   } else {
  //     return item.collection === selectedCategory;
  //   }
  // })
  
  const filteredItems = items.filter((item) => {
    const categoryCondition = selectedCategory === "all" || item.collection === selectedCategory;
    const brandCondition = selectedBrand === "" || item.brand === selectedBrand;
    return categoryCondition && brandCondition;
  });
  const sortedItems = filteredItems.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === 'desc') {
      return b.name.localeCompare(a.name);
    } else if (sortOrder === 'lowToHigh') {
      return a.price - b.price;
    } else if (sortOrder === 'highToLow') {
      return b.price - a.price;
    }
    else if (sortOrder === 'bestSelling') {

      return b.rating - a.rating;
    }
    else if (sortOrder === 'sold') {
      return b.sold - a.sold;
    }
    else if (sortOrder === 'idHigh') {
      return b.id - a.id;
    }
    else if (sortOrder === 'idLow') {
      return a.id - b.id;
    }
    return 0;
  });

  return (
    <>
      <div style={{ backgroundColor: "#88A9A8" }}>
        <section className={style.section}>
          <Container maxWidth="xl">
            <Box
              sx={{
                flexGrow: 1,
              }}
            >
              <Grid spacing={0}>
                <Grid item lg={12} sm={12} className={style.item1}>
                  <div className={style.text1}>
                    <h3>Toys</h3>
                    <p>Premium toys and games</p>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </section>
      </div>

      <section>
        <Container
          maxWidth="xl"
          style={{
            display: "flex",
            width: "10px",
            justifyContent: "space-between",
          }}
        >
          <aside style={{ display: "flex", alignItems: "flex-start" }}>
            <Toolbar disableGutters>
              <div className={style.row}>
                <div className={style.collection} style={{}}>
                  <h3>Collection</h3>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      onClick={() => {
                        handleCategoryChange("dolls");
                      }}
                      className={style.ctg}
                    >
                      Dolls
                    </span>
                    <span
                      onClick={() => handleCategoryChange("toys")}
                      className={style.ctg}
                    >
                      Toys
                    </span>
                    <span
                      onClick={() => handleCategoryChange("clothes")}
                      className={style.ctg}
                    >
                      Clothes
                    </span>
                    <span
                      onClick={() => handleCategoryChange("Sensory")}
                      className={style.ctg}
                    >
                      Sensory
                    </span>
                    <span
                      onClick={() => {
                        handleCategoryChange("games");
                      }}
                      className={style.ctg}
                    >
                      Games
                    </span>
                    <span
                      onClick={() => {
                        handleCategoryChange("strolles");
                      }}
                      className={style.ctg}
                    >
                      Strolles
                    </span>
                  </div>

                  <div
                    className={style.price}
                    style={{ borderTop: "1px solid #626262" }}
                  >
                    <h3>Price</h3>
                    <Slider
                    onChange={handleInput}
                      defaultValue={30}
                      sx={{
                        width: 200,
                        color: "gray",
                        
                      }}
                    />
                    
                    <p>Price:${price}</p>
                  </div>
                  <div
                    className={style.brand}
                    style={{ borderTop: "1px solid  #626262" }}
                  >
                    <h3>Brand</h3>
                    <ul className={style.list}>
                      <li className={style.check}>
                        <input
        type="radio"
        name="brand"
        id="Acme"
        checked={selectedBrand === "Acme"} 
        onChange={() => handleBrandChange("Acme")}
      />
                        <label htmlFor="Acme">Acme</label>
                        <span>(02)</span>
                      </li>
                      <li className={style.check}>
                        <input type="radio" name="brand"
        id="Haider Ackermann"
        checked={selectedBrand === "Haider Ackermann"} 
        onChange={() => handleBrandChange("Haider Ackermann")}
       />
                        <label htmlFor="Haider Ackermann">
                          Haider Ackermann
                        </label>
                        <span>(01)</span>
                      </li>
                      <li className={style.check}>
                        <input type="radio" name="brand"
        id="Hamofy"
        checked={selectedBrand === "Hamofy"} onChange={() => handleBrandChange("Hamofy")}/>
                        <label htmlFor="">Hamofy</label>
                        <span>(02)</span>
                      </li>
                      <li className={style.check}>
                        <input type="radio" name="brand"
        id="Helmut Lang"
        checked={selectedBrand === "Helmut Lang"} onChange={() => handleBrandChange("Helmut Lang")}/>
                        <label htmlFor="">Helmut Lang</label>
                        <span>(01)</span>
                      </li>
                      <li className={style.check}>
                        <input type="radio" name="brand"
        id="Hurry"
        checked={selectedBrand === "Hurry"} onChange={() => handleBrandChange("Hurry")} />
                        <label htmlFor="Hurry">Hurry</label>
                        <span>(04)</span>
                      </li>
                      <li className={style.check}>
                        <input type="radio" name="brand"
        id="Maison Margiela"
        checked={selectedBrand === "Maison Margiela"} onChange={() => handleBrandChange("Maison Margiela")} />
                        <label htmlFor="Maison Margiela">Maison Margiela</label>
                        <span>(01)</span>
                      </li>
                      <li className={style.check}>
                        <input type="radio" name="brand"
        id="Massive"
        checked={selectedBrand === "Massive"} onChange={() => handleBrandChange("Massive")} />
                        <label htmlFor="Massive">Massive</label>
                        <span>(02)</span>
                      </li>
                      <li className={style.check}>
                        <input type="radio" name="brand"
        id="Moschino"
        checked={selectedBrand === "Moschino"} onChange={() => handleBrandChange("Moschino")}/>
                        <label
                          htmlFor="Moschino
"
                        >
                          Moschino
                        </label>
                        <span>(01)</span>
                      </li>
                      <li className={style.check}>
                        <input type="radio" name="brand"
        id="Sandro"
        checked={selectedBrand === "Sandro"} onChange={() => handleBrandChange("Sandro")} />
                        <label htmlFor="Sandro">Sandro</label>
                        <span>(01)</span>
                      </li>
                      <li className={style.check}>
                        <input type="radio" name="brand"
        id="Starwalks"
        checked={selectedBrand === "Starwalks"} onChange={() => handleBrandChange("Starwalks")} />
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

                    <div
                      className={style.disabled}
                      style={{ marginTop: "5px" }}
                    >
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
                </div>
              </div>
            </Toolbar>
          </aside>

          <Grid lg={12} spacing={0} maxWidth="xl">
            <Grid item className={style.filter} lg={12} xs={12} md={12}>
              <div style={{ display: "flex" }} className={style.productsCount}>
                <div className={style.filterButton}>
                  <button className={style.btnfil}>
                    <FontAwesomeIcon icon={faFilter} /> Filter
                  </button>
                </div>
                <span className={style.showProd}>Showing of 16 products</span>
                <div className={style.buttonsGrid}>
                  <button
                    onClick={() => {
                      handleZoomClick(500);
                    }}
                    className={style.zoom}
                  >
                    ||
                  </button>
                  <button
                    onClick={() => {
                      handleZoomClick(400);
                    }}
                    className={style.zoom}
                  >
                    |||
                  </button>
                  <button
                    onClick={() => {
                      handleZoomClick(280);
                    }}
                    className={style.zoom}
                  >
                    ||||
                  </button>
                </div>
              </div>
              <div className={style.sort}>
                <span className={style.sortBy}>Sort by: </span>
                <select
                  name=""
                  id=""
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="sold">Featured</option>
                  <option value="bestSelling">Best Selling</option>
                  <option value="asc">Alphabetically, A-Z</option>
                  <option value="desc">Alphabetically, Z-A</option>
                  <option value="lowToHigh">Price, low to high</option>
                  <option value="idHigh">Date, old to new</option>
                  <option value="idLow">Date, new to old</option>
                </select>
              </div>
            </Grid>
            <Grid
              spacing={0}
              lg={4}
              style={{
                display: "grid",

                marginTop: "100px",
              }}
              sx={{ gridTemplateColumns: { lg: "1fr 1fr 1fr", md: "1fr 1fr" } }}
            >
              {sortedItems.slice(0, visibleItems).map((elem, i) => (
                <Grid item lg={3} xs={2} key={i} style={{ flexWrap: "wrap" }}>
                  <Card
                    className={style.cardd}
                    sx={{ minWidth: 275 }}
                    style={{
                      marginBottom: "15px",
                      width: `${zoom}px`,
                    }}
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
                      <Link
                        to={"/products/" + elem.id}
                        className={style.details}
                        style={{ cursor: "pointer", border: "none" }}
                      >
                        Details
                      </Link>

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
                      <StarRating rating={elem.rating} />{" "}
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
            <Grid
              item
              lg={12}
              xs={12}
              style={{
                marginTop: "50px",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <div>
                {" "}
                <p>Showing 12 of 16 Product</p>
                <div style={{ display: "flex", marginTop: "15px" }}>
                  <div className={style.line}></div>
                  <div className={style.lines}></div>
                </div>
                {visibleItems < sortedItems.length && (
                <button className={style.btn2} onClick={handleLoadMore}>Load More</button>)}
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
}

export default Products;
