import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const TitleInput = styled.input`
  font-size: 2rem;
  outline: none;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid gray;
  margin-bottom: 2rem;
  width: 100%;
`;
interface WrapperProps {
  height?: string;
}
const Wrapper = styled.div<WrapperProps>`
  padding-left: 10px;
  height: ${(props) => props.height};
  .ql-editor {
    padding: 0;
    min-height: 320px;
    font-size: 1rem;
    line-height: 1.5;
  }
`;
interface EditorProps {
  height?: string;
}
const Editor: React.FC<EditorProps> = ({ height }) => {
  const quillElement = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'snow',
      placeholder: '내용을 작성하세요..'
    });
  }, []);

  return (
    <Wrapper height={height}>
      <TitleInput placeholder="제목을 입력하세요.." />
      <div ref={quillElement} />
    </Wrapper>
  );
};
export default Editor;
