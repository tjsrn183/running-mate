import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useDeleteCommunityMutation, useGetPostItemQuery, useGetUserInfoQuery } from '../../api/queries';
import PostEditDeleteButton from '../common/PostEditDeleteButton';
import { useAppDispatch } from '../../redux/hooks';
import { initiallize, setPost } from '../../redux/writeSlice';

const PostViewerBlock = styled.div`
    display: flex;
    justify-content: center;
`;
const Main = styled.div`
    width: 60%;
    margin: 0 auto;
`;
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
const PostContent = styled.div``;

const PostViewer = () => {
    const { postId } = useParams();
    const postIdNum: number = parseInt(postId!);
    const postItem = useGetPostItemQuery(postIdNum);
    const userInfo = useGetUserInfoQuery();
    const deletePost = useDeleteCommunityMutation();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    console.log('PpostId의 타입', typeof postIdNum);
    console.log('PostViewer에 postIdNum', postIdNum);
    console.log('PostViewer에서 찍어본 postItem', postItem);
    const ownPost = (userInfo.data?.user && userInfo.data?.user.user.id) === (postItem.data && postItem.data.user_id);
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
    useEffect(() => {
        console.log('PostViewer에 의 useEffect');
        return () => {
            dispatch(initiallize());
        };
    });
    const onDelete = async () => {
        const result1 = await deletePost[0](postItem.data?.postId as unknown as number);
        console.log('onDelete에 의  result1', result1);
        window.location.replace('/');
        navigate(`/`);
    };
    return (
        <PostViewerBlock>
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
        </PostViewerBlock>
    );
};
export default PostViewer;
