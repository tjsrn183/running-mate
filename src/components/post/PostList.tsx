import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PostViewerBlock = styled.div``;
const PostListBlock = styled.div``;
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
      <Link to="/communityWrite">새 글 작성하기</Link>
      <PostItem />
      <PostItem />
      <PostItem />
    </PostListBlock>
  );
};
export default PostList;
