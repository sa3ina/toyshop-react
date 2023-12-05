import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addToCart = createAsyncThunk(
  "basket/addToCart",
  async ({ userId, productId }) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      const currentUserData = response.data;
      console.log(currentUserData.basket);
      console.log(productId.id);
      const existingItem = currentUserData.basket.find(
        (item) => item.id === productId.id
      );

      if (existingItem) {
        console.log("Item already exists in the basket");
        // Change the quantity of the existing item
        const updatedBasket = currentUserData.basket.map((item) =>
          item.id === productId.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        const updatedUser = { ...currentUserData, basket: updatedBasket };
        await axios.patch(`http://localhost:3000/users/${userId}`, updatedUser);
        console.log("Item already exists in the basket");
      } else {
        console.log("Item does not exist in the basket");
        const updatedBasket = [...currentUserData.basket, productId];
        const updatedUser = { ...currentUserData, basket: updatedBasket };
        await axios.patch(`http://localhost:3000/users/${userId}`, updatedUser);
      }

      // const updatedBasket = [...currentUserData.basket, productId];
      // const updatedUser = { ...currentUserData, basket: updatedBasket };

      // await axios.patch(`http://localhost:3000/users/${userId}`, updatedUser);

      return { updatedBasket };
    } catch (error) {
      console.error("Error adding to cart:", error);
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
      state.basketItems = [];
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
export default basketSlice.reducer;
