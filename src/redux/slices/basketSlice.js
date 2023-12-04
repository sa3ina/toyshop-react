import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const basketProducts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch("http://localhost:3000/posts");

  const data = await response.json();
  return data;
});
const basketSlice = createSlice({
  name: "basket",
  initialState: {
    basketItems: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.basketItems.find(
        (item) => item.id == action.payload
      );

      if (existingItem) {
        existingItem.quantity += 1;
        // state.basketItems = [...state.basketItems];
      } else {
        state.basketItems.push({ id: action.payload, quantity: 1 });
      }
    },
  },
  // extraReducers: {
  //   [basketProducts.pending]: (state) => {
  //     state.status = "loading";
  //   },
  //   [basketProducts.fulfilled]: (state, action) => {
  //     state.status = "succeeded";
  //     state.basketItems = action.payload;
  //   },
  //   [basketProducts.rejected]: (state, action) => {
  //     state.status = "failed";
  //     state.error = action.error.message;
  //   },
  // },
});

export default basketSlice.reducer;
export const { addToCart } = basketSlice.actions;
export { basketSlice };
