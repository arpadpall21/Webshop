import { configureStore } from '@reduxjs/toolkit';
import cartSlice, { CartSlice } from './slice/cartSlice';
import productApiSlice, { ProductApiSlice } from './slice/productApiSlice';

export type Store = {
  cartSlice: CartSlice,
  productApiSlice: ProductApiSlice,
}

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    productApi: productApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApiSlice.middleware)
});

export default store;
