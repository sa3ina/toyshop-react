import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ userId, productId }) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      const currentUserData = response.data;
      console.log(currentUserData.wishlist);
      console.log(productId.id);
      const existingItemIndex = currentUserData.wishlist.findIndex(
        (item) => item.id === productId.id
      );

      if (existingItemIndex !== -1) {
        console.log("Item already exists in the wishlist. Removing it.");
        currentUserData.wishlist.splice(existingItemIndex, 1);
      } else {
        console.log("Item does not exist in the wishlist. Adding it.");
        currentUserData.wishlist.push(productId);
      }
      const updatedUser = { ...currentUserData };
      await axios.patch(`http://localhost:3000/users/${userId}`, updatedUser);

      return currentUserData.wishlist;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  }
);

const localWishlist = JSON.parse(localStorage.getItem("loggedInUser"));

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: localWishlist?.wishlist || [],
    status: "idle",
    error: null,
  },
  reducers: {
    removeFromWishlist: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.wishlistItems.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToWishlist.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addToWishlist.fulfilled, (state, action) => {
      state.status = "succeeded";
      console.log("test success", action.payload);
      state.wishlistItems = action.payload;
    });
    builder.addCase(addToWishlist.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
