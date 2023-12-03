import { useState } from "react";
// Navbar;
import "./App.css";
import Navbar from "./layout/navbar";
import Footer from "./layout/footer";

import "./grid.css";
import { routes } from "./routes/index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
