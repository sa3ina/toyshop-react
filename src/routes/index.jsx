import UserRoot from "../pages/user/userRoot";
import Home from "../pages/user/home";
import Wishlist from "../pages/user/wishlist";
import NoPage from "../pages/noPage";

import Login from "../pages/user/login";
import Register from "../pages/user/register";
import Products from "../pages/user/products";
import Details from "../pages/user/details";

export const routes = [
  {
    path: "/",
    element: <UserRoot />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products:id",
        element: <Details />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      ,
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <NoPage />,
  },
];
