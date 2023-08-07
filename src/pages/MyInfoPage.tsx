import React from 'react';
import styled from 'styled-components';
import Header from '../components/common/Header';

const MyInfoBlock = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
    margin-top: 100px;
`;
const ProfilePicture = styled.div`
    display: flex;
    background-color: yellow;
    border-radius: 50%;
    width: 200px;
    height: 200px;
`;
const ProfileBlock = styled.div``;
const PersonalInfo = styled.div`
    font-size: 20px;
`;
const ChatList = styled.div``;
const MyInfoPage = () => {
    return (
        <div>
            <Header />
            <MyInfoBlock>
                <ProfilePicture />
                <ProfileBlock>
                    <h1>유튜브 프리미엄님,환영합니다.</h1>
                </ProfileBlock>
                <PersonalInfo>
                    <p>이름 : 황선구</p>
                    <p>아이디: ys</p>
                    <p>비밀번호 : ys</p>
                    <p>생일 : 1997 </p>
                    <p>닉네임 : 홍성구</p>
                </PersonalInfo>
                <ChatList></ChatList>
            </MyInfoBlock>
        </div>
    );
};
export default MyInfoPage;
