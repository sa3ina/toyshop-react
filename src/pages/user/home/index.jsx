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
import sliderImg1 from "../../../assets/image/headerSlider/sliderImg1.webp";
import { Link, useNavigate, useNavigation } from "react-router-dom";
// Import Swiper styles
import "swiper/css";

function Home() {
  const navigate = useNavigate();
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
    </>
  );
}

export default Home;
