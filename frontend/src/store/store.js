import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./shopping-cart/cartSlice";
import cartUiSlice from "./shopping-cart/cartUiSlice";
import logger from "redux-logger";
import thunk from "redux-thunk";
import prodslie from "./shopping-cart/fetched";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    cartUi: cartUiSlice.reducer,
    product: prodslie,
    middleware: [thunk, logger],
  },
});

export default store;
