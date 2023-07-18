import React, { useState } from 'react';
import styled from 'styled-components';
import ItemDetail from './ItemDetail';

const StyledItemBlock = styled.div`
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
`;
const StyledListBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 1rem;
`;
const CardItem = styled.div``;
const InfoItem = styled.div``;
const RunItem = () => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <StyledItemBlock onClick={toggleModal}>
      <CardItem>지도 들어갈곳</CardItem>
      <InfoItem>
        <p>지역: 대구</p>
        <p>거리 : 8km</p>
        <p>예상 소요시간 : 10분</p>
      </InfoItem>
      {showModal && <ItemDetail />}
    </StyledItemBlock>
  );
};
const RunItemList = () => {
  return (
    <StyledListBlock>
      <RunItem />
      <RunItem />
      <RunItem />
      <RunItem />
      <RunItem />
      <RunItem />
      <RunItem />
    </StyledListBlock>
  );
};
export default RunItemList;
