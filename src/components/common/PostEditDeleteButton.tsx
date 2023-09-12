import styled from 'styled-components';
import React from 'react';
import palette from '../../lib/styles/palette';
const PostActionButtonBlock = styled.div`
    display: flex;
`;
const ActionButton = styled.button`
    position: fixed;
    bottom: calc((100% - 650px) / 2);
    right: calc((100% - 650px) / 2);
    cursor: pointer;
    border: none;
    background-color: ${palette.orange};
    color: white;
    &:hover {
        background-color: ${palette.hover_orange};
    }
`;

const PostEditDeleteButton = () => {
    return (
        <PostActionButtonBlock>
            <ActionButton>수정</ActionButton>
            <ActionButton>삭제</ActionButton>
        </PostActionButtonBlock>
    );
};
export default PostEditDeleteButton;
