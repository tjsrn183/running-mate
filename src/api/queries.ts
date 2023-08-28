import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['UserInfo'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000', credentials: 'include' }),
    endpoints: (builder) => ({
        getUserInfo: builder.query<any, void>({
            query: () => 'auth/userinfo',
            providesTags: (result, error, arg) => [{ type: 'UserInfo' }]
        })
    })
});

export const { useGetUserInfoQuery } = api;
