import React, { useCallback, useEffect, useRef, useState, useMemo, FormEvent } from 'react';
import { styled } from 'styled-components';
import { io } from 'socket.io-client';
import { useEnterRoomQuery, useGetUserInfoQuery } from '../api/queries';
import Header from './common/Header';
import { useParams } from 'react-router-dom';
import ChatBlock from './ChatBlock';
import palette from '../lib/styles/palette';

const EditHeader = styled(Header)`
    margin-bottom: 0;
`;
const Entire = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background: url(../login_background.jpg) no-repeat center;
`;

const BackDrop = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: rgba(255 255 255/ 0.5);
    backdrop-filter: blur(10px);
`;
const StyledFiledSet = styled.fieldset`
    width: 300px;
    border: 1px solid #ccc;
    background-color: white;
    border-radius: 10px;
`;
const StyledChatList = styled.div`
    display: flex;
    flex-direction: column;
    height: 500px;
    overflow: auto;
`;
const StyledChatForm = styled.form`
    display: flex;
    flex-direction: row;
    text-align: center;
    justify-content: end;

    .chatInput {
        margin: 15px 0;
        padding: 7px 25px;
        border: solid 1px;
        border-color: ${palette.chat_bollon};
        border-collapse: collapse;
        border-radius: 15px;
        background-color: ${palette.chat_input_box};
    }
    .chatSubmit {
        border: none;
        background-color: white;
        justify-content: end;
        cursor: pointer;
    }
    .material-symbols-outlined {
        padding: 4px;
        border-radius: 14px;
        font-size: 32px;
        background-color: ${palette.orange};
        color: white;
        &:hover {
            transform: scale(1.1);
            transition: 0.5s;
        }
    }
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

    const socket = socketFunc(userInfo.data?.user.user.nick as unknown as string);

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

        console.log('이게 실행이 되나?');
    };

    useEffect(() => {
        socket.emit('join', roomId);
        console.log('enterRoomHook.data임', enterRoomHook.data);

        console.log(' socketInstances[roomId]임', socket);
        socket.emit('join', roomId);

        setChatList(enterRoomHook?.data);
        receiveMessage();
        return () => {
            socket.disconnect();
            console.log('끊겼다아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ');
        };
    }, [enterRoomHook.data]);

    useEffect(() => {
        socket.on('chat', (data: any) => {
            console.log('data임', data);
            console.log('ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ');

            setChatList((prevState: any) => [...prevState, data]);
        });

        socket.on('join', ({ user, chat }: any) => {
            console.log('join이벤트시 user,chat', user, chat);

            setChatList((prevState: any) => [...prevState, { user, message: chat }]);
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
        <Entire>
            <EditHeader />
            <BackDrop>
                <StyledFiledSet>
                    <StyledChatList ref={chatWindow}>
                        {chatList &&
                            chatList.map((chat: { message: string; user: string }, i: number) => {
                                return <ChatBlock key={i} chat={chat} serviceUser={userInfo.data?.user.user.nick} />;
                            })}
                    </StyledChatList>
                    <StyledChatForm onSubmit={(e: FormEvent<HTMLFormElement>) => sendMessageFunc(e)}>
                        <input
                            className="chatInput"
                            type="text"
                            name="message"
                            onChange={(e) => onTextChange(e)}
                            value={tempMessage.message}
                        />
                        <button className="chatSubmit" type="submit">
                            <span className="material-symbols-outlined">send</span>
                        </button>
                    </StyledChatForm>
                </StyledFiledSet>
            </BackDrop>
        </Entire>
    );
};

export default ChatPage;
