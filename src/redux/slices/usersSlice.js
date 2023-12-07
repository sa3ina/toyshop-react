import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const userInfo = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch("http://localhost:3000/users");

  const data = await response.json();
  return data;
});
export const deleteUserInDB = createAsyncThunk(
  "users/deleteUser",
  async (userId) => {
    await fetch(`http://localhost:3000/users/${userId}`, {
      method: "DELETE",
    });
    return userId;
  }
);

export const editUserInDB = createAsyncThunk(
  "users/editUser",
  async ({ userId, updatedUser }) => {
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    const data = await response.json();
    return data;
  }
);

const usersSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
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
    [deleteUserInDB.fulfilled]: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
      // Assuming users is an array in your state and you're removing the user by ID
    },

    [editUserInDB.fulfilled]: (state, action) => {
      const updatedUser = action.payload;
      const index = state.users.findIndex((user) => user.id === updatedUser.id);

      if (index != -1) {
        state.users[index] = updatedUser;
      }
    },
  },
});

export default usersSlice.reducer;
export { usersSlice };
