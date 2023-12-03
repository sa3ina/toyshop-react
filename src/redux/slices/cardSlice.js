import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const cardProducts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch("http://localhost:3000/posts");

  const data = await response.json();
  return data;
});

const cardSlice = createSlice({
  name: "product",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {},
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
  },
});

export default cardSlice.reducer;
export { cardSlice };
