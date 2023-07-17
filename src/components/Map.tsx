import React from 'react';
import styled from 'styled-components';

const StyledMapBlock = styled.div`
  background-color: yellow;
  position: absolute;
  left: 100px;
  bottom: 100px;
  width: 1200px;
  height: 700px;
`;
const MapBlock = styled.div`
  background-color: white;

  position: absolute;
  width: 700px;
  height: 500px;
  top: 100px;
  left: 100px;
`;
const Course = styled.div`
  position: absolute;
  width: 100px;
  height: 50px;
  right: 300px;
`;
const CourseInput = styled.input`
  margin-bottom: 10px;
`;

const Map = () => {
  return (
    <StyledMapBlock>
      <MapBlock />
      <Course>
        <CourseInput placeholder="출발지를 입력하세요" />
        <CourseInput placeholder="도착지를 입력하세요" />
      </Course>
    </StyledMapBlock>
  );
};
export default Map;
