import React from 'react';
import styled from 'styled-components';
import { useGetUserInfoQuery } from '../api/queries';
import palette from '../lib/styles/palette';

const MyChat = styled.div`
    text-align: right;
    margin: 10px;
    .message {
        background-color: ${palette.orange};
        color: white;
        border-radius: 25px;
        padding: 5px 10px 5px 10px;
        font-size: 15px;
    }
`;
const OtherChat = styled.div`
    text-align: left;
    margin: 10px;
    .name {
        font-size: 5px;
    }
    .message {
        background-color: ${palette.chat_bollon};
        border-radius: 25px;
        padding: 5px 10px 5px 10px;
        font-size: 15px;
    }
`;
const SystemChat = styled.div`
    text-align: center;

    .system {
        border-radius: 5px;
        background-color: black;
        color: white;
        padding: 5px 10px 5px 10px;
        font-size: 10px;
        margin: 5px;
    }
`;
interface Chat {
    chat: { user: string; message: string };
    serviceUser: string;
}
const ChatBlock = ({ chat, serviceUser }: Chat) => {
    if (chat.user === 'system') {
        return (
            <SystemChat>
                <div className="system">{chat.message}</div>
            </SystemChat>
        );
    } else if (serviceUser === chat.user) {
        return (
            <MyChat>
                <span className="message">{chat.message}</span>
            </MyChat>
        );
    } else
        return (
            <OtherChat>
                <div className="name">{chat.user}</div>
                <span className="message">{chat.message}</span>
            </OtherChat>
        );
};
export default React.memo(ChatBlock);
