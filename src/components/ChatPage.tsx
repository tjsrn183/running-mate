import React, { useRef } from 'react';
import { styled } from 'styled-components';
import { io } from 'socket.io-client';

const StyledChatList = styled.div`
    height: 500px;
    overflow: auto;
    padding: 5px;
`;
const StyledChatForm = styled.form`
    text-align: right;
    padding: 15px 10px;
`;
const StyledFiledSet = styled.fieldset`
    width: 300px;
    border: 1px solid #ccc;
`;
const ChatPage = () => {
    const socket = io('http://localhost:8000');
    socket.on('news', function (data) {
        console.log(data);
        socket.emit('reply', 'Hi');
    });
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
