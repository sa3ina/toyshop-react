import React from "react";
import Navbar from "../../../layout/navbar";
import Footer from "../../../layout/footer";
import { Outlet } from "react-router-dom";

function UserRoot() {
  return (
    <>
      <Navbar />

      <Outlet />
      <Footer />
    </>
  );
}

export default UserRoot;
