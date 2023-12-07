import React from "react";
import style from "./index.module.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import {
  faLocationDot,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@mui/material";
function Footer() {
  return (
    <>
      <div className={style.footer}>
        <div>
          <div>
            <img
              src="https://hongotheme.myshopify.com/cdn/shop/files/demo-kids-toy-bg-img-03.jpg?v=1698815628"
              alt=""
            />
          </div>
          <Container maxWidth="xl">
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={5}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Grid
                  item
                  xl={3}
                  lg={3}
                  md={12}
                  sm={12}
                  xs={12}
                  style={{
                    height: "100%",
                    padding: "25px",
                  }}
                >
                  <Box
                    className={style.box1}
                    sx={{
                      borderRight: { lg: "1px solid #626262" },
                    }}
                  >
                    <Link
                      sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                      to="/"
                    >
                      <Box
                        className={style.imgfooter}
                        sx={{
                          justifyContent: {
                            md: "center",
                            lg: "left",
                            sm: "center",
                            xs: "center",
                          },
                        }}
                      >
                        <img
                          style={{
                            width: "40%",
                            height: "40%",
                          }}
                          className={style.hongoimg}
                          src="https://nnccnnm154l10hkm-52485554369.shopifypreview.com/cdn/shop/files/demo-kids-header-logo.svg?v=1698918200"
                          alt=""
                        />
                      </Box>
                    </Link>
                    <Typography
                      sx={{
                        textAlign: {
                          md: "center",
                          lg: "left",
                          sm: "center",
                          xs: "center",
                        },
                      }}
                    >
                      Explore our unique collection of limited editions.Find the
                      streetwear brands you’ve been searching for!
                    </Typography>
                    <div className={style.sosialIcon}>
                      <ul>
                        <li>
                          <Link to={"https://www.facebook.com/"}>
                            <svg
                              className={style.svg}
                              xmlns="http://www.w3.org/2000/svg"
                              height="1.5em"
                              viewBox="0 0 320 512"
                              style={{ color: "#626262" }}
                            >
                              <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                            </svg>
                          </Link>
                        </li>
                        <li>
                          <Link to={"https://dribbble.com/"}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="1.5em"
                              viewBox="0 0 512 512"
                            >
                              <path d="M256 8C119.252 8 8 119.252 8 256s111.252 248 248 248 248-111.252 248-248S392.748 8 256 8zm163.97 114.366c29.503 36.046 47.369 81.957 47.835 131.955-6.984-1.477-77.018-15.682-147.502-6.818-5.752-14.041-11.181-26.393-18.617-41.614 78.321-31.977 113.818-77.482 118.284-83.523zM396.421 97.87c-3.81 5.427-35.697 48.286-111.021 76.519-34.712-63.776-73.185-116.168-79.04-124.008 67.176-16.193 137.966 1.27 190.061 47.489zm-230.48-33.25c5.585 7.659 43.438 60.116 78.537 122.509-99.087 26.313-186.36 25.934-195.834 25.809C62.38 147.205 106.678 92.573 165.941 64.62zM44.17 256.323c0-2.166.043-4.322.108-6.473 9.268.19 111.92 1.513 217.706-30.146 6.064 11.868 11.857 23.915 17.174 35.949-76.599 21.575-146.194 83.527-180.531 142.306C64.794 360.405 44.17 310.73 44.17 256.323zm81.807 167.113c22.127-45.233 82.178-103.622 167.579-132.756 29.74 77.283 42.039 142.053 45.189 160.638-68.112 29.013-150.015 21.053-212.768-27.882zm248.38 8.489c-2.171-12.886-13.446-74.897-41.152-151.033 66.38-10.626 124.7 6.768 131.947 9.055-9.442 58.941-43.273 109.844-90.795 141.978z"></path>
                            </svg>
                          </Link>
                        </li>
                        <li>
                          <Link to={"https://www.instagram.com/"}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="1.5em"
                              viewBox="0 0 448 512"
                            >
                              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                            </svg>
                          </Link>
                        </li>
                        <li>
                          <Link to={"https://www.pinterest.com/"}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="1.5em"
                              viewBox="0 0 384 512"
                            >
                              <path d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z"></path>
                            </svg>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </Box>
                </Grid>
                <Grid
                  tem
                  xl={3}
                  lg={3}
                  md={6}
                  sm={12}
                  xs={12}
                  style={{
                    height: "100%",
                    padding: "25px",
                  }}
                >
                  <Box
                    className={style.box2}
                    sx={{
                      borderRight: { lg: "1px solid #626262" },
                    }}
                  >
                    <div className={style.information}>Information</div>

                    <div className={style.about}>
                      <ul>
                        <li>
                          <Link to="/aboutUs" className={style.links}>
                            About Us
                          </Link>
                        </li>
                        <li>
                          <Link to="/ourServices" className={style.links}>
                            Our services
                          </Link>
                        </li>
                        <li>
                          <Link to="/latestNews" className={style.links}>
                            Latest news
                          </Link>
                        </li>
                        <li>
                          <Link to="/bestSellers" className={style.links}>
                            Best sellers
                          </Link>
                        </li>
                        <li>
                          <Link to="/contactUs" className={style.links}>
                            Contact us
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </Box>
                </Grid>
                <Grid
                  tem
                  xl={3}
                  lg={3}
                  md={6}
                  sm={12}
                  xs={12}
                  style={{
                    height: "100%",
                    padding: "25px",
                  }}
                >
                  <Box
                    className={style.box2}
                    sx={{
                      borderRight: { lg: "1px solid #626262" },
                    }}
                  >
                    <div className={style.information}>Collection</div>

                    <div className={style.about}>
                      <ul>
                        <li>
                          <Link to="/products" className={style.links}>
                            New releases
                          </Link>
                        </li>
                        <li>
                          <Link to="/products" className={style.links}>
                            Best sellers
                          </Link>
                        </li>
                        <li>
                          <Link to="/products" className={style.links}>
                            Soft toys
                          </Link>
                        </li>
                        <li>
                          <Link to="/products" className={style.links}>
                            Activity games
                          </Link>
                        </li>
                        <li>
                          <Link to="/products" className={style.links}>
                            Clothes wear
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </Box>
                </Grid>
                <Grid
                  tem
                  xl={3}
                  lg={3}
                  md={6}
                  sm={12}
                  xs={12}
                  style={{
                    height: "100%",
                    padding: "25px",
                  }}
                >
                  <div className={style.box2}>
                    <div className={style.information}>Store information</div>

                    <div className={style.about}>
                      <ul>
                        <li>
                          <Link className={style.links}>
                            <FontAwesomeIcon icon={faLocationDot} /> 401
                            Broadway, Iceland 10013.
                          </Link>
                        </li>
                        <li>
                          <Link to="/products" className={style.linksHover}>
                            <FontAwesomeIcon icon={faEnvelope} />{" "}
                            sale@hongostore.com
                          </Link>
                        </li>
                        <li>
                          <Link to="/products" className={style.linksPhone}>
                            <FontAwesomeIcon icon={faPhone} /> +01 234 456 7890
                          </Link>
                        </li>
                        <li>
                          <img
                            src="https://cdn.shopify.com/s/files/1/0770/8701/5196/files/demo-grocery-img-09.png?v=1691044629"
                            alt=""
                            style={{ width: "65%", height: "25%" }}
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Footer;
