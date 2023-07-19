import React from 'react';
import styled from 'styled-components';

const DetailItemBlock = styled.div`
  display: flex;
`;
const SumInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 900px;
  align-items: center;
  justify-content: center;
`;
const SmallMap = styled.div``;
const PersonInfo = styled.div``;
const StartChat = styled.button``;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 1600px;
  align-items: center;
`;
const BigMap = styled.div`
  background-color: yellow;
  width: 500px;
  height: 300px;
`;
const ItemInfo = styled.div``;
const ItemDetail = () => {
  return (
    <DetailItemBlock>
      <SumInfo>
        <PersonInfo>정보들어갈자리</PersonInfo>
        <SmallMap>작은지도 들어갈자리</SmallMap>
        <StartChat>채팅시작하기</StartChat>
      </SumInfo>
      <Main>
        <BigMap>큰지도 들어갈자리</BigMap>
        <ItemInfo>
          출발시간 : 10시 도착시간 : 11시 예상소요시간 : 30분 메모: 사랑합니다
        </ItemInfo>
      </Main>
    </DetailItemBlock>
  );
};
export default ItemDetail;
