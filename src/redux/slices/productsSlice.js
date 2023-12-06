import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const productItems = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("http://localhost:3000/posts");
    const data = await response.json();
    return data;
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId) => {
    await fetch(`http://localhost:3000/posts/${productId}`, {
      method: "DELETE",
    });
    return productId; // Return the ID of the deleted product
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
    check: false,
  },
  reducers: {
    setCheck: (state, action) => {
      state.check = action.payload;
    },
    // Add other reducers if needed
  },
  extraReducers: {
    [productItems.pending]: (state) => {
      state.status = "loading";
    },
    [productItems.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.products = action.payload;
    },
    [productItems.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default productsSlice.reducer;
export const { setCheck } = productsSlice.actions;
export { productsSlice };
