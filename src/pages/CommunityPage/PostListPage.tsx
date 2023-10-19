import React from 'react';
import PostList from '../../components/post/PostList';
import Header from '../../components/common/Header';
import styled from 'styled-components';

const PostListPage = () => {
    return (
        <div>
            <Header />

            <PostList />
        </div>
    );
};
export default PostListPage;
