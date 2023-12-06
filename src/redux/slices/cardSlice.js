import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const cardProducts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch("http://localhost:3000/posts");

  const data = await response.json();
  return data;
});
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId) => {
    await fetch(`http://localhost:3000/posts/${productId}`, {
      method: "DELETE",
    });
    return productId; // Return the ID of the deleted product
  }
);
const cardSlice = createSlice({
  name: "product",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
    check: false,
  },
  reducers: {
    setCheck: (state, action) => {
      state.check = action.payload;
    },
  },
  extraReducers: {
    [cardProducts.pending]: (state) => {
      state.status = "loading";
    },
    [cardProducts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.posts = action.payload;
    },
    [cardProducts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.posts = state.posts.filter((user) => user.id !== action.payload);
      // Assuming users is an array in your state and you're removing the user by ID
    },
  },
});

export default cardSlice.reducer;
export const { setCheck } = cardSlice.actions;

export { cardSlice };
