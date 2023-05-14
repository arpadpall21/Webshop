import { createSlice } from '@reduxjs/toolkit';
import store, { Store } from '../store';


export type Url = string;
export type Product = {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: Url
  images: Url[]
}
export type CartSlice = {
  [productId: string]: Product
}
type Action = {
  type: string
  payload: Product
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {} as CartSlice,
  reducers: {
    addProductToCart: (state: CartSlice, action: Action): void => { 
      state[action.payload.id] = action.payload;
    },
    removeProductFromCart: (state: CartSlice, action: Action): void => {
      delete state[action.payload.id];
    },
  }
});

export const cartHasProduct = (product: Product) => {
  if (product) {
    return product.id in store.getState().cart;
  }

  return false;
}

export const selectCart = (store: Store): CartSlice => store.cart
export const { addProductToCart, removeProductFromCart } = cartSlice.actions;
export default cartSlice;
