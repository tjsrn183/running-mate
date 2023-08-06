import React from 'react';
import { styled } from 'styled-components';

const StyledChatList = styled.div`
    height: 500px;
    overflow: auto;
    padding: 5px;
`;
const StyledChatForm = styled.form`
    text-align: right;
    width: 100%;
    padding: 10px;
`;
const StyledFiledSet = styled.fieldset`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 300px;
    border: 1px solid #ccc;
`;
const ChatPage = () => {
    return (
        <div>
            <StyledFiledSet>
                <StyledChatList></StyledChatList>

                <StyledChatForm>
                    <input type="text" />
                    <button type="submit">전송</button>
                </StyledChatForm>
            </StyledFiledSet>
        </div>
    );
};

export default ChatPage;
