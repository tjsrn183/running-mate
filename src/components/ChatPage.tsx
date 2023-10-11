import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
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
    const chatWindow = useRef<any>(null);
    const [chatList, setChatList] = useState<any>([]); //채팅 리스트

    const socket = io('http://localhost:8000/chat', { transports: ['websocket', 'polling'] });
    console.log('socketState임', socket);
    const sendChatHook = useSendChatMutation();
    const enterRoomHook = useEnterRoomQuery(roomIdNumber);
    const userInfo = useGetUserInfoQuery();

    //
    const messageRef = useRef('');
    //

    const receiveMessage = useCallback(() => {
        if (chatWindow.current) {
            chatWindow.current.scrollTo({ top: chatWindow.current.scrollHeight, behavior: 'smooth' });
        }
    }, []);
    const sendMessageFunc = async () => {
        console.log('샌드챗  실행됨');
        await sendChatHook[0]({
            message: messageRef.current,
            roomId: roomIdNumber,
            user: userInfo.data.user.user.nick
        });
        setChatList([...chatList, { message: messageRef.current, user: userInfo.data.user.user.nick }]);
        receiveMessage();
        messageRef.current = '';
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
            console.log('chat이벤트에서 data임', data);

            setChatList([...chatList, data]);
        });
        socket.on('join', ({ user, chat }: any) => {
            console.log('join이벤트에서 user,chat임', user, chat);

            setChatList([...chatList, { user, chat }]);
        });
    }, [socket]);

    return (
        <div>
            <Header />
            <StyledFiledSet>
                <StyledChatList ref={chatWindow}>
                    {chatList &&
                        chatList.map((chat: { message: string; user: string }, i: number) => {
                            return <ChatBlock key={i} chat={chat} serviceUser={userInfo.data.user.user.nick} />;
                        })}
                </StyledChatList>
                <StyledChatForm>
                    <input type="text" onChange={(e) => (messageRef.current = e.target.value)} />
                    <button type="submit" onClick={sendMessageFunc}>
                        전송
                    </button>
                </StyledChatForm>
            </StyledFiledSet>
        </div>
    );
};

export default ChatPage;
