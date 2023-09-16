import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface writeType {
    nick: string;
    title: string;
    body: string;
    postId?: number;
}
interface detailPostType {
    createdAt: string;
    name: string;
    title: string;
    content: any;
    postId: number;
    user_id: number;
}
interface resultWriteType {
    data: any;
    postId: number;
}

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['UserInfo', 'PostItem', 'PostList'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000', credentials: 'include' }),
    endpoints: (builder) => ({
        getUserInfo: builder.query<any, void>({
            query: () => 'auth/userinfo',
            providesTags: ['UserInfo']
        }),
        writeCommunity: builder.mutation<resultWriteType, writeType>({
            query: ({ nick, title, body }: writeType) => {
                return {
                    url: '/post',
                    method: 'POST',
                    body: { nick, title, body },
                    responseType: 'json'
                };
            }
        }),
        editCommunity: builder.mutation<resultWriteType, writeType>({
            query: ({ nick, title, body, postId }: writeType) => {
                console.log('editCommunity 사용됨');
                return {
                    url: `/post/edit/${postId}`,
                    method: 'PUT',
                    body: { nick, title, body, postId },
                    responseType: 'json'
                };
            }
        }),
        deleteCommunity: builder.mutation<any, number>({
            query: (postId) => {
                return {
                    url: `/post/delete/${postId}`,
                    method: 'DELETE'
                };
            }
        }),
        getPostItem: builder.query<detailPostType, number>({
            query: (postId) => `/post/${postId}`,
            providesTags: (result, error, arg) => [{ type: 'PostItem', id: arg }]
        }),
        getPostList: builder.query<any, any>({
            query: (page) => `/post/list/${page}`,
            providesTags: (result, error, arg) => [{ type: 'PostList', id: arg.page }]
        })
    })
});

export const {
    useGetUserInfoQuery,
    useWriteCommunityMutation,
    useGetPostItemQuery,
    useGetPostListQuery,
    useEditCommunityMutation,
    useDeleteCommunityMutation
} = api;
