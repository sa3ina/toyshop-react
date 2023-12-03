import { configureStore } from "@reduxjs/toolkit";
import cardProducts from "./slices/cardSlice";
export const store = configureStore({
  reducer: {
    products: cardProducts,
  },
});
