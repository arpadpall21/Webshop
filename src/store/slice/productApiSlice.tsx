import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const productApiSlice = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  endpoints: (builder) => ({
    fetchProduct: builder.query({
      query: (productId: number): string => `/products/${productId}`
    }),
    fetchProductList: builder.query({
      query: (howMany: number = 0): string => `/products?limit=${howMany}`
    }),
  }),
});

export type ProductApiSlice = typeof productApiSlice;
export const { useFetchProductQuery, useFetchProductListQuery } = productApiSlice;
export default productApiSlice;
