import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type } from 'os';
import { LocationType } from '../redux/runSlice';
import { postType } from '../components/post/PostList';
import { chatType } from '../components/ChatPage';

//사용자정보 패칭 타입
interface userInfoType {
    user: {
        user: {
            id: number;
            nick: string;
            createdAt: string;
            updated_at: string;
        };
    };
}
//커뮤니티 글쓰기 타입
interface writeType {
    nick?: string;
    title: string;
    body: string | undefined;
    postId?: number | null;
}
//서버로부터 커뮤니티 글정보 패칭 타입
interface detailPostType {
    createdAt: string;
    name: string;
    title: string;
    content: string;
    postId: number;
    UserId: number;
}
//포스트리스트 페이지에서 포스트를 배열로 받는 타입
interface postListType {
    data: Array<detailPostType>;
    slice: (arg1: number, arg2: number) => Array<postType>;
    length: number;
    postId: number;
    map<T>(callback: ({ postId }: { postId: number }) => T): ['PostItem'];
}
interface runRegisterResultType {
    runItemId: number;
}
interface chatRoomInputType {
    title?: string;
    max: number;
    name: string;
    runItemId: number;
}
interface logintype {
    id: string;
    password: string;
}
interface jointype extends logintype {
    nick: string;
}
interface enterChatRoomType extends chatType {
    map<T>(callback: ({ chatId }: { chatId: number }) => T): ['EnterRoom'];
}
//홈화면의 아이템 리스트의 타입
interface runItemListType {
    totalPage: number;
    ItemList: runItemType[];
    countItem: number;
}
//홈화면에서 아이템각각의 데이터타입
export interface runItemType {
    body: string;
    date: string;
    distance: number;
    durationTime: number;
    end: { lat: number; lon: number };
    endLocationNaturalLan: string;
    name: string;
    runItemId: number;
    start: { lat: number; lon: number };
    startLocationNaturalLan: string;
    thumbnail: string;
    numberOfPeople?: number;
}

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['UserInfo', 'PostItem', 'PostList', 'RunItem', 'EnterRoom', 'RunItemDetail'],
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.runningmate.shop', credentials: 'include' }),
    endpoints: (builder) => ({
        localJoin: builder.mutation<{ message: string }, jointype>({
            query: ({ id, password, nick }) => ({
                url: '/api/auth/join',
                method: 'POST',
                body: { id, password, nick },
                responseType: 'json'
            })
        }),
        localLogin: builder.mutation<{ message: string }, logintype>({
            query: ({ id, password }) => ({
                url: '/api/auth/login',
                method: 'POST',
                body: { id, password },
                responseType: 'json',
                credentials: 'include'
            })
        }),
        createRoom: builder.mutation<void, chatRoomInputType>({
            query: ({ title, max, name, runItemId }) => {
                return {
                    url: '/api/chat/room',
                    method: 'POST',
                    body: { title, max, name, runItemId },
                    responseType: 'json'
                };
            }
        }),
        deleteRunItem: builder.mutation<void, number>({
            query: (runItemId) => {
                return {
                    url: `/api/run/delete/${runItemId}`,
                    method: 'DELETE',
                    responseType: 'json'
                };
            },
            invalidatesTags: (result, error, arg) => [{ type: 'RunItem', id: arg }]
        }),

        enterRoom: builder.query<enterChatRoomType, number>({
            query: (roomId) => `/api/chat/room/${roomId}`,
            providesTags: (result, error, arg) => {
                return result
                    ? [
                          ...result.map(({ chatId }) => ({
                              type: 'EnterRoom',
                              id: chatId
                          }))
                      ]
                    : ['EnterRoom'];
            }
        }),

        writeCommunity: builder.mutation<{ postId: number }, writeType>({
            query: ({ nick, title, body }: writeType) => {
                return {
                    url: '/api/post',
                    method: 'POST',
                    body: { nick, title, body },
                    responseType: 'json'
                };
            },
            invalidatesTags: ['PostItem']
        }),
        imgUploadCommunity: builder.mutation<{ url: string }, FormData>({
            query: (formData) => {
                {
                    return {
                        url: '/api/post/img',
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
                    url: '/api/run/register',
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
            query: (runItemId) => `/api/run/${runItemId}`,
            providesTags: (result, error, arg) => [{ type: 'RunItem', id: arg }]
        }),
        getUserInfo: builder.query<userInfoType, void>({
            query: () => '/api/auth/userinfo',
            providesTags: (result, error, arg) => {
                return [{ type: 'UserInfo', id: result?.user.user.id }];
            }
        }),
        logout: builder.mutation<number, number>({
            query: () => ({
                url: '/api/auth/logout',
                method: 'POST',
                credentials: 'include'
            }),
            invalidatesTags: (result, error, arg) => {
                return [{ type: 'UserInfo', id: arg }];
            }
        }),
        getRunItemList: builder.query<runItemListType, number>({
            query: (page) => `/api/run/list/${page}`,
            providesTags: (result, error, arg) => {
                return result
                    ? [
                          ...result.ItemList.map(({ runItemId }) => ({
                              type: 'RunItem' as const,
                              id: runItemId
                          }))
                      ]
                    : ['RunItem'];
            },
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                const mergedItemList = currentCache.ItemList.concat(newItems.ItemList);
                const uniqueItemList = mergedItemList.filter(
                    (item: runItemType, index: number, self: Array<runItemType>) => {
                        return self.findIndex((t: runItemType) => t.runItemId === item.runItemId) === index;
                    }
                );

                currentCache.ItemList = uniqueItemList;
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            }
        }),
        editCommunity: builder.mutation<{ postId: number }, writeType>({
            query: ({ nick, title, body, postId }: writeType) => {
                return {
                    url: `/api/post/edit/${postId}`,
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
                    url: `/api/post/delete/${postId}`,
                    method: 'DELETE'
                };
            },
            invalidatesTags: (result, error, arg) => [{ type: 'PostItem', id: arg }]
        }),
        getPostItem: builder.query<detailPostType, number>({
            query: (postId) => `/api/post/${postId}`,
            providesTags: (result, error, arg) => [{ type: 'PostItem', id: arg }]
        }),
        getPostList: builder.query<postListType, number>({
            query: (page) => `/api/post/list/${page}`,
            providesTags: (result, error, arg) => {
                return result
                    ? [...result.map(({ postId }: { postId: number }) => ({ type: 'PostItem', id: postId }))]
                    : ['PostList'];
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
    useGetRunItemQuery,
    useGetRunItemListQuery,
    useCreateRoomMutation,
    useDeleteRunItemMutation,
    useEnterRoomQuery,
    useLogoutMutation,
    useLocalJoinMutation,
    useLocalLoginMutation
} = api;
