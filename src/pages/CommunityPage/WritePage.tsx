import React from 'react';
import Editor from '../../components/write/Editor';
import Header from '../../components/common/Header';
import { styled } from 'styled-components';
import CustomButton from '../../components/common/CustomButton';
const ComunityWriteBlock = styled.div`
  position: relative;
  height: 100vh;
`;
const EditorBlock = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -80%);
`;
const RegisterButton = styled(CustomButton)`
  position: absolute;
  bottom: calc((100% - 650px) / 2);
  right: calc((100% - 850px) / 2);
  width: 20%;
  height: 50px;
  margin-bottom: 0;
`;
const CommunityWritePage = () => {
  return (
    <ComunityWriteBlock>
      <Header />
      <EditorBlock>
        <Editor width="840px" height="500px" />
      </EditorBlock>
      <RegisterButton>등록하기</RegisterButton>
    </ComunityWriteBlock>
  );
};
export default CommunityWritePage;
