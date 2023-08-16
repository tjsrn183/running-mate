import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['UserInfo'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    endpoints: (builder) => ({
        getUserInfo: builder.query({
            query: () => 'auth/userinfo',
            providesTags: (result, error, arg) => [{ type: 'UserInfo', id: arg.id }]
        })
    })
});

export const { useGetUserInfoQuery } = api;
