import axios from "axios";
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

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
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId }) => {
    await axios.put(`http://localhost:3000/users/${userId}`, {
      productIdToRemove: productId,
    });

    return { userId, productId };
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
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.basketItems = state.basketItems.filter(
        (item) => item.id !== action.payload.productId
      );
    });
    builder.addCase(incrementQuantity, (state, action) => {
      let bask = state.basketItems;
      console.log(state.basketItems);
      console.log(action.payload);
      const { index } = action.payload;
      if (state.basketItems[index]) {
        state.basketItems[index].quantity += 1;
      }
    });
    builder.addCase(decrementQuantity, (state, action) => {
      const { index } = action.payload;
      if (state.basketItems[index] && state.basketItems[index].quantity > 1) {
        state.basketItems[index].quantity -= 1;
      }
    });
  },
});
export const incrementQuantity = createAction(
  "basket/incrementQuantity",
  (index) => ({
    payload: { index },
  })
);

export const decrementQuantity = createAction(
  "basket/decrementQuantity",
  (index) => ({
    payload: { index },
  })
);
export const { clearCart } = basketSlice.actions;

export default basketSlice.reducer;
