import React, { useCallback, useEffect, useRef, useState, useMemo, FormEvent } from 'react';
import { styled } from 'styled-components';
import { io } from 'socket.io-client';
import { useEnterRoomQuery, useGetUserInfoQuery } from '../api/queries';

//import { useSendChatMutation } from '../api/mutations';
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
const socketFunc = (name: string) => {
    const socket = io('http://localhost:8000/chat', {
        query: {
            username: name
        },
        reconnection: true,
        reconnectionAttempts: 5
    });
    return socket;
};

const ChatPage = () => {
    const { roomId } = useParams(); // 채팅 받고 보내고 관련한건 모두 이걸로
    const roomIdNumber = parseInt(roomId!); //훅으로 보낼때만 쓰기
    const chatWindow = useRef<any>(null);
    const [chatList, setChatList] = useState<any>([]); //채팅 리스트
    const userInfo = useGetUserInfoQuery();

    const socket = socketFunc(userInfo.data?.user.user.nick);

    // const sendChatHook = useSendChatMutation();
    const enterRoomHook = useEnterRoomQuery(roomIdNumber);

    //
    const [tempMessage, setTempMessage] = useState({
        message: '',
        user: userInfo.data?.user.user.nick
    });

    const receiveMessage = () => {
        if (chatWindow.current) {
            chatWindow.current.scrollTo({ top: chatWindow.current.scrollHeight, behavior: 'smooth' });
        }
    };
    const sendMessageFunc = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('샌드챗  실행됨');
        if (tempMessage.message !== '') {
            socket.emit('message', {
                message: tempMessage.message,
                roomId,
                user: userInfo.data?.user.user.nick
            });

            setTempMessage({ ...tempMessage, message: '' });
        }

        /* 
        rtk-query를 이용한 채팅 전송
        sendChatHook[0] ({
            message: messageRef.current,
            roomId: roomIdNumber,
            user: userInfo.data.user.user.nick
        })*/

        console.log('이게 실행이 되나?');
    };
    useEffect(() => {
        socket.emit('join', roomId);
        console.log('enterRoomHook.data임', enterRoomHook.data);

        if (enterRoomHook.data == 'full') {
            alert('방이 꽉 찼습니다.');
        }
        if (enterRoomHook.data == 'notExist') {
            alert('방이 존재하지 않습니다.');
        }
        console.log(' socketInstances[roomId]임', socket);
        socket.emit('join', roomId);

        setChatList(enterRoomHook?.data);
        receiveMessage();
        return () => {
            socket.emit('leave', roomId);

            socket.off();
        };
    }, [enterRoomHook.data]);

    useEffect(() => {
        socket.on('chat', (data: any) => {
            console.log('data임', data);
            console.log('ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ');
            setChatList((chatList: any) => [...chatList, data]);
        });

        socket.on('join', ({ user, chat }: any) => {
            console.log('join이벤트시 user,chat', user, chat);

            setChatList((chatList: any) => [...chatList, { user, message: chat }]);
        });
    }, [socket, chatList]);

    useEffect(() => {
        receiveMessage();
    }, [chatList]);
    const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempMessage({ ...tempMessage, [e.target.name]: e.target.value });
    };

    socket.on('ping', () => console.log('ping'));
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
                <StyledChatForm onSubmit={(e: FormEvent<HTMLFormElement>) => sendMessageFunc(e)}>
                    <input type="text" name="message" onChange={(e) => onTextChange(e)} value={tempMessage.message} />
                    <button type="submit">전송</button>
                </StyledChatForm>
            </StyledFiledSet>
        </div>
    );
};

export default ChatPage;
