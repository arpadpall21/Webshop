import { createSlice, configureStore } from '@reduxjs/toolkit'
import { StoreState, StoreAction } from './helper/types'

const slice = createSlice({
  name: 'cart',
  initialState: {
    cartProducts: [],
  },
  reducers: {
    alterCartContent: (state: StoreState, action: StoreAction): void => {
      const sessionCartContent = getSessionCartContent();
      const productId = action.payload.productId;

      switch (action.payload.actionName) {
        case 'addProductToCart':
          if (!sessionCartContent.includes(productId)) {
            sessionCartContent.push(productId);
            window.sessionStorage.setItem('cart', JSON.stringify(sessionCartContent));
            state.cartProducts = sessionCartContent;
          }
          break;
        case 'removeProductFromCart':
          if (sessionCartContent.indexOf(productId) >= 0) {
            sessionCartContent.splice(sessionCartContent.indexOf(productId), 1);
            window.sessionStorage.setItem('cart', JSON.stringify(sessionCartContent));
            state.cartProducts = sessionCartContent;
          }
      }
    }
  }
})

export function getSessionCartContent(): number[] {
  const sessionCartContent = window.sessionStorage.getItem('cart');

  if (sessionCartContent?.length) {
    return JSON.parse(sessionCartContent);
  }
  return [];
}

export const store = configureStore({ reducer: slice.reducer });
export const { alterCartContent } = slice.actions;
