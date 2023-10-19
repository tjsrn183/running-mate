import React from 'react';
import PostViewer from '../../components/post/PostViewer';
import Header from '../../components/common/Header';
import { Space } from '../../components/common/Space';

const PostPage = () => {
    return (
        <div>
            <Header />

            <PostViewer />
        </div>
    );
};
export default PostPage;
