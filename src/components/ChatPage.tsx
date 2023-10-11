import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { styled } from 'styled-components';
import { io } from 'socket.io-client';
import { useEnterRoomQuery, useGetUserInfoQuery, useSendChatMutation } from '../api/queries';
import Header from './common/Header';
import { useParams } from 'react-router-dom';
import ChatBlock from './ChatBlock';
import { LoadingSpin } from './common/LoadingSpin';

const StyledFiledSet = styled.fieldset`
    width: 300px;
    border: 1px solid #ccc;
`;
const StyledChatList = styled.div`
    display: flex;
    flex-direction: column;
    height: 500px;
    overflow: auto;
    & > :first-child {
    }
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
    const userInfo = useGetUserInfoQuery();
    const socket = io('http://localhost:8000/chat', {
        transports: ['websocket', 'polling'],
        query: {
            username: userInfo.data?.user.user.nick
        }
    });
    console.log('socketState임', socket);
    const sendChatHook = useSendChatMutation();
    const enterRoomHook = useEnterRoomQuery(roomIdNumber);

    //
    const messageRef = useRef('');
    //

    const receiveMessage = useCallback(() => {
        if (chatWindow.current) {
            chatWindow.current.scrollTo({ top: chatWindow.current.scrollHeight, behavior: 'smooth' });
        }
    }, []);
    const sendMessageFunc = () => {
        console.log('샌드챗  실행됨');
        socket.emit('message', {
            message: messageRef.current,
            roomId: roomIdNumber,
            user: userInfo.data.user.user.nick
        });
        /* sendChatHook[0] ({
            message: messageRef.current,
            roomId: roomIdNumber,
            user: userInfo.data.user.user.nick
        })*/
        receiveMessage();
        console.log('이게 실행이 되나?');
        messageRef.current = '';
    };
    useEffect(() => {
        console.log('enterRoomHook.data임', enterRoomHook.data);
        if (enterRoomHook.data == 'full') {
            alert('방이 꽉 찼습니다.');
        }
        if (enterRoomHook.data == 'notExist') {
            alert('방이 존재하지 않습니다.');
        }
        socket.emit('join', roomId);
        setChatList(enterRoomHook?.data);
        return () => {
            socket.emit('leave', roomId);
            socket.disconnect();
        };
    }, [roomIdNumber, socket]);
    useEffect(() => {
        socket.on('chat', (data: any) => {
            console.log('data임', data);
            setChatList((prevChatList: any) => [...prevChatList, data]);
        });
        socket.on('join', ({ user, chat }: any) => {
            setChatList((prevChatList: any) => [...prevChatList, { user, chat }]);
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
