import { configureStore } from "@reduxjs/toolkit";
import cardProducts from "./slices/cardSlice";
import userInfo from "./slices/usersSlice";
import usersSlice from "./slices/usersSlice";
import basketProducts from "./slices/basketSlice";
export const store = configureStore({
  reducer: {
    products: cardProducts,
    user: usersSlice,
    basket: basketProducts,
  },
});
