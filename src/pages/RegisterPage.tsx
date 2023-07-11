import React, { useRef } from 'react';
import styled from 'styled-components';
const StyledInput = styled.div`
  position: absolute;
  text-align: center;
`;
const RegisterPage = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  return (
    <div>
      <button onClick={() => modalRef?.current?.showModal()}>회원가입</button>;
      <dialog ref={modalRef}>
        <form>
          <div className="field">
            <b>아이디</b>
            <span className="placehold-text">
              <input type="text" />
            </span>
          </div>
          <div className="field">
            <b>비밀번호</b>
            <input className="userpw" type="password" />
          </div>
          <div className="field">
            <b>비밀번호 재확인</b>
            <input className="userpw-confirm" type="password" />
          </div>
          <div className="field">
            <b>이름</b>
            <input type="text" />
          </div>
        </form>
      </dialog>
    </div>
  );
};
export default RegisterPage;
