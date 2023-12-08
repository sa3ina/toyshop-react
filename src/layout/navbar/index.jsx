import React, { useEffect } from "react";
import style from "./index.module.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useDispatch } from "react-redux";
import { setCheck } from "../../redux/slices/cardSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { setWishCheck } from "../../redux/slices/cardSlice";
import { logout } from "../../redux/slices/loginSlice";

// import { Link } from "@mui/material";
const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const checkWishlist = useSelector((state) => state.products.wishCheck);
  const loggedInUser = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const checkValue = useSelector((state) => state.products.check);

  const [log, setLog] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} to="/">
            <img
              src="https://nnccnnm154l10hkm-52485554369.shopifypreview.com/cdn/shop/files/demo-kids-header-logo.svg?v=1698918200"
              alt=""
            />
          </Link>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          ></Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
              <SearchOutlinedIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Shop</Typography>
              </MenuItem>
              {/* <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Trending</Typography>
              </MenuItem> */}
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">About</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  to="/products"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Product
                </Link>
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          ></Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Button
              // className={style.button}
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "black",
                display: "block",
                fontWeight: "800",
                fontFamily: "Bradley hand,cursive",
              }}
            >
              Shop
            </Button>
            {/* <Button
              className={style.button}
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "black",
                display: "block",
                fontWeight: "800",
                fontFamily: "Bradley hand,cursive",
              }}
            >
              Trending
            </Button> */}
            <Button
              className={style.button}
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "black",
                display: "block",
                fontWeight: "800",
                fontFamily: "Bradley hand,cursive",
              }}
            >
              <Link
                to="/aboutUs"
                style={{
                  color: "black",
                  display: "block",
                  fontWeight: "800",
                  fontFamily: "Bradley hand,cursive",
                  textDecoration: "none",
                }}
              >
                About
              </Link>
            </Button>
            <Button
              className={style.button}
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "black",
                display: "block",
                fontWeight: "800",
                fontFamily: "Bradley hand,cursive",
              }}
            >
              <Link
                to="/products"
                style={{
                  color: "black",
                  display: "block",
                  fontWeight: "800",
                  fontFamily: "Bradley hand,cursive",
                  textDecoration: "none",
                }}
              >
                Product
              </Link>
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              {/* <SearchOutlinedIcon /> */}
              <Link to="/login">
                <button
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "grey",
                    position: "relative",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    // loggedInUser ? setUser(loggedInUser) : setUser(null);
                  }}
                >
                  {loggedInUser ? (
                    <>
                      <Avatar
                        aria-label="recipe"
                        style={{
                          fontSize: "15px",
                          fontWeight: "700",
                          fontFamily: "cursive",
                          width: "88px",
                          height: "60px",
                          backgroundColor: "white",
                          color: "#88A9A8",
                          position: "absolute",
                          bottom: "-17px",
                          right: "5%",
                        }}
                      >
                        {loggedInUser?.name}
                      </Avatar>
                    </>
                  ) : (
                    <PersonOutlineIcon />
                  )}
                </button>
              </Link>
              <Link to="/wishlist" style={{ color: "grey" }}>
                <FavoriteBorderIcon />
              </Link>
              <Link style={{ color: "grey" }}>
                <button
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "grey",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setCheck(!checkValue));
                    dispatch(setWishCheck(!checkWishlist));
                  }}
                >
                  <ShoppingBagOutlinedIcon />
                </button>
              </Link>
              <Link>
                <button
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "grey",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    localStorage.setItem("loggedInUser", JSON.stringify({}));
                    dispatch(logout());
                  }}
                >
                  {Object.keys(loggedInUser).length > 0 ? (
                    <LogoutOutlinedIcon />
                  ) : null}
                </button>
              </Link>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
