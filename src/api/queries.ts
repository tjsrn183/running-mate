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
    UserId: number;
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
interface runItemListType {
    data: Array<LocationType>;
    map: any;
    slice: (arg1: number, arg2: number) => Array<any>;
}
interface runRegisterResultType {
    runItemId: number;
}
interface chatRoomInputType {
    title: string;
    max: number;
    name: string;
    runItemId: number;
}
interface sendChatType {
    roomId: number;
    message: string;
    user: string;
}
interface logintype {
    id: string;
    password: string;
}
interface jointype extends logintype {
    nick: string;
}

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['UserInfo', 'PostItem', 'PostList', 'RunItem', 'EnterRoom', 'RunItemDetail'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000', credentials: 'include' }),
    endpoints: (builder) => ({
        localJoin: builder.mutation<{ message: string }, jointype>({
            query: ({ id, password, nick }) => ({
                url: '/auth/join',
                method: 'POST',
                body: { id, password, nick },
                responseType: 'json'
            })
        }),
        localLogin: builder.mutation<{ message: string }, logintype>({
            query: ({ id, password }) => ({
                url: '/auth/login',
                method: 'POST',
                body: { id, password },
                responseType: 'json',
                credentials: 'include'
            })
        }),
        createRoom: builder.mutation<void, chatRoomInputType>({
            query: ({ title, max, name, runItemId }) => {
                console.log('크리에이트 룸 쿼리가 생성됨');
                return {
                    url: '/chat/room',
                    method: 'POST',
                    body: { title, max, name, runItemId },
                    responseType: 'json'
                };
            }
        }),
        deleteRunItem: builder.mutation<void, number>({
            query: (runItemId) => {
                return {
                    url: `/run/delete/${runItemId}`,
                    method: 'DELETE',
                    responseType: 'json'
                };
            },
            invalidatesTags: (result, error, arg) => [{ type: 'RunItem', id: arg }]
        }),

        enterRoom: builder.query<any, number>({
            query: (roomId) => `chat/room/${roomId}`,
            providesTags: (result, error, arg) => {
                console.log('enterRoom에 의 return', result, error, arg);
                return result
                    ? [
                          ...result.map(({ chatId }: { chatId: number }) => ({
                              type: 'EnterRoom',
                              id: chatId
                          }))
                      ]
                    : ['EnterRoom'];
            }
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
            providesTags: (result, error, arg) => [{ type: 'RunItemDetail', id: arg }]
        }),
        getUserInfo: builder.query<any, void>({
            query: () => 'auth/userinfo',
            providesTags: (result, error, arg) => {
                console.log('getUserInfo에 의 return', result, error, arg);
                console.log('result.user.user.id', result?.user.user.id);
                return [{ type: 'UserInfo', id: result?.user.user.id }];
            }
        }),
        logout: builder.mutation<number, number>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
                credentials: 'include'
            }),
            invalidatesTags: (result, error, arg) => {
                console.log('kakao로그인에서 result찍어봄', result);
                return [{ type: 'UserInfo', id: arg }];
            }
        }),
        getRunItemList: builder.query<any, number>({
            query: (page) => `/run/list/${page}`,
            providesTags: (result, error, arg) => {
                console.log('쿼리즈에서 결과다', result);

                return result
                    ? [
                          ...result.ItemList.map(({ runItemId }: { runItemId: number }) => ({
                              type: 'RunItem',
                              id: runItemId
                          }))
                      ]
                    : [];
            },
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                console.log('newItems다아아아', newItems);
                const mergedItemList = currentCache.ItemList.concat(newItems.ItemList);
                const uniqueItemList = mergedItemList.filter((item: any, index: string, self: any) => {
                    return self.findIndex((t: any) => t.runItemId === item.runItemId) === index;
                });

                currentCache.ItemList = uniqueItemList;
            },
            forceRefetch({ currentArg, previousArg }) {
                console.log('forceRefetch다', currentArg, previousArg);
                return currentArg !== previousArg;
            }
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
    useGetRunItemQuery,
    useGetRunItemListQuery,
    useCreateRoomMutation,
    useDeleteRunItemMutation,
    useEnterRoomQuery,
    useLogoutMutation,
    useLocalJoinMutation,
    useLocalLoginMutation
} = api;
