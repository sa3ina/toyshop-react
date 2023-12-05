import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addToCart = createAsyncThunk(
  "basket/addToCart",
  async ({ userId, productId }) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      const currentUserData = response.data;

      const existingItem = currentUserData.basket.find(
        (item) => item.id === productId.id
      );
      let updatedBasket;
      if (existingItem) {
        console.log("already exists in the basket");

        const updatedBasket = currentUserData.basket.map((item) =>
          item.id === productId.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        const updatedUser = { ...currentUserData, basket: updatedBasket };
        await axios.patch(`http://localhost:3000/users/${userId}`, updatedUser);
        console.log("already exists in the basket");
      } else {
        console.log("does not exist in the basket");
        const updatedBasket = [...currentUserData.basket, productId];
        const updatedUser = { ...currentUserData, basket: updatedBasket };
        await axios.patch(`http://localhost:3000/users/${userId}`, updatedUser);
      }

      return { updatedBasket };
    } catch (error) {
      console.error("error:", error);
      throw error;
    }
  }
);

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    basketItems: [],
    status: "idle",
    error: null,
  },

  reducers: {
    clearCart: (state) => {
      return { ...state, basketItems: [] };
      // state.basketItems = [];
    },
    removeFromCart: (state, action) => {
      const productId = action.payload.prodId;

      console.log(productId);
      console.log(state.basketItems);
      state.basketItems = state.basketItems.filter(
        (item) => item.id !== productId
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.basketItems = action.payload.updatedBasket;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});
export const { clearCart } = basketSlice.actions;
export const { removeFromCart } = basketSlice.actions;
export default basketSlice.reducer;
