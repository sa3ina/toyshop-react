import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const userInfo = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch("http://localhost:3000/users");

  const data = await response.json();
  return data;
});

const usersSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: {
    [userInfo.pending]: (state) => {
      state.status = "loading";
    },
    [userInfo.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.users = action.payload;
    },
    [userInfo.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default usersSlice.reducer;
export { usersSlice };
