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
    return productId;
  }
);

export const editProductInDB = createAsyncThunk(
  "products/editProduct",
  async ({ productId, updatedProduct }) => {
    const response = await fetch(`http://localhost:3000/posts/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    const data = await response.json();
    return data;
  }
);

const cardSlice = createSlice({
  name: "product",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
    check: false,
    wishCheck: false,
  },
  reducers: {
    setCheck: (state, action) => {
      state.check = action.payload;
    },
    setWishCheck: (state, action) => {
      state.wishCheck = action.payload;
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
    },

    [editProductInDB.fulfilled]: (state, action) => {
      const updatedProduct = action.payload;
      const index = state.posts.findIndex(
        (post) => post.id === updatedProduct.id
      );

      if (index != -1) {
        state.posts[index] = updatedProduct;
      }
    },
  },
});

export default cardSlice.reducer;
export const { setCheck } = cardSlice.actions;
export const { setWishCheck } = cardSlice.actions;
export { cardSlice };
