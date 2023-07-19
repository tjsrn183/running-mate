import React from 'react';
import styled from 'styled-components';

const MyInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
`;
const ProfilePicture = styled.div`
  display: flex;

  background-color: yellow;
  border-radius: 50%;
  width: 100px;
  height: 100px;
`;
const ProfileBlock = styled.div`
  display: flex;
`;
const PersonalInfo = styled.div`
  display: flex;
`;
const ChatList = styled.div``;
const MyInfoPage = () => {
  return (
    <MyInfoBlock>
      <ProfilePicture />
      <ProfileBlock>유튜브 프리미엄님,환영합니다.</ProfileBlock>
      <PersonalInfo>
        이름 : 황선구 아이디: ys 비밀번호 : ys 성별 : 남 생일 : 1997 닉네임 :
        홍성구
      </PersonalInfo>
      <ChatList></ChatList>
    </MyInfoBlock>
  );
};
export default MyInfoPage;
