import React from 'react';
import styled from 'styled-components';

const DetailItemBlock = styled.div``;
const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 650px;
  margin: 0 auto;
  padding-top: 90px;
`;
const BigMap = styled.div`
  background-color: yellow;
  width: 100%;
  height: 50vh;
`;
const Title = styled.div`
  font-weight: bolder;
  font-size: x-large;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  #picture {
    margin-right: 10px;
    width: 50px;
    height: 50px;

    background-color: yellow;
    border-radius: 50%;
  }
  .nameTime {
    flex-direction: column;
  }
`;

const SumInfo = styled.div`
  flex-direction: column;

  align-items: center;
  justify-content: center;
`;
const SmallMap = styled.div``;
const PersonInfo = styled.div``;
const StartChat = styled.button``;

const ItemInfo = styled.div``;
const ItemDetail = () => {
  return (
    <DetailItemBlock>
      <InfoBlock>
        <BigMap>큰지도 들어갈자리</BigMap>
        <Title>
          <h1>제목입니다. 러닝하러가요!</h1>
        </Title>
        <UserInfo>
          <div id="picture" />
          <div className="nameTime">
            <div id="name">황선구</div>
            <div id="time">2023.7.26</div>
          </div>
        </UserInfo>
        <ItemInfo>
          출발시간 : 10시 도착시간 : 11시 예상소요시간 : 30분 메모: 사랑합니다
        </ItemInfo>

        <SumInfo>
          <PersonInfo>정보들어갈자리</PersonInfo>
          <SmallMap>작은지도 들어갈자리</SmallMap>
          <StartChat>채팅시작하기</StartChat>
        </SumInfo>
      </InfoBlock>
    </DetailItemBlock>
  );
};
export default ItemDetail;
