import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import React, { useRef, useEffect } from 'react';
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

const Wrapper = styled.div`
  padding-left: 10px;

  .ql-toolbar {
    background-color: #fffbdb;
  }
  .ql-editor {
    padding: 0;
    min-height: 320px;
    font-size: 1rem;
    line-height: 1.5;
  }
`;

const Editor = () => {
  const quillElement = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'snow',
      placeholder: '내용을 작성하세요..',
      modules: {
        toolbar: [
          [{ header: '1' }, { header: '2' }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'code-block', 'link', 'image']
        ]
      }
    });
  }, []);

  return (
    <form>
      <Wrapper>
        <TitleInput placeholder="제목을 입력하세요.." />
        <div ref={quillElement} />
      </Wrapper>
    </form>
  );
};
export default Editor;
