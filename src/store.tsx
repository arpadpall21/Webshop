import { createSlice, configureStore } from '@reduxjs/toolkit'
import { StoreState, StoreAction } from './helper/types'

const slice = createSlice({
  name: 'cart',
  initialState: {
    cartProducts: [],
  },
  reducers: {
    alterCartContent: (state: StoreState, action: StoreAction): void => {
      switch (action.payload.actionName) {
        case 'addProductToCart':
          if (!state.cartProducts.includes(action.payload.productId)) {
            state.cartProducts.push(action.payload.productId);
          }
          break
        case 'removeProductFromCart':
          state.cartProducts.splice(state.cartProducts.indexOf(action.payload.productId), 1);
      }
    }
  }
})

export const { alterCartContent } = slice.actions;
export const store = configureStore({ reducer: slice.reducer });
