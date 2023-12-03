import UserRoot from "../pages/user/userRoot";
import Home from "../pages/user/home";
import Wishlist from "../pages/user/wishlist";
import NoPage from "../pages/noPage";

import Login from "../pages/user/login";
import Register from "../pages/user/register";
import Products from "../pages/user/products";
import Details from "../pages/user/details";

import AdminRoot from "../pages/admin/adminRoot";
import Dashboard from "../pages/admin/dashboard";
import AdminProducts from "../pages/admin/products";
import AddProducts from "../pages/admin/addProducts";
import AddUser from "../pages/admin/addUser";
import Users from "../pages/admin/users";

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
    path: "/admin",
    element: <AdminRoot />,
    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },
      {
        path: "/admin/adminProducts",
        element: <AdminProducts />,
      },
      {
        path: "/admin/addProducts",
        element: <AddProducts />,
      },
      {
        path: "/admin/addUser",
        element: <AddUser />,
      },
      {
        path: "/admin/users",
        element: <Users />,
      },
    ],
  },

  {
    path: "*",
    element: <NoPage />,
  },
];
