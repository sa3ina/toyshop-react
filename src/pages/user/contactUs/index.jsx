import React from "react";
import style from "./index.module.css";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import { faPhoneVolume, faComment } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  return (
    <>
      {" "}
      <section className={style.section}>
        <Container>
          <Grid spacing={0}>
            <Grid item lg={12} sm={12} className={style.item1}>
              <div className={style.text1}>
                <h3>Contact Us</h3>
                <p>We will take care of any problem and help you.</p>
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>
      <section>
        <Container>
          <Toolbar>
            <Grid container spacing={0} lg={12} style={{ marginTop: "30px" }}>
              <Grid item className={style.item2} lg={12} xs={12}>
                <div style={{ width: "680px" }}>
                  <h3>We would love to help for you how can help you?</h3>
                </div>
                <div className={style.prg}>
                  {" "}
                  <p>
                    We're here to help and answer any question you might have.
                    we look forward to hearing from you. any need help you
                    please contact our customer services number or meet to
                    office with coffee.
                  </p>
                </div>
              </Grid>
              <Grid item lg={3} xs={12} style={{ marginTop: "50px" }}>
                <img
                  src="//1q0zh2ycw9dpybh2-52485554369.shopifypreview.com/cdn/shop/files/demo-kids-toy-contact-us-icon-01.svg?v=1698815628"
                  alt=""
                />

                <h4>Hongo kidstoy</h4>
                <p>401 Broadway, 24th Floor</p>
                <p>New York, NY 10013</p>
              </Grid>
              <Grid item lg={3} xs={12} style={{ marginTop: "50px" }}>
                <img
                  src="//1q0zh2ycw9dpybh2-52485554369.shopifypreview.com/cdn/shop/files/demo-kids-toy-contact-us-icon-02.svg?v=1698815628"
                  alt=""
                />
                <h4>How can we help?</h4>
                <p>sales@yourdomain.com</p>
                <p>info@yourdomain.com</p>
              </Grid>
              <Grid item lg={3} xs={12} style={{ marginTop: "50px" }}>
                <img
                  src="//1q0zh2ycw9dpybh2-52485554369.shopifypreview.com/cdn/shop/files/demo-kids-toy-contact-us-icon-03.svg?v=1698815627"
                  alt=""
                />
                <h4>Call us directly</h4>
                <p>Phone: 1-800-222-000</p>
                <p>Fax: 1-800-222-002</p>
              </Grid>
              <Grid item lg={3} xs={12} style={{ marginTop: "50px" }}>
                <img
                  src="//1q0zh2ycw9dpybh2-52485554369.shopifypreview.com/cdn/shop/files/demo-kids-toy-contact-us-icon-04.svg?v=1698815628"
                  alt=""
                />
                <h4>Join our team</h4>
                <p>hire@yourdomain.com</p>
                <p>hr@yourdomain.com</p>
              </Grid>
            </Grid>
          </Toolbar>
        </Container>
        <Container maxWidth="xl" style={{ marginTop: "20px" }}>
          <Grid container spacing={0}>
            <Grid item className={style.image}>
              <img 
              style={{paddingTop:"30px"}}
                src="https://maps.gstatic.com/mapfiles/api-3/images/icon_error.png"
                alt=""
              />
              <p>Oops! Something went wrong.</p>
              <p>
                This page didn't load Google Maps correctly. See the JavaScript
                console for technical details.
              </p>
            </Grid>
          </Grid>
        </Container>
        <Container>
          <Grid container spacing={0} style={{ display: "flex" }}>
            <Grid item lg={6} sx={12} style={{ marginTop: "20px" }}>
              <img className={style.imgg}
                src="//1q0zh2ycw9dpybh2-52485554369.shopifypreview.com/cdn/shop/files/demo-kids-toy-contact-us-img-01_535x.jpg?v=1698815628"
                alt=""
              />
            </Grid>
            <Grid style={{ marginTop: "20px" }} item lg={6} sx={12}>
              <h4>Let’s get in touch.</h4>
              <h5>Your name</h5>
              <div style={{ display: "flex" }}>
                {" "}
                <input
               
                  autoComplete="name"
                  type="text"
                  id="ContactForm-name"
                  name="contact[Name]"
                  value={name}
                  className={style.borderlesss}
                  placeholder="What's your good name?"
                  onChange={(e) => setName(e.target.value)}
                />
                <FontAwesomeIcon icon={faUser} style={{ marginTop: "10px" }} />
              </div>

              <hr />
              <h5>Your email</h5>
              <div style={{ display: "flex" }}>
                <input
                  autoComplete="name"
                  type="text"
                  id="ContactForm-name"
                  name="contact[Name]"
                  value={email}
                  className={style.borderlesss}
                  placeholder="Enter your email adress?"
                  onChange={(e)=>setEmail(e.target.value)}


                  
                />
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{ marginTop: "10px" }}
                />
              </div>

              <hr />
              <h5>Your phone number</h5>
              <div style={{ display: "flex" }}>
                <input
                  autoComplete="name"
                  type="text"
                  id="ContactForm-name"
                  name="contact[Name]"
                  value={phoneNumber}
                  className={style.borderlesss}
                  placeholder="Enter your phone number"
                  onChange={(e)=>setPhoneNumber(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={faPhoneVolume}
                  style={{ marginTop: "10px" }}
                />
              </div>

              <hr />
              <h5>Your message</h5>
              <div style={{ display: "flex" }}>
                <input
                  autoComplete="name"
                  type="text"
                  id="ContactForm-name"
                  name="contact[Name]"
                  value={message}
                  className={style.borderlesss}
                  placeholder="Enter your message"
                  onChange={(e) => setMessage(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={faComment}
                  style={{ marginTop: "10px" }}
                />
              </div>

              <hr style={{ marginRight: "20px" }} />
              <div style={{ marginTop: "20px" }}>
                <input type="checkbox" />
                <label htmlFor="">I agree with the terms & conditions</label>
              </div>
              <br />
              <button className={style.btns}>Send message</button>
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
}

export default ContactUs;
