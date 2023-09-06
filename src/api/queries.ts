import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface writeType {
    nick: string;
    title: string;
    body: string;
}
interface resultWriteType {
    data: any;
    postId: number;
}
export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['UserInfo', 'PostItem'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000', credentials: 'include' }),
    endpoints: (builder) => ({
        getUserInfo: builder.query<any, void>({
            query: () => 'auth/userinfo',
            providesTags: ['UserInfo']
        }),
        writeCummunity: builder.mutation<resultWriteType, writeType>({
            query: ({ nick, title, body }: writeType) => {
                return {
                    url: '/post',
                    method: 'POST',
                    body: { nick, title, body },
                    responseType: 'json'
                };
            }
        }),
        getPostItem: builder.query<writeType, number>({
            query: (postId) => `/post/${postId}`,
            providesTags: (result, error, arg) => [{ type: 'PostItem', id: arg }]
        })
    })
});

export const { useGetUserInfoQuery, useWriteCummunityMutation, useGetPostItemQuery } = api;
