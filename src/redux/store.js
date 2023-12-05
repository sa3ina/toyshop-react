import { configureStore } from "@reduxjs/toolkit";
import cardProducts from "./slices/cardSlice";
import userInfo from "./slices/usersSlice";
import usersSlice from "./slices/usersSlice";
import basketProducts from "./slices/basketSlice";
import wishlistReducer from "./slices/wishlistSlice";
export const store = configureStore({
  reducer: {
    products: cardProducts,
    user: usersSlice,
    basket: basketProducts,
    wishlist: wishlistReducer,
  },
});
