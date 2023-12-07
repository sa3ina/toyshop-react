import React from "react";
import style from "./index.module.css";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import img from "../../../assets/image/categories/kids.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <>
      <section className={style.section}>
        <Container>
          <Grid spacing={0}>
            <Grid item lg={12} sm={12} className={style.item1}>
              <div className={style.text1}>
                <h3>About Us</h3>
                <p>Now more information about our store and brand history.</p>
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>
      <section className={style.section1}>
        <Container>
          <Grid spacing={0} container className={style.item2}>
            <Grid item lg={6} sx={12}>
              <div className={style.text2}>
                <span style={{ color: "#f96835", fontSize: "20px" }}>
                  Start from since 1998
                </span>
                <h3>We provide premium toys and games for your little kids.</h3>
                <p>
                  Lorem ipsum is simply dummy to text the printing type setting
                  industry lorem ipsum and has been industry dummy text of the
                  simply printing industry lorem ipsum and printing type setting
                  industry.
                </p>
                <button className={style.btn}>EXPLORE PRODUCTS</button>
              </div>
            </Grid>
            <Grid lg={6} sx={12} md={12} className={style.image}>
              <img src={img} alt="" />
            </Grid>
          </Grid>
        </Container>
      </section>
      <section style={style.section3}>
        <Container>
          <Grid spacing={0} container className={style.text3}>
            <Grid item sx={12} lg={3} xl={3}>
              <div>
                <h3>2250</h3>
                <span
                  className={style.colors}
                  style={{ color: "#f96835", fontSize: "20px" }}
                ></span>
              </div>

              <p style={{ marginLeft: "25px" }}>STOCK PRODUCTS</p>
            </Grid>
            <Grid item sx={12} lg={3} xl={3}>
              <h3>9565</h3>
              <p style={{ marginLeft: "25px" }}>LAST YEAR’S SALES</p>
            </Grid>
            <Grid item sx={12} lg={3} xl={3}>
              <h3>3640</h3>
              <p style={{ marginLeft: "25px" }}>HAPPY CUSTOMERS</p>
            </Grid>
            <Grid item sx={12} lg={3} xl={3}>
              <h3>9932</h3>
              <p style={{ marginLeft: "25px" }}>GOOGLE REVIEWS</p>
            </Grid>
          </Grid>
        </Container>
      </section>
      <section className={style.section4}>
        <Container>
          <Grid spacing={0}>
            <Grid lg={12} sx={12} item className={style.item3}>
              <span
                className={style.videoIcon}
                style={{ color: "black", fontSize: "20px" }}
              >
                <FontAwesomeIcon icon={faPlay} />
              </span>
            </Grid>
          </Grid>
        </Container>
      </section>
      <section className={style.section5}>
        <Container>
          <Grid
            spacing={0}
            container
            style={{
              display: "flex",
              marginTop: "40px",
              justifyContent: "space-between",
            }}
          >
            <Grid item lg={6} sx={12}>
              <img
                src="//wn9omz0g55pl0w56-52485554369.shopifypreview.com/cdn/shop/files/demo-kids-toy-about-img-03_535x.jpg?v=1698815628"
                alt=""
              />
            </Grid>
            <Grid
              item
              style={{ marginTop: "60px", width: "500px" }}
              lg={6}
              sx={12}
            >
              <h3>Why choose hongo toys and games?</h3>
              <div style={{ display: "flex", paddingTop: "30px" }}>
                <div>
                  <img
                    src="//wn9omz0g55pl0w56-52485554369.shopifypreview.com/cdn/shop/files/demo-kids-toy-about-icon-01.svg?v=1698815629"
                    alt=""
                  />
                </div>
                <div className={style.textt} style={{ marginLeft: "20px" }}>
                  <h4>Premium toys products</h4>
                  <p>
                    Lorem ipsum is simply dummy text printing typesetting
                    industry.
                  </p>
                </div>
              </div>
              <div
                className={style.textt}
                style={{ display: "flex", paddingTop: "30px" }}
              >
                <div>
                  <img
                    src="//wn9omz0g55pl0w56-52485554369.shopifypreview.com/cdn/shop/files/demo-kids-toy-about-icon-02.svg?v=1698815629"
                    alt=""
                  />
                </div>
                <div className={style.textt} style={{ marginLeft: "20px" }}>
                  <h4>More than 60k+ unique product</h4>
                  <p>
                    Lorem ipsum is simply dummy text printing typesetting
                    industry.
                  </p>
                </div>
              </div>
              <div style={{ paddingTop: "30px" }}>
                <div style={{ display: "flex" }}>
                  <div>
                    <img
                      src="//wn9omz0g55pl0w56-52485554369.shopifypreview.com/cdn/shop/files/demo-kids-toy-about-icon-03.svg?v=1698815628"
                      alt=""
                    />
                  </div>
                  <div className={style.textt} style={{ marginLeft: "20px" }}>
                    <h4>Free shipping available</h4>
                    <p>
                      Lorem ipsum is simply dummy text printing typesetting
                      industry.
                    </p>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>
      <section>
        <Container>
          <Grid
            spacing={0}
            container
            style={{ display: "flex", marginTop: "60px" }}
          >
            <Grid item lg={2} sx={5} className={style.items}>
              <img
                className={style.imagess}
                src="//wn9omz0g55pl0w56-52485554369.shopifypreview.com/cdn/shop/files/demo-cloth-brand-06.jpg?v=1674023413"
                alt=""
              />
            </Grid>
            <Grid item lg={2} sx={5} className={style.items}>
              <img
                className={style.imagess}
                src="//wn9omz0g55pl0w56-52485554369.shopifypreview.com/cdn/shop/files/demo-cloth-brand-07.jpg?v=1674023413"
                alt=""
              />
            </Grid>
            <Grid item lg={2} sx={5} className={style.items}>
              <img
                className={style.imagess}
                src="//wn9omz0g55pl0w56-52485554369.shopifypreview.com/cdn/shop/files/demo-cloth-brand-08.jpg?v=1674023412"
                alt=""
              />
            </Grid>
            <Grid item lg={2} sx={5} className={style.items}>
              <img
                className={style.imagess}
                src="//wn9omz0g55pl0w56-52485554369.shopifypreview.com/cdn/shop/files/demo-cloth-brand-09.jpg?v=1674023412"
                alt=""
              />
            </Grid>
            <Grid item lg={2} sx={5} className={style.items}>
              <Link to="/">
                <img
                  className={style.imagess}
                  src="//wn9omz0g55pl0w56-52485554369.shopifypreview.com/cdn/shop/files/demo-cloth-brand-10.jpg?v=1674024223"
                  alt=""
                />
              </Link>
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
}

export default AboutUs;
