import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductId } from './cartSlice';

const productApiSlice = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  endpoints: (builder) => ({
    fetchProduct: builder.query({
      query: (productId: ProductId): string => `/products/${productId}`
    }),
    fetchProductList: builder.query({
      query: (startProductId: number = 0): string => {
        if (startProductId > 90) {
          startProductId = 90;
        }

        return `/products?limit=10&skip=${startProductId}`;
      }
    }),
  }),
});

export type ProductApiSlice = typeof productApiSlice;
export const { useFetchProductQuery, useFetchProductListQuery } = productApiSlice;
export default productApiSlice;
