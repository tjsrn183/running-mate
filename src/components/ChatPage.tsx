import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { io } from 'socket.io-client';
import { useEnterRoomQuery, useGetUserInfoQuery, useSendChatMutation } from '../api/queries';
import Header from './common/Header';
import { useParams } from 'react-router-dom';
import ChatBlock from './ChatBlock';

const StyledFiledSet = styled.fieldset`
    width: 300px;
    border: 1px solid #ccc;
`;
const StyledChatList = styled.div`
    height: 500px;
    overflow: auto;
    padding: 5px;
`;
const StyledChatForm = styled.form`
    text-align: right;
    padding: 15px 10px;
`;

const ChatPage = () => {
    const { roomId } = useParams();
    const roomIdNumber = parseInt(roomId!);
    const [chatList, setChatList] = useState<any>([]); //채팅 리스트
    const [message, setMessage] = useState(''); //채팅 input
    const socket = io('http://localhost:8000/chat');
    console.log('socketState임', socket);
    const sendChatHook = useSendChatMutation();
    const enterRoomHook = useEnterRoomQuery(roomIdNumber);
    const userInfo = useGetUserInfoQuery();
    const sendMessageFunc = async () => {
        console.log('샌드챗  실행됨');
        await sendChatHook[0]({ message, roomId: roomIdNumber, user: userInfo.data.user.user.nick });
        setChatList([...chatList, { message, user: userInfo.data.user.user.nick }]);
        setMessage('');
    };
    useEffect(() => {
        console.log('enterRoomHook.data임', enterRoomHook.data);
        socket.emit('join', roomIdNumber);
        setChatList(enterRoomHook?.data);
        return () => {
            socket.emit('leave', roomIdNumber);
            socket.disconnect();
        };
    }, [roomIdNumber, socket]);
    useEffect(() => {
        socket.on('chat', (data: any) => {
            setChatList([...chatList, data]);
        });
        socket.on('join', ({ user, chat }: any) => {
            setChatList([...chatList, { user, chat }]);
        });
    }, [socket]);

    return (
        <div>
            <Header />
            <StyledFiledSet>
                <StyledChatList>
                    {chatList &&
                        chatList.map((chat: { message: string; user: string }, i: number) => {
                            return <ChatBlock key={i} chat={chat} />;
                        })}
                </StyledChatList>
                <StyledChatForm>
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button type="submit" onClick={sendMessageFunc}>
                        전송
                    </button>
                </StyledChatForm>
            </StyledFiledSet>
        </div>
    );
};

export default ChatPage;
