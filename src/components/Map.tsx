import React, { useState } from 'react';
import styled from 'styled-components';

const StyledMapBlock = styled.div`
  position: absolute;
  left: 100px;
  bottom: 100px;
  width: 1200px;
  height: 700px;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(7, 1fr);
`;
const MapBlock = styled.div`
  background-color: black;
  grid-column: 2/6;
  grid-row: 2/7;
`;
const Course = styled.div`
  grid-column: 7/8;
  grid-row: 2/3;
`;
const CourseInput = styled.input``;
const RunInfo = styled.div`
  background-color: white;
  grid-column: 7/8;
  grid-row: 5/7;
  border: 10px solid black;
`;
const RegisterItem = styled.button`
  margin: 20px;
  grid-column: 7/8;
  grid-row: 3/4;
`;

const Map = () => {
  const [numberOfItems, setNumberOfItems] = useState(1);

  const onChangeRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    const RegisterNumber = Number(e.target.value);
    setNumberOfItems(RegisterNumber);
  };
  return (
    <StyledMapBlock>
      <MapBlock />
      <Course>
        <CourseInput placeholder="출발지를 입력하세요" />
        <CourseInput placeholder="도착지를 입력하세요" />
        <CourseInput
          type="number"
          min="0"
          max="20"
          value={numberOfItems}
          onChange={onChangeRegister}
        />
      </Course>
      <RegisterItem>등록하기</RegisterItem>
      <RunInfo>
        <p>거리 : 8km</p>
        <p>예상소요시간 : 20분</p>
      </RunInfo>
    </StyledMapBlock>
  );
};
export default Map;
