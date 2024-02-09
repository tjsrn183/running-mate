import React, { useCallback, useEffect, useRef, useState, useMemo, FormEvent } from 'react';
import { styled } from 'styled-components';
import { io } from 'socket.io-client';
import { useEnterRoomQuery, useGetUserInfoQuery } from '../api/queries';
import Header from './common/Header';
import { useParams } from 'react-router-dom';
import ChatBlock from './ChatBlock';
import palette from '../lib/styles/palette';

const ChatPageLayout = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background: url(../login_background.jpg) no-repeat center;

    & .chatBoxBack {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100vh;
        background-color: rgba(255 255 255/ 0.5);
        backdrop-filter: blur(10px);
    }
`;

const EditHeader = styled(Header)`
    margin-bottom: 0;
`;

const ChatFiledSet = styled.fieldset`
    width: 300px;
    border: 1px solid #ccc;
    background-color: white;
    border-radius: 10px;

    & .chatList {
        display: flex;
        flex-direction: column;
        height: 500px;
        overflow: auto;
    }

    & .chatform {
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
    }
`;

const socketFunc = (name: string) => {
    const socket = io('https://api.runningmate.shop/chat', {
        query: {
            username: name
        },
        reconnection: true,
        reconnectionAttempts: 5
    });
    return socket;
};
export interface chatType {
    chatId: number;
    user: string;
    message: string;
    chatRoomRoomId: number;
    chat?: string;
}
const ChatPage = () => {
    const { roomId } = useParams();
    const roomIdNumber = parseInt(roomId!);
    const chatWindow = useRef<HTMLDivElement>(null);
    const [chatList, setChatList] = useState<any>([]);
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

        if (tempMessage.message !== '') {
            socket.emit('message', {
                message: tempMessage.message,
                roomId,
                user: userInfo.data?.user.user.nick
            });

            setTempMessage({ ...tempMessage, message: '' });
        }
    };

    useEffect(() => {
        socket.emit('join', roomId);

        socket.emit('join', roomId);

        setChatList(enterRoomHook.data);

        receiveMessage();
        return () => {
            socket.disconnect();
        };
    }, [enterRoomHook.data]);

    useEffect(() => {
        socket.on('chat', (data: chatType) => {
            setChatList((prevState: Array<chatType>) => [...prevState, data]);
        });

        socket.on('join', ({ user, chat }: chatType) => {
            setChatList((prevState: Array<chatType>) => [...prevState, { user, message: chat }]);
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
        <ChatPageLayout>
            <EditHeader />
            <div className="chatBoxBack">
                <ChatFiledSet>
                    <div className="chatList" ref={chatWindow}>
                        {chatList &&
                            chatList.map((chat: { message: string; user: string }, i: number) => {
                                return <ChatBlock key={i} chat={chat} serviceUser={userInfo.data?.user.user.nick} />;
                            })}
                    </div>
                    <form className="chatform" onSubmit={(e: FormEvent<HTMLFormElement>) => sendMessageFunc(e)}>
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
                    </form>
                </ChatFiledSet>
            </div>
        </ChatPageLayout>
    );
};

export default ChatPage;
