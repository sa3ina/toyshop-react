import React from "react";
import style from "./index.module.css";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Slider from "@mui/material/Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function Products() {
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
                <p>Dolls</p>
                <p>Toys</p>
                <p>Clothes</p>
                <p>Sensory</p>
                <p>Games</p>
                <p>Strolles</p>
              </div>
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
            </div>
          </Toolbar>
          <Grid
            spacing={8}
            style={{ border: "1px solid black", width: "100%" }}
          >
            <Grid item className={style.item}>
              <div>
                <span>Showing of 16 products</span>
                <button className={style.zoom}>||</button>
                <button className={style.zoom}>|||</button>
                <button className={style.zoom}>||||</button>
              </div>
              <div className={style.sort}>
                <span>Sort by: </span>
                <span>Best selling </span>
                <span>
                  <FontAwesomeIcon icon={faChevronDown} />
                </span>
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
}

export default Products;
