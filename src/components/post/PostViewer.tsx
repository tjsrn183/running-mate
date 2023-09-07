import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useGetPostItemQuery } from '../../api/queries';
import { type } from 'os';

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
    console.log('PpostId의 타입', typeof postIdNum);
    const postItem = useGetPostItemQuery(postIdNum);
    console.log('PostViewer에서 찍어본 postItem', postItem);
    return (
        <PostViewerBlock>
            <Main>
                <PostTitle>
                    <h1>제목이고요 전 황선구입니다.</h1>
                    <div>
                        <span>2021-05-05</span>
                        <br />
                        <span>황선구</span>
                    </div>
                </PostTitle>
                <PostContent dangerouslySetInnerHTML={{ __html: '<p>내용입니다.</>' }} />
            </Main>
        </PostViewerBlock>
    );
};
export default PostViewer;
