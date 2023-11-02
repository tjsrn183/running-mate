import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useDeleteCommunityMutation, useGetPostItemQuery, useGetUserInfoQuery } from '../../api/queries';
import PostEditDeleteButton from '../common/PostEditDeleteButton';
import { useAppDispatch } from '../../redux/hooks';
import { setPost } from '../../redux/writeSlice';
import { LoadingSpin } from '../common/LoadingSpin';

const PostViewerBlock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Main = styled.div``;
const PostTitle = styled.div`
    & > h1 {
        font-size: 3rem;
    }
    & > div {
        color: gray;
        font-size: 1.2rem;
        line-height: 1.9rem;
        font-weight: 600;
    }
`;
const PostContent = styled.div`
    & img {
        max-width: auto;
        max-height: 100%;
    }
`;

const PostViewer = () => {
    const { postId } = useParams();

    const postIdNum: number = parseInt(postId!);
    const postItem = useGetPostItemQuery(postIdNum);
    const userInfo = useGetUserInfoQuery();
    const deletePost = useDeleteCommunityMutation();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    console.log('PostViewer에  userInfo', userInfo);
    console.log('PpostId의 타입', typeof postIdNum);
    console.log('PostViewer에 postIdNum', postIdNum);
    console.log('PostViewer에서 찍어본 postItem', postItem);
    const ownPost = userInfo.data?.user.user.id === postItem.data?.UserId;
    console.log('비교', userInfo.data?.user.user.id, postItem.data?.UserId);
    console.log('PostViewer에 ownPost', ownPost);
    console.log('postItem.data.content임 ', postItem.data?.content);
    const onEdit = () => {
        dispatch(
            setPost({
                title: postItem.data?.title as unknown as string,
                body: postItem.data?.content,
                postId: postItem.data?.postId
            })
        );
        navigate(`/community/write/`);
    };

    const onDelete = async () => {
        await deletePost[0](postItem.data?.postId as unknown as number);
        if (deletePost[1].isLoading) {
            return <LoadingSpin />;
        }
        navigate('/');
    };
    return (
        <PostViewerBlock>
            {!postItem.data ? (
                <LoadingSpin />
            ) : (
                <Main>
                    <PostTitle>
                        <h1>{postItem.data?.title}</h1>
                        <div>
                            <span>{postItem.data?.createdAt.substring(0, 10)}</span>
                            <br />
                            <span>{postItem.data?.name}</span>
                        </div>
                    </PostTitle>
                    <PostContent dangerouslySetInnerHTML={{ __html: postItem.data?.content }} />
                    {ownPost && <PostEditDeleteButton onEdit={onEdit} onDelete={onDelete} />}
                </Main>
            )}
        </PostViewerBlock>
    );
};
export default PostViewer;
