import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const PostListBlock = styled.div`
    display: flex;
    justify-content: center;
`;
const StyledLink = styled(Link)`
    color: ${palette.back_ground_orange};
    background-color: ${palette.orange};
    text-align: center;
    line-height: 32px;
    width: 90px;
    height: 32px;
    border-radius: 4px;
    font-weight: 800;
    font-size: large;
    padding: 5px;
    &:hover {
        background-color: ${palette.hover_orange};
    }
`;
const PostViewerBlock = styled.div`
    width: 50rem;
    height: 150px;
    border-bottom: 1px solid hsla(220, 9%, 46%, 0.3);
`;
const ListBlock = styled.div``;
const Main = styled.div`
    margin: 50px;
`;

const PostItem = () => {
    return (
        <PostViewerBlock>
            <h2>제목</h2>
            <b>나한과</b>
            <p>포스트내용의 일부분</p>
        </PostViewerBlock>
    );
};

const PostList = () => {
    return (
        <PostListBlock>
            <Main>
                <StyledLink to="/community/write">글 작성하기</StyledLink>
                <ListBlock>
                    <PostItem />
                    <PostItem />
                    <PostItem />
                </ListBlock>
            </Main>
        </PostListBlock>
    );
};
export default PostList;
