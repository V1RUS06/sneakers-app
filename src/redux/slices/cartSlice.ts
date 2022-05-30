import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SneakersTypes } from "../../types";

interface CartSliceData {
  cartSneakers: SneakersTypes[];
}

const initialState: CartSliceData = {
  cartSneakers: [],
};

export const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<SneakersTypes[]>) {
      state.cartSneakers = action.payload;
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
