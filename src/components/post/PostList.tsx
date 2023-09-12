import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { useGetPostListQuery } from '../../api/queries';

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
const NameSpan = styled.span`
    color: gray;
`;
const CreateDate = styled.span`
    font-size: small;
    color: gray;
`;
const Title = styled.div`
    margin-top: 20px;
    font-size: large;
    font-weight: border;
`;
const SubInfo = styled.div``;
const PostItemClick = styled(NavLink)`
    &:hover {
        cursor: pointer;
    }
`;
interface postType {
    postId: number;
    title: string;
    name: string;
    content: string;
    createdAt: string;
    body: string;
}

const PostItem = ({ posts }: { posts: postType }) => {
    const { postId, title, name, content, createdAt, body } = posts;

    return (
        <PostViewerBlock>
            <Title>{title}</Title>
            <SubInfo>
                <NameSpan>{name}</NameSpan>&nbsp;
                <CreateDate>{createdAt.substring(0, 10)}</CreateDate>
            </SubInfo>
            <p>{body}</p>
        </PostViewerBlock>
    );
};

const PostList = () => {
    const postList = useGetPostListQuery(1);
    console.log(postList);

    return (
        <PostListBlock>
            <Main>
                <StyledLink to="/community/write">글 작성하기</StyledLink>
                <ListBlock>
                    {!postList.isLoading && postList.data && (
                        <div>
                            {postList.data.map((post: postType) => (
                                <PostItemClick key={post.postId} to={`/community/${post.postId}`}>
                                    <PostItem posts={post} />
                                </PostItemClick>
                            ))}
                        </div>
                    )}
                </ListBlock>
            </Main>
        </PostListBlock>
    );
};
export default PostList;
