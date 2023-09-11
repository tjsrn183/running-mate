import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useGetPostItemQuery } from '../../api/queries';

const PostViewerBlock = styled.div`
    display: flex;
    justify-content: center;
`;
const Main = styled.div`
    margin-top: 50px;
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
    console.log('PpostId의 타입', typeof postIdNum);
    console.log('PostViewer에 postIdNum', postIdNum);
    console.log('PostViewer에서 찍어본 postItem', postItem);
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
            </Main>
        </PostViewerBlock>
    );
};
export default PostViewer;
