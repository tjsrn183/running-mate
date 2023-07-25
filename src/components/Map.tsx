import React, { useState } from 'react';
import styled from 'styled-components';
import CustomButton from './common/CustomButton';
import palette from '../lib/styles/palette';
import Editor from './write/Editor';

const StyledMapBlock = styled.div`
  position: relative;
  top: 100px;
  width: 100%;
  height: 700px;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(7, 1fr);
`;
const MapBlock = styled.div`
  background-color: black;
  grid-column: 2/5;
  grid-row: 1/6;
`;
const EditorBlock = styled.div`
  height: 500px;
  grid-column: 5/7;
  grid-row: 1/6;
`;
const CourseBlock = styled.div`
  border-radius: 4px;
  margin-left: 10px;
  grid-column: 7/9;
  grid-row: 1/6;
  display: grid;
  grid-template-rows: repeat(5, 1fr);
`;
const Course = styled.div`
  grid-row: 1/2;
  padding: 0px 16px 0px 9px;
`;
const CourseInput = styled.input`
  width: 100%;
  height: 30px;
`;

const DistanceItem = styled(CustomButton)`
  color: ${palette.orange};
  background-color: ${palette.back_ground_orange};
  padding: 10px 100px;
  margin: 10px 10px;
  grid-row: 2/3;
  &:hover {
    background-color: ${palette.hover_gray};
  }
`;

const RunInfo = styled.div`
  margin: 20px 10px;
  color: gray;
  background-color: ${palette.back_ground_orange};
  padding: 20px;
  border-radius: 10px;
  grid-row: 3/4;
  h3 {
    color: black;
  }
`;
const RegisterItem = styled(CustomButton)`
  border-radius: 20px;
  margin: 1px 10px;
  padding: 10px 100px;
  grid-row: 5/6;
`;

const Map = () => {
  const [numberOfItems, setNumberOfItems] = useState(1);
  const editorHeight = '380px';
  const onChangeRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    const RegisterNumber = Number(e.target.value);
    setNumberOfItems(RegisterNumber);
  };
  return (
    <StyledMapBlock>
      <MapBlock />
      <EditorBlock>
        <Editor height={editorHeight} />
      </EditorBlock>
      <CourseBlock>
        <Course>
          <CourseInput placeholder="출발지를 입력하세요" />
          <br />
          <CourseInput placeholder="도착지를 입력하세요" />
          <br />
          참여인원
          <CourseInput
            type="number"
            min="0"
            max="20"
            value={numberOfItems}
            onChange={onChangeRegister}
          />
        </Course>

        <DistanceItem>거리보기</DistanceItem>
        <br />
        <RegisterItem>등록하기</RegisterItem>

        <RunInfo>
          <p>
            거리<h3>8km</h3>
          </p>
          <p>
            예상소요시간<h3>20분</h3>
          </p>
        </RunInfo>
      </CourseBlock>
    </StyledMapBlock>
  );
};
export default Map;
