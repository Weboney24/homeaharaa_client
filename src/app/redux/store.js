import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth_slice";
import cartSlices from "./cart_slice";
import wishlistSlice from "./wishlist_slice";
import CountrySlice from "./country_slice";

const combined = combineReducers({
  cart_slice: cartSlices,
  auth_slice: authSlice,
  wishlist_slice: wishlistSlice,
  country_slice: CountrySlice,
});

export const store = configureStore({
  reducer: combined,
});
