import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface writeType {
    nick: string;
    title: string;
    body: string;
}
export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['UserInfo'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000', credentials: 'include' }),
    endpoints: (builder) => ({
        getUserInfo: builder.query<any, void>({
            query: () => 'auth/userinfo',
            providesTags: ['UserInfo']
        }),
        writeCummunity: builder.mutation({
            query: ({ nick, title, body }: writeType) => {
                return {
                    url: '/post',
                    method: 'POST',
                    body: { nick, title, body }
                };
            }
        })
    })
});

export const { useGetUserInfoQuery, useWriteCummunityMutation } = api;
