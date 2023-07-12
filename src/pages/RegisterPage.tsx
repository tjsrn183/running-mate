import React, { useRef } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  height: 30px;
  border-color: grey;
  border-width: 2px;
  border-style: solid;
`;
const StyledLabel = styled.label`
  font-weight: bold;
`;
const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background-color: #5b5bfa;
  &:hover {
    background-color: blue;
  }
`;
const RegisterPage = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  return (
    <div>
      <button onClick={() => modalRef?.current?.showModal()}>회원가입</button>
      <dialog ref={modalRef}>
        <form>
          <h1>회원가입</h1>
          <StyledLabel htmlFor="user_id">
            <p>아이디</p>
          </StyledLabel>
          <StyledInput type="text" id="user_id" />
          <StyledLabel htmlFor="user_password">
            <p>비밀번호</p>
          </StyledLabel>
          <StyledInput type="password" />
          <StyledLabel htmlFor="check_user_password">
            <p>비밀번호재확인</p>
          </StyledLabel>
          <StyledInput type="password" id="check_user_password" />
          <StyledLabel htmlFor="name">
            <p>이름</p>
          </StyledLabel>
          <StyledInput type="text" id="name" />
          <StyledLabel htmlFor="birthday">
            <p>생년월일</p>
          </StyledLabel>
          <StyledInput type="date" />
          <div className="field gender">
            <StyledLabel>
              <p>성별</p>
            </StyledLabel>
            <div>
              <StyledLabel>
                <input type="radio" name="gender" />
                남자
              </StyledLabel>
              <StyledLabel>
                <input type="radio" name="gender" />
                여자
              </StyledLabel>
            </div>
          </div>
          <StyledButton type="submit">가입</StyledButton>
          <StyledButton type="reset">초기화</StyledButton>
          <StyledButton onClick={() => modalRef?.current?.close()}>
            닫기
          </StyledButton>
        </form>
      </dialog>
    </div>
  );
};
export default RegisterPage;
