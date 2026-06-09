import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
    }),
    getCars: builder.query({
      query: () => '/cars',
    }),
    getBanners: builder.query({
      query: () => '/banners',
    }),
    getCategories: builder.query({
      query: () => '/categories',
    }),
    getUsers: builder.query({
      query: () => '/users',
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCarsQuery,
  useGetBannersQuery,
  useGetCategoriesQuery,
  useGetUsersQuery,
} = apiSlice;
