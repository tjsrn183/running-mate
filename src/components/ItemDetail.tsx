import React, { useRef } from 'react';
import styled from 'styled-components';

const DetailItemBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(6, 1fr);
`;
const ModalItem = styled.div``;
const DialogItem = styled.dialog``;
const ItemBlock = styled.div`
  grid-column: 5/6;
  grid-row: 2/3;
`;
const MapBlock = styled.div`
  grid-column: 2/4;
  grid-row: 2/5;
`;
const InfoBlock = styled.div`
  grid-column: 2/4;
  grid-row: 4/5;
`;
const StartChat = styled.button``;
const ItemDetailPage = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  return (
    <DetailItemBlock>
      <ModalItem onClick={() => modalRef?.current?.showModal()}></ModalItem>
      <DialogItem ref={modalRef}>
        <ItemBlock>
          <MapBlock>지도 들어갈자리</MapBlock>
          <InfoBlock>정보들어갈자리</InfoBlock>
          <StartChat>채팅시작하기</StartChat>
        </ItemBlock>
        <button onClick={() => modalRef?.current?.close()}></button>
      </DialogItem>
    </DetailItemBlock>
  );
};
export default ItemDetailPage;
