import React from 'react';
import styled from 'styled-components';

const PostViewerBlock = styled.div``;
const PostTitle = styled.div``;
const PostContent = styled.div``;

const PostViewer = () => {
    return (
        <PostViewerBlock>
            <PostTitle>
                <h1>제목</h1>
            </PostTitle>
            <PostContent dangerouslySetInnerHTML={{ __html: '<p>내용입니다.</>' }} />
        </PostViewerBlock>
    );
};
export default PostViewer;
