import { createSlice } from '@reduxjs/toolkit';
import { Store } from '../store';

export type ProductId = number;
export type CartSlice = ProductId[];
type Action = {
  type: string,
  payload: ProductId
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: [] as CartSlice,
  reducers: {
    addProductId: (state: CartSlice, action: Action):void => {
      state.push(action.payload);
    },
    removeProductId: (state: CartSlice, action: Action):void => {
      state.splice(state.indexOf(action.payload), 1);
    },
  }
});

export function selectCartSlice (store: Store): CartSlice {
  return store.cartSlice;
}

export const { addProductId, removeProductId } = cartSlice.actions;
export default cartSlice;
