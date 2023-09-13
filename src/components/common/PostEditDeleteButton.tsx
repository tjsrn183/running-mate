import styled from 'styled-components';
import React from 'react';
import palette from '../../lib/styles/palette';
interface PostEditDeleteButtonProps {
    onEdit: () => void;
    onDelete: () => void;
}
const PostActionButtonBlock = styled.div`
    position: flex;
    bottom: calc((100% - 800px) / 2);
    right: calc((100% - 1700px) / 2);
`;
const ActionButton = styled.button`
    font-size: larger;
    cursor: pointer;
    border: none;
    background-color: ${palette.orange};
    color: white;
    border-radius: 5px;
    width: 100px;
    height: 50px;
    &:hover {
        background-color: ${palette.hover_orange};
    }
`;

const PostEditDeleteButton = ({ onEdit, onDelete }: PostEditDeleteButtonProps) => {
    return (
        <PostActionButtonBlock>
            <ActionButton style={{ borderRight: '1px solid white' }} onClick={onEdit}>
                수정
            </ActionButton>
            <ActionButton onClick={onDelete}>삭제</ActionButton>
        </PostActionButtonBlock>
    );
};
export default PostEditDeleteButton;
