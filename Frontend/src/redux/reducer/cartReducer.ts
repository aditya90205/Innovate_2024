import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { cartReducerInitialState } from "../../types/reducer-types";
import { cartItem, ShippingInfo } from "../../types/types";

const initialState: cartReducerInitialState = {
  loading: false,
  cartItems: [],
  subTotal: 0,
  tax: 0,
  shippingCharges: 0,
  discount: 0,
  total: 0,
  shippingInfo: {
    address: "",
    city: "",
    pinCode: "",
    country: "",
    state: "",
  },
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<cartItem>) => {
      state.loading = true;

      const index = state.cartItems.findIndex(
        (i: { productId: string; }) => i.productId === action.payload.productId
      );

      if (index !== -1) state.cartItems[index] = action.payload;
      else {
        state.cartItems.push(action.payload);
      }
      state.loading = false;
    },

    removeCartItem: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (i: { productId: string; }) => i.productId !== action.payload
      );
      state.loading = false;
    },

    calculatePrice: (state) => {
      const subTotal: number = state.cartItems.reduce((total: number, item: cartItem) => {
        return total + item.price * item.quantity;
      }, 0);

      state.subTotal = subTotal;
      state.tax = Math.round(state.subTotal * 0.18);
      state.shippingCharges = state.subTotal > 1000 ? 0 : 200;
      state.total =
        state.subTotal + state.tax + state.shippingCharges - state.discount;
    },
    discountApplied: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
    saveShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
      state.shippingInfo = action.payload;
    },
    reserCart: () => initialState,
  },
});

export const { addToCart, removeCartItem, calculatePrice, discountApplied, saveShippingInfo, reserCart } =
  cartReducer.actions;
