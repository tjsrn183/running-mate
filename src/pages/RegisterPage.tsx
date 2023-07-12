import React, { useRef } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  line-height: 30px;
`;
const StyledLabel = styled.label`
  font-weight: bold;
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
              <StyledLabel>
                <input type="radio" name="gender" />
                선택안함
              </StyledLabel>
            </div>
          </div>
          <button type="submit">가입</button>
          <button type="reset">초기화</button>
          <button onClick={() => modalRef?.current?.close()}>닫기</button>
        </form>
      </dialog>
    </div>
  );
};
export default RegisterPage;
