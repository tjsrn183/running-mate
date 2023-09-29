import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type } from 'os';
import { LocationType } from '../redux/runSlice';
//사용자정보 패칭 타입
interface userInfoType {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}
//커뮤니티 글쓰기 타입
interface writeType {
    nick?: string;
    title: string;
    body: string;
    postId?: number | null;
}
//서버로부터 커뮤니티 글정보 패칭 타입
interface detailPostType {
    createdAt: string;
    name: string;
    title: string;
    content: any;
    postId: number;
    user_id: number;
}
//글 업로드후 해당 게시물로 이동하기위해 받는 정보의 타입
interface resultWriteType {
    data: any;
    postId: number;
}
//포스트리스트 페이지에서 포스트를 배열로 받는 타입
interface postListType {
    data: Array<detailPostType>;
    slice: (arg1: number, arg2: number) => Array<any>;
    length: number;
    postId: number;
    map: any;
}
interface runRegisterResultType {
    runItemId: number;
}

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['UserInfo', 'PostItem', 'PostList', 'RunItem'],
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
            },
            invalidatesTags: ['PostItem']
        }),
        imgUploadCommunity: builder.mutation<{ url: string }, any>({
            query: (formData) => {
                {
                    return {
                        url: '/post/img',
                        method: 'POST',
                        body: formData,
                        responseType: 'json'
                    };
                }
            }
        }),
        runRegisterItem: builder.mutation<runRegisterResultType, LocationType>({
            query: ({
                start,
                end,
                startLocationNaturalLan,
                endLocationNaturalLan,
                durationTime,
                distance,
                date,
                title,
                body,
                numberOfPeople,
                name
            }) => {
                return {
                    url: '/run/register',
                    method: 'POST',
                    body: {
                        start,
                        end,
                        startLocationNaturalLan,
                        endLocationNaturalLan,
                        durationTime,
                        distance,
                        date,
                        title,
                        body,
                        numberOfPeople,
                        name
                    },
                    responseType: 'json'
                };
            },
            invalidatesTags: ['RunItem']
        }),
        getRunItem: builder.query<LocationType, number>({
            query: (runItemId) => `/run/${runItemId}`,
            providesTags: (result, error, arg) => [{ type: 'RunItem', id: arg }]
        }),

        editCommunity: builder.mutation<resultWriteType, writeType>({
            query: ({ nick, title, body, postId }: writeType) => {
                return {
                    url: `/post/edit/${postId}`,
                    method: 'PUT',
                    body: { title, body, postId },
                    responseType: 'json'
                };
            },
            invalidatesTags: (result, error, arg) => [{ type: 'PostItem', id: arg.postId as unknown as number }]
        }),
        deleteCommunity: builder.mutation<void, number>({
            query: (postId) => {
                return {
                    url: `/post/delete/${postId}`,
                    method: 'DELETE'
                };
            },
            invalidatesTags: (result, error, arg) => [{ type: 'PostItem', id: arg }]
        }),
        getPostItem: builder.query<detailPostType, number>({
            query: (postId) => `/post/${postId}`,
            providesTags: (result, error, arg) => [{ type: 'PostItem', id: arg }]
        }),
        getPostList: builder.query<postListType, number>({
            query: (page) => `/post/list/${page}`,
            providesTags: (result, error, arg) => {
                {
                    console.log('getPostList에 의 return', result, error, arg);
                    return result
                        ? [...result.map(({ postId }: { postId: number }) => ({ type: 'PostItem', id: postId }))]
                        : ['PostList'];
                }
            }
        })
    })
});

export const {
    useGetUserInfoQuery,
    useWriteCommunityMutation,
    useGetPostItemQuery,
    useGetPostListQuery,
    useEditCommunityMutation,
    useDeleteCommunityMutation,
    useImgUploadCommunityMutation,
    useRunRegisterItemMutation,
    useGetRunItemQuery
} = api;
